import {useEffect, useState, useRef} from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonSmall } from '../../shared-components/Button'
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal'
import StoresLocation from './StoresLocation'
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getStores } from '../../redux/stores/storesActions'
import { toggleModal } from '../../redux/stores/storesActions';
import {
  Paper,
  Box,
  InputBase,
} from '@mui/material';
import MapIcon from '../../../public/Marker.svg'


// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
//   '& .MuiDialogContent-root': {
//     padding: theme.spacing(2),
//     width: '400px'
//   },
//   '& .MuiDialogActions-root': {
//     padding: theme.spacing(1),
//   },
// }));

export default function StoresAroundYou(props) {
  const [location, setLocation] = useState({
    lon: 0,
    lat: 0,
  });
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [storeState, setStoreState] = useState(false);
  const [displayNewStore, setDisplayNewStore] = useState("")
  const searchFieldRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter()
  const toggleModalState = useSelector(
    (state) => state.stores.toggleModalState
  );
  const { stores } = useSelector(
    (state) => state.stores
  )
  const [accessInfo, setAccessInfo] = useState({
    browserAccess: null,
    statusMessage: 'Please, click the allow button at the top to continue',
    userResponse: null
  });

  useEffect(() => {
    console.log(stores)
  })


  //SHOW TOAST ERROR
  useEffect(() => {
    if (accessInfo.browserAccess === null && accessInfo.userResponse === null) return 
    toast.error(accessInfo.statusMessage)
  }, [accessInfo])

  // HANDLE USER LOCATION RESPONSE
  const handleLocationResponse = (location) => {
    // console.log(location)
    if (!location) {
      setAccessInfo({
        ...{
          browserAccess: false,
          statusMessage:
            'Location access failed, Please click the button below to retry',
          userResponse: null
        },
      });
    } else {
      setLocation({
        ...{
          lon: location.coords.longitude,
          lat: location.coords.latitude,
        },
      });
      setIsLoading(true);
      dispatch(getStores({
        longitude: location.coords.longitude,
        latitude: location.coords.latitude,
        query,
        useQuery: true
      })).then(
        setIsLoading(false)
      )
    }
    setPending(false);
  };

  //HANDLE USER LOCATION DECLINE
  const handleLocationDecline = () => {
    setAccessInfo({
      ...{
        browserAccess: true,
        statusMessage:
        'Please enable geolocation to use this feature.',
        userResponse: false
      },
    });
    setPending(false);
  }

  // GET INITIAL USER LOCATION
  useEffect(() => {

    if(!toggleModalState) return
    if (navigator.geolocation) {
      navigator.permissions.query({
        name: 'geolocation'
      })
      .then(function(result) {
        if (result.state == 'denied') {
          setAccessInfo({
            ...{
              browserAccess: true,
              statusMessage: 'Enable geolocation to use this feature.',
              userResponse: false,
              retryable: false,
            }
          })
          setPending(false)
        } else {
          setAccessInfo({...{
            browserAccess: null,
            statusMessage: 'Please, click the allow button at the top to continue',
            userResponse: null
          }})
          setPending(true)
          navigator.geolocation.getCurrentPosition(handleLocationResponse, handleLocationDecline);
        }    
      });
    } else {
      setAccessInfo({
        ...{
          browserAccess: false,
          statusMessage: 'Geolocation is not supported by this browser.',
          userResponse: null,
          retryable: false,
        },
      });
      setPending(false);
    }
  }, [toggleModalState]);

  //
  const search = () => {
    if(query === "") return 
    setIsLoading(true)
    dispatch(getStores({
      longitude: location.lon, 
      latitude: location.lat,
      query,
      useQuery: true
    })).then(() => {
      setIsLoading(false);
      setQuery('');
    })
  }

  useEffect(() => {
    if(query !== "") return 
    dispatch(getStores({
      longitude: location.lon, 
      latitude: location.lat,
      query,
      useQuery: true
    }))
  }, [query])

  return (
    <Modal
      onClose={() => dispatch(toggleModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      // aria-labelledby="customized-dialog-title"
      open={toggleModalState}
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!storeState && (
        <Box
          sx={{
            width: { lg: '600px', md: '600px', sm: '500px', xs: '90%' },
            position: 'relative',
            background: 'white',
            borderRadius: '20px',
          }}
        >
          <DialogTitle
            sx={{
              m: 5,
              mb: 2,
              p: 2,
              textAlign: 'center',
              fontWeight: 'bold',
              color: 'black',
              // width: { md: '400px', xs: 'auto', sm: '400px'}
            }}
          >
            Stores Around You
            <IconButton
              aria-label="close"
              onClick={() => dispatch(toggleModal())}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          {pending ||
          accessInfo.userResponse === false ||
          accessInfo.browserAccess === false ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '40px',
              }}
            >
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                {accessInfo.statusMessage}
              </Alert>
            </Box>
          ) : (
            <>
              <DialogContent>
                <Box
                  sx={{
                    display: 'flex',
                    // flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    margin: 'auto',
                  }}
                >
                  <Paper
                    component="form"
                    sx={{
                      p: '0px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: '40px',
                      left: '412px',
                      border: '1.53151px solid rgba(0, 0, 0, 0.3)',
                      borderRadius: '10px',
                      marginRight: '10px',
                    }}
                  >
                    <InputBase
                      sx={{ ml: 0, flex: 1, fontSize: '13px' }}
                      placeholder="Search store by name"
                      value={query}
                      onChange={(e) => {
                        setQuery(e.target.value);
                      }}
                    />
                  </Paper>
                  <ButtonSmall
                    // width="120px"
                    height="40px"
                    borderRadius="16px"
                    padding="0 10px"
                    fontSize="12px"
                    backgroundColor=" #0A503D"
                    text="SEARCH"
                    color="#fff"
                    onClick={() => search()}
                  />
                </Box>
                {isLoading ? (
                  <Spinner />
                ) : stores?.length ? (
                  stores?.map((store, i) => (
                    <Box
                      key={store?.id}
                      component="div"
                      sx={{
                        display: 'grid',
                        cursor: 'pointer',
                        // justifyContent: 'space-evenly',
                        width: { md: '80%', xs: '100%' },
                        // height: { md: 'auto', xs: 'auto' },
                        alignItems: 'center',
                        background: '#FFFFFF',
                        boxShadow:
                          '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
                        borderRadius: ' 5.50833px',
                        gridTemplateColumns: {
                          md: '110px auto',
                          xs: '60px auto',
                        },
                        padding: '1rem 1rem',
                        gridGap: '10px',
                        margin: 'auto',
                        marginTop: '2rem',
                        // border: '1px solid red',
                      }}
                      onClick={() => {
                        router.push(`/store/${store?.id}`)
                        dispatch(toggleModal())
                      }}
                    >
                      <Box
                        sx={{
                          background: 'lightgrey',
                          width: { md: '100px', xs: '50px' },
                          height: { md: '100px', xs: '50px' },
                          boxShadow:
                            '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
                          borderRadius: '50%',
                          // border: '1px solid black',
                          marginLeft: '10px',
                        }}
                      >
                        {!store?.store_image_url ? (
                          <></>
                        ) : (
                          <img src={store?.store_image_url} />
                        )}
                        {/* <Image
                      src={store?.store_image_url} 
                    /> */}
                      </Box>
                      <Box
                        sx={{
                          marginLeft: '1rem',
                        }}
                      >
                        <Typography
                          sx={{
                            wordBreak: 'break-word',
                            fontWeight: 'bold',
                            fontSize: '13.5px',
                          }}
                        >
                          {store?.name}
                        </Typography>
                        <Typography
                          sx={{
                            wordBreak: 'break-word',
                            fontSize: '10px',
                            padding: '.5rem 0',
                          }}
                        >
                          {store?.address}
                        </Typography>
                        <Typography
                          sx={{ wordBreak: 'break-word', fontSize: '10px' }}
                        >
                          {store?.contact_phone}
                        </Typography>
                      </Box>
                    </Box>
                  ))
                ) : (
                  <Typography
                    sx={{
                      textAlign: 'center',
                      color: 'grey',
                      marginTop: '20px',
                    }}
                  >
                    No Stores Found!
                  </Typography>
                )}
              </DialogContent>
            </>
          )}
          <DialogActions sx={{ justifyContent: 'center' }}>
            <ButtonSmall
              width="170px"
              height="40px"
              borderRadius="16px"
              fontSize="12px"
              backgroundColor=" #0A503D"
              text="SEARCH NEW STORE"
              color="#fff"
              onClick={props.newStore}
            />
          </DialogActions>
        </Box>
      )}
    </Modal>
  );
}
