import {useEffect, useState, useRef} from 'react';
// import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonSmall } from '../../shared-components/Button'
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Search, Clear } from '@mui/icons-material';
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
import { getStores, toggleModal, getAllStoreProducts } from '../../redux/stores/storesActions'
import { ButtonSmall as Button } from '../../shared-components/Button';
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
    lon: null,
    lat: null,
  });
  const [coords, setCoords] = useState({
    longitude: null,
    latitude: null,
  });
  const [query, setQuery] = useState('');
  const [pending, setPending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [val, setVal] = useState('');
  const [storeState, setStoreState] = useState(false);
  const [hasSearch, setHasSearch] = useState(false);
  const [displayNewStore, setDisplayNewStore] = useState("");
  const [searchFieldLoaded, setSearchFieldLoaded] = useState(false);
  const searchFieldRef = useRef();
  const selectedRef = useRef()
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

  // useEffect(() => {
  //   console.log(stores)
  // })

  //HANDLING SEARCH STORE
  // useEffect(() => {
  //   const listener = event => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       console.log("Enter key was pressed. Run your function.");
  //       event.preventDefault();
  //       // callMyFunction();
  //       search(event)
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, [query]);

  // useEffect(() => {
  //   dispatch(getAllStoreProducts())
  //   console.log('Because am happy')
  // })

  useEffect(() => {
    if (stores.length === 0 && hasSearch) {
      setStoreState(true)
      setHasSearch(false)
    }
  }, [stores, hasSearch])

   //
  const search = (event) => { 
    // event.preventDefault()
    console.log(typeof event.keyCode)
    console.log(location.coords)
    if (event.keyCode === 13 && location.lon && location.lat) {
      setIsLoading(true);
      setHasSearch(false)
      dispatch(
        getStores({
          longitude: location.lon,
          latitude: location.lat,
          query: event.target.value,
          useQuery: true,
        })
      ).then(() => {
        setIsLoading(false);
        setQuery('');
        setHasSearch(true)
      })
      
    }
    
    // if(query === "") return 
    // setIsLoading(true)
    // dispatch(getStores({
    //   longitude: location.lon, 
    //   latitude: location.lat,
    //   query,
    //   useQuery: true
    // }))
    // .then(() => {
    //   setIsLoading(false);
    //   setQuery('');
    // })
    // if (query === event.target.value) {
    //   setIsLoading(true)
    //   dispatch(getAllStoreProducts())
    //   setStoreState(current => !current)
    // }
  }

  // const onSubmit = () => {
  //   console.log('Tesstig kdk')
  //   stores?.filter(post => {
  //     if (query === '') {
  //       return post;
  //     } else if (post.name.toLowerCase().includes(query.toLowerCase())) {
  //       return post;
  //     }
  //   })
  // }

  const searchAgain = () => {
    setStoreState(current => !current)
  }


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
        useQuery: false
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

  const clearSearchField = () => {
    setVal('')
  };


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

 

  // useEffect(() => {
  //   if(query !== "") return 
  //   dispatch(getStores({
  //     longitude: location.lon, 
  //     latitude: location.lat,
  //     query,
  //     useQuery: true
  //   }))
  // }, [query])

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
      {!storeState ? (
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
                    component="div"
                    sx={{
                      p: '0px 4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '80%',
                      height: '40px',
                      left: '412px',
                      border: '1.53151px solid rgba(0, 0, 0, 0.3)',
                      borderRadius: '15px',
                      marginRight: '10px',
                    }}
                  >
                    <IconButton
                      type="button"
                      sx={{ p: '10px' }}
                      aria-label="search"
                      onClick={() => clearSearchField()}
                    >
                      {
                        searchFieldLoaded ? <Clear /> : <Search />
                      }
                    </IconButton>

                    <input
                      style={{ marginLeft: 0, flex: 1, fontSize: '13px', border: '0px', outline: 'none' }}
                      placeholder="Enter name of store"
                      
                      onKeyDown={(e) => {
                        search(e)
                      
                      }}
                      // onChange={(e) => {
                      //   // setVal(e.target.value);
                      //   setQuery(e.target.value);
                      // }}
                    />
                  </Paper>
                  {/* <ButtonSmall
                    // width="120px"
                    height="40px"
                    borderRadius="16px"
                    padding="0 10px"
                    fontSize="12px"
                    backgroundColor=" #0A503D"
                    text="SEARCH"
                    color="#fff"
                    onClick={() => search()}
                  /> */}
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
                          <img src={store?.store_image_url} style={{ borderRadius: '50%', width: { md: '100px', xs: '50px' },
                          height: { md: '100px', xs: '50px' }}} />
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
                )
                }
              </DialogContent>
            </>
          )}
          {/* <DialogActions sx={{ justifyContent: 'center' }}>
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
          </DialogActions> */}
        </Box>
      ) : (
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
          <DialogContent>
            <Box
              sx={{
                textAlign: 'center',
              }}
            >
              <Typography sx={{ color: 'red', paddingBottom: '20px'}}>Oops!!!</Typography>
              <Typography sx={{ color: 'red', paddingBottom: '20px'}}>Seems the store is not registered with us.</Typography>
              <Typography sx={{color: 'black', fontSize: '13px'}}>Please search for another option.</Typography>
            </Box>
            <Box
              component="div"
              sx={{
                width: '350px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                margin: 'auto',
                marginTop: '30px'
              }}
            >
              <Button
                text="SEARCH AGAIN"
                color="#fff"
                width="140px"
                fontSize="10px"
                borderRadius="12.9771px"
                backgroundColor="#0A503D"
                fontWeight="600"
                lineHeight="8px"
                height="30px"
                onClick={() => searchAgain()}
              />
              <Button
                text="GO BACK"
                color="#0A503D"
                width="140px"
                fontSize="10px"
                borderRadius="12.9771px"
                backgroundColor="#fff"
                fontWeight="600"
                lineHeight="8px"
                height="30px"
                border=" 1px solid #0A503D"
                onClick={() => {
                  dispatch(toggleModal())
                  setStoreState(current => !current)
                }}
              />
            </Box>
          </DialogContent>
        </Box>
      )}
    </Modal>
  );
}
