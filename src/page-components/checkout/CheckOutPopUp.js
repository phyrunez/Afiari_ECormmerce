import { Box, Typography, Divider } from '@mui/material';
import React, { useState } from 'react';
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

function CheckOutPopUp({ setShowModal }) {
  const [countrySelected, setCountrySelected] = useState();
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [dialCode, setDialCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');

  const { dialCodes } = useSelector((state) => state.checkout);

  const checkDialCode = dialCodes.filter((item) => {
    return item.country_text === countrySelected;
  });

  const dispatch = useDispatch();

  const handleNewAddress = (e) => {
    e.preventDefault();
    if (
      countrySelected === '' ||
      state === '' ||
      city === '' ||
      address === '' ||
      phone === '' ||
      dialCode === '' ||
      fullName === ''
    ) {
      toast.error('You need to provide all information');
    } else {
      const userAddress = {
        country: countrySelected,
        state: state,
        city: city,
        street: address,
        contactPhoneNumber: phone,
        fullName: fullName,
        dialCode: dialCode,
      };
      dispatch(addAddress(userAddress));
      dispatch(getAddress());
      toast.success('Delivery Address added successfully');
      setShowModal(false);
    }
  };

  return (
    <>
      <Box
        component="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: { xs: '250px', sm: '330px', md: '720px' },
          height: '750px',
          background: '#fff',
          borderRadius: '25px',
          padding: '30px 0px',
          marginTop: '3rem',
          zIndex: '1000000000000',
          top: '0',
          flexDirection: 'column',
          position: 'sticky',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '400',
            fontSize: { xs: '14px', md: '20px' },
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
            border: {
              xs: '0.46063px solid rgba(0, 0, 0, 0.3)',
              md: '1px solid rgba(0, 0, 0, 0.2)',
            },
          }}
        />

        <Box
          component="form"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: { xs: '26px', md: '58px' },
            padding: '0px 1rem',
          }}
        >
          <Input
            label="Full name"
            placeholder="Becky Oreva"
            htmlFor="full name"
            type="text"
            onChange={(e) => {
              setFullName(e.target.value);
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
              setAddress(e.target.value);
            }}
            name="address"
            id="address"
            value={address}
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
              setEmail(e.target.value);
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
              setPhone(e.target.value);
            }}
            name="phone"
            id="phone"
            value={phone}
            // icon={
            //   <IconButton>
            //     <Phone />
            //   </IconButton>
            // }
          />

          <select
            label="Country"
            placeholder="Nigeria"
            htmlFor="Country"
            type="text"
            onChange={(e) => {
              setCountrySelected(e.target.value);
            }}
            name="country"
            id="Country"
            value={countrySelected}
            className={styles.checkout_select_options}
          >
            {dialCodes.map((item) => {
              return <option key={item.id}>{item.country_text}</option>;
            })}
          </select>

          <select
            label="dialCode"
            placeholder="+234"
            htmlFor="dialCode"
            type="text"
            onChange={(e) => {
              setDialCode(e.target.value);
            }}
            name="dialCode"
            id="dialCode"
            value={dialCode}
            className={styles.checkout_select_options}
            // icon={
            //   <IconButton>
            //     <Phone />
            //   </IconButton>
            //
          >
            <option></option>
            {checkDialCode.map((item) => (
              <option key={item.id}>{item.dial_code}</option>
            ))}
          </select>

          <Input
            label="State"
            placeholder="Lagos"
            htmlFor="State"
            type="text"
            onChange={(e) => {
              setState(e.target.value);
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
              setCity(e.target.value);
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
            onClick={handleNewAddress}
            className={styles.checkout_pop_btn}
          />
        </Box>
      </Box>
    </>
  );
}

export default CheckOutPopUp;
