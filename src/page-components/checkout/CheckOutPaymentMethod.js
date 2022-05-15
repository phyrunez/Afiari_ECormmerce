import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  getAddress,
  getOrderNumber,
  getPaymentOptions,
  handleSelectedAddress,
  handleSelectedPaymentMethod,
  publicKey,
} from '../../redux/checkout/checkoutAction';
import { useDispatch, useSelector } from 'react-redux';

function CheckOutPaymentMethod({ handleModal }) {
  const {
    selectedPayment,
    name,
    payment_method,
    user_address,
    selectedAddress,
  } = useSelector((state) => state.checkout);

  const { country } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPaymentOptions());
    dispatch(getAddress());
  }, [dispatch]);

  return (
    <>
      <Box>
        <Box
          sx={{
            paddingRight: { md: '15px' },
            // padding: { xs: '0rem 1rem' },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: { xs: '21px', md: '31px' },
              lineHeight: '42px',
              letterSpacing: '0.04em',
              textAlign: 'center',
              color: ' #3A3A3A',
            }}
          >
            Choose a Payment Method
          </Typography>
          <Box
            sx={{
              display: { xs: 'flex', md: 'flex' },
              gridTemplateColumns: { xs: 'repeat(2, 1fr)' },
              gap: 5,
              alignItems: 'center',
              justifyContent: 'space-evenly',
              width: { xs: '100%', md: '450px', lg: '652px' },
              height: ' 231px',
              background: '#FFFFFF',
              boxShadow: ' 0px 8px 16px rgba(0, 0, 0, 0.08)',
              borderRadius: ' 15px',
              padding: '0px 37px',
            }}
          >
            {payment_method.map((item, i) => (
              <Box
                key={item.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: { xs: '100%', sm: ' 120.11px' },
                  height: '80px',
                  background: selectedPayment === item.id ? '#0A503D' : '#fff',
                  borderRadius: ' 7.74011px',
                  color: selectedPayment === item.id ? '#fff' : '#000',
                  fontSize: '10px',
                  cursor: 'pointer',
                  boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.08)',
                }}
                onClick={() => {
                  dispatch(handleSelectedPaymentMethod(item.id));
                  dispatch(publicKey());
                  dispatch(getOrderNumber(country));
                  console.log(selectedPayment);
                }}
              >
                {item.item_value.toUpperCase()}
              </Box>
            ))}
          </Box>
        </Box>

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            // alignItems: 'center',
            justifyContent: 'center',
            marginTop: '47px',
          }}
        >
          <Typography
            variant="P"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '1rem',
              textAlign: 'center  ',
            }}
          >
            Select a Customer information for your delivery
          </Typography>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {user_address.map((address) => (
              <Box
                key={address.id}
                component="form"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: { xs: '281px', sm: '350px', md: '498px' },
                  height: { xs: '180px', md: '246px' },
                  background: ' #FFFFFF',
                  boxShadow: ' 0px 6.1118px 12.2236px rgba(0, 0, 0, 0.08)',
                  borderRadius: '25px',
                  border:
                    selectedAddress.id === address?.id
                      ? ' 3px solid #0A503D'
                      : 'none',
                  padding: { xs: '1rem 40px', md: '52px 75px' },
                  marginTop: '19px',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  // setSelectedAddress(!selectedAddress);

                  dispatch(handleSelectedAddress(address));
                }}
              >
                <Typography
                  sx={{
                    fontWeight: '700',
                    fontSize: { xs: '14px', md: '24px' },
                    lineHeight: '33px',

                    letterSpacing: ' 0.04em',

                    color: ' rgba(0, 0, 0, 0.7)',

                    marginBottom: { xs: '16px', md: '32px' },
                  }}
                >
                  {address.contact_name}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '10px', md: '16px' },
                    lineHeight: '22px',

                    letterSpacing: ' 0.04em',

                    color: ' rgba(0, 0, 0, 0.7)',

                    marginBottom: { xs: '16px', md: '32px' },
                  }}
                >
                  {address.street}
                </Typography>
                <Typography
                  sx={{
                    fontWeight: '600',
                    fontSize: { xs: '8px', md: '16px' },
                    lineHeight: '22px',

                    letterSpacing: ' 0.04em',

                    color: ' rgba(0, 0, 0, 0.7)',

                    marginBottom: { xs: '16px', md: '32px' },
                  }}
                >
                  {address.phone_number}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            // justifyContent: 'center',
            marginTop: '52px',
            cursor: 'pointer',
            marginBottom: '2rem',
          }}
          onClick={handleModal}
        >
          <span
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '15px',
              height: '15px',
              color: '#0A503D',
              border: '0.916667px solid #0A503D',
              borderRadius: '100%',
              marginRight: '39px',
            }}
          >
            +
          </span>

          <Typography variant="p">add new delivery information</Typography>
        </Box>
      </Box>
    </>
  );
}

export default CheckOutPaymentMethod;
