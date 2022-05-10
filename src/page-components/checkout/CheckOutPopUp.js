import { Box, Typography, Divider } from '@mui/material';
import React from 'react';
import styles from '../../../styles/Shop.module.css';
import { Input } from '../../shared-components/InputComponent';
import { IconButton } from '@mui/material';
import { LocationOn, Mail, Phone } from '@mui/icons-material';
import { ButtonSmall } from '../../shared-components/Button';
import { useSelector, useDispatch } from 'react-redux';
import {
  addAddress,
  getAddress,
  handleUserInput,
} from '../../redux/checkout/checkoutAction';
import { toast } from 'react-toastify';

function CheckOutPopUp({ onClick }) {
  const {
    country,
    dialCode,
    state,
    city,
    street,
    email,
    contactPhoneNumber,
    fullName,
  } = useSelector((state) => state.checkout);

  const dispatch = useDispatch();

  const handleNewAddress = (e) => {
    e.preventDefault();
    if (
      country === '' ||
      state === '' ||
      city === '' ||
      street === '' ||
      contactPhoneNumber === '' ||
      dialCode === '' ||
      fullName === ''
    ) {
      toast.error('You need to provide all information');
    } else {
      const userAddress = {
        country: country,
        state: state,
        city: city,
        street: street,
        contactPhoneNumber: contactPhoneNumber,
        fullName: fullName,
        dialCode: dialCode,
      };
      dispatch(addAddress(userAddress));
      dispatch(getAddress());
      onClick();
    }
  };

  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: ' 50%',
          height: ' 100%',
          background: ' rgba(0, 0, 0, 0.53)',
          zIndex: '100000000',
          border: '1px solid red',
        }}
        className={styles.checkout_pop_up}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: ' 100%',
          height: ' 100%',
          display: 'flex',
          paddingTop: '200px',
          justifyContent: 'center',
          padding: '0px .5rem',
          zIndex: '100000000000',
        }}
        // onClick={onClick}
      >
        <Box
          component="div"
          sx={{
            width: { xs: '100%', md: '720px' },
            height: '750px',
            background: '#fff',
            borderRadius: '25px',
            padding: '30px 0px',
            marginTop: '3rem',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '400',
              fontSize: '20px',
              lineHeight: '27px',
              textAlign: 'center',
              letterSpacing: '0.04em',
              marginBottom: '18px',
            }}
          >
            Please enter new contact details
          </Typography>

          <Divider
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.2)',
            }}
          />

          <Box
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: '58px',
              padding: '0px 1rem',
            }}
          >
            <Input
              label="Full name"
              placeholder="Becky Oreva"
              htmlFor="full name"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('fullName', e.target.value));
              }}
              name="fullName"
              id="fullName"
              value={fullName}
            />
            <Input
              label="Address"
              placeholder="59 Olasimbo Street, Jakande, Lagos"
              htmlFor="Address"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('street', e.target.value));
              }}
              name="street"
              id="Address"
              value={street}
              // icon={
              //   <IconButton>
              //     <LocationOn />
              //   </IconButton>
              // }
            />
            <Input
              label="Email"
              placeholder="somebody@mail.com"
              htmlFor="email"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('email', e.target.value));
              }}
              name="email"
              id="email"
              value={email}
              // icon={
              //   <IconButton>
              //     <Mail />
              //   </IconButton>
              // }
            />
            <Input
              label="Phone"
              placeholder="08099999887"
              htmlFor="Phone"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('contactPhoneNumber', e.target.value));
              }}
              name="contactPhoneNumber"
              id="Phone"
              value={contactPhoneNumber}
              // icon={
              //   <IconButton>
              //     <Phone />
              //   </IconButton>
              // }
            />
            <Input
              label="dialCode"
              placeholder="08099999887"
              htmlFor="dialCode"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('dialCode', e.target.value));
              }}
              name="dialCode"
              id="dialCode"
              value={dialCode}
              // icon={
              //   <IconButton>
              //     <Phone />
              //   </IconButton>
              // }
            />
            <Input
              label="Country"
              placeholder="Nigeria"
              htmlFor="Country"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('country', e.target.value));
              }}
              name="country"
              id="Country"
              value={country}
            />
            <Input
              label="State"
              placeholder="Lagos"
              htmlFor="State"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('state', e.target.value));
              }}
              name="state"
              id="State"
              value={state}
            />
            <Input
              label="City"
              placeholder="Ikeja"
              htmlFor="City"
              type="text"
              onChange={(e) => {
                dispatch(handleUserInput('city', e.target.value));
              }}
              name="city"
              id="City"
              value={city}
            />

            <ButtonSmall
              text="ADD NEW DETAILS"
              backgroundColor="#0A503D"
              borderRadius="50px"
              width="338px"
              height="48px"
              color="#fff"
              onClick={() => {
                onClick();
                // handleNewAddress();
              }}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CheckOutPopUp;
