import { useEffect, useState, useRef } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonSmall } from '../../shared-components/Button';
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import Skeleton from '@mui/material/Skeleton';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import { toast } from 'react-toastify';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Spinner from '../../../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, clearStore } from '../../redux/stores/storesActions';
import { toggleModal } from '../../redux/stores/storesActions';
import { Paper, Box, InputBase } from '@mui/material';
import MapIcon from '../../../public/Marker.svg';

export default function StoresLocation(props) {
  const [coords, setCoords] = useState({
    longitude: null,
    latitude: null,
  });
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const dispatch = useDispatch();
  const { stores, suggestions, toggleModalState } = useSelector(
    (state) => state.stores
  );
  const [accessInfo, setAccessInfo] = useState({
    browserAccess: null,
    statusMessage: 'Please, click the allow button at the top to continue',
    userResponse: null,
  });

  //SHOW TOAST ERROR
  useEffect(() => {
    if (accessInfo.browserAccess === null && accessInfo.userResponse === null)
      return;
    toast.error(accessInfo.statusMessage);
  }, [accessInfo]);

  // HANDLE USER LOCATION RESPONSE
  const handleLocationResponse = (location) => {
    // console.log(location)
    if (!location) {
      setAccessInfo({
        ...{
          browserAccess: false,
          statusMessage:
            'Location access failed, Please click the button below to retry',
          userResponse: null,
        },
      });
    } else {
      setCoords({
        ...{
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      });
    }
    setPending(false);
  };

  //HANDLE USER LOCATION DECLINE
  const handleLocationDecline = () => {
    setAccessInfo({
      ...{
        browserAccess: true,
        statusMessage: 'Please enable geolocation to use this feature.',
        userResponse: false,
      },
    });
    setPending(false);
  };

  // GET USER LOCATION
  const getUserLocation = () => {
    if (!toggleModalState) return;
    if (navigator.geolocation) {
      navigator.permissions
        .query({
          name: 'geolocation',
        })
        .then(function (result) {
          if (result.state == 'denied') {
            setAccessInfo({
              ...{
                browserAccess: true,
                statusMessage: 'Enable geolocation to use this feature.',
                userResponse: false,
                retryable: false,
              },
            });
            setPending(false);
          } else {
            setAccessInfo({
              ...{
                browserAccess: null,
                statusMessage:
                  'Please, click the allow button at the top to continue',
                userResponse: null,
              },
            });
            setPending(true);
            navigator.geolocation.getCurrentPosition(
              handleLocationResponse,
              handleLocationDecline
            );
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
  };

  //SEARCH
  const search = () => {
    if (!coords) return;
    setLoading(true);
    dispatch(
      getStores({
        longitude: location.lon,
        latitude: location.lat,
        useQuery: false,
      })
    ).then(() => {
      setLoading(false);
    });
  };

  // SET LOCATION
  const setSelectedLocation = (coords) => {
    if (!coords) getUserLocation();
    else
      setCoords({
        ...{ longitude: coords.longitude, latitude: coords.latitude },
      });
  };

  // GET SUGGESTIONS
  const setSuggestions = (value) => {
    dispatch(getSuggestions(value));
  }

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
          Local Stores Around You
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
            component="div"
            style={{
              display: 'flex',
              width: '100%',
              justifyContent: 'center',
            }}
          >
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={displayLocation}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <Box
                  component="div"
                  sx={{
                    boxSizing: 'border-box',
                    border: '1px solid #9f9f9f',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '40px',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image src={MapIcon} alt="Marker" width={25} height={25} />
                  </Box>

                  <InputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    autoFocus
                    sx={{
                      paddingLeft: '10px',
                      fontSize: '12px',
                      width: '100%',
                      padding: '5px 40px',
                    }}
                    placeholder="You can search another location"
                    onChange={e => setSuggestions(e.target.value)}
                  />
                </Box>
              )}
              renderOption={(props, option) => (
                <Box
                  component="li"
                  {...props}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '0px',
                  }}
                  onClick={() => setSelectedLocation(options.coords)}
                >
                  <div>
                    <Image src={MapIcon} alt="Marker" width={25} height={25} />
                  </div>
                  <div
                    style={{
                      paddingLeft: '15px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      width: '11rem',
                    }}
                  >
                    {option.label}
                  </div>
                </Box>
              )}
            />
            <Button
              variant="contained"
              sx={{
                borderRadius: '50px',
                background: '#0a503d',
                marginLeft: '5px',
              }}
              disabled={!location || (location && loading)}
              onClick={search}
            >
              SEARCH
            </Button>
          </Box>
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
            <div />
          )}
          {loading ? (
            <Spinner />
          ) : stores?.length ? (
            stores?.map((store, i) => (
              <Box
                key={store?.id}
                component="div"
                sx={{
                  display: 'grid',
                  width: { md: '80%', xs: '100%' },
                  alignItems: 'center',
                  background: '#FFFFFF',
                  boxShadow: '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
                  borderRadius: ' 5.50833px',
                  gridTemplateColumns: { md: '110px auto', xs: '60px auto' },
                  padding: '1rem 1rem',
                  gridGap: '10px',
                  margin: 'auto',
                  marginTop: '2rem',
                }}
                onClick={() => router.push(`/store/${store?.id}`)}
              >
                <Box
                  sx={{
                    background: 'lightgrey',
                    width: { md: '100px', xs: '50px' },
                    height: { md: '100px', xs: '50px' },
                    boxShadow: '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
                    borderRadius: '50%',
                    marginLeft: '10px',
                  }}
                >
                  {!store?.store_image_url ? (
                    <></>
                  ) : (
                    <img src={store?.store_image_url} />
                  )}
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
              sx={{ textAlign: 'center', color: 'grey', marginTop: '20px' }}
            ></Typography>
          )}
          <Typography
            sx={{ textAlign: 'center', color: 'grey', margin: '50px 0' }}
          ></Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', margin: '0 0 20px 0' }}>
          <ButtonSmall
            width="170px"
            height="40px"
            borderRadius="16px"
            fontSize="12px"
            backgroundColor=" #0A503D"
            text="GO BACK"
            color="#fff"
            onClick={props.storesAround}
          />
        </DialogActions>
        {/* </>
         )} */}
      </Box>
    </Modal>
  );
}
