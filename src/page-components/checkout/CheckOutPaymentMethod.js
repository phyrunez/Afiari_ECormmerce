import { Box, TextField, Typography } from '@mui/material';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import {
  getAddress,
  getOrderNumber,
  getPaymentOptions,
  handleSelectedAddress,
  handleSelectedPaymentMethod,
  initializePayment,
  placeOrder,
  publicKey,
  verifyPayment,
} from '../../redux/checkout/checkoutAction';
import { useDispatch, useSelector } from 'react-redux';
import { ButtonSmall } from '../../shared-components/Button';
import { usePaystackPayment, PaystackButton } from 'react-paystack';
import { toast } from 'react-toastify';
import styles from '../../../styles/Payment.module.css';

// const useStyles = makeStyles((theme) => ({
//   checkoutButton: {
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: { xs: '263px', md: '515px' },
//     height: { xs: '40px', md: '79px' },
//     background: '#0A503D',
//     borderRadius: {
//       xs: '0px 0px 31.5402px 31.5402px',
//       md: '0px 0px 61.8375px 61.8375px',
//     },
//     fontWeight: '600',
//     fontSize: { xs: '12px', md: ' 25px' },
//     lineHeight: ' 19px',
//     textAlign: 'center',
//     letterSpacing: ' 0.04em',
//     cursor: 'pointer',
//     color: ' #FFFFFF',
//     '&:hover': {
//       backgroundColor: '#0a3d30',
//     },
//   },
// }));

// const config = {
//   reference: JSON.parse(localStorage.getItem('ref')),
//   // email: email,
//   // amount: finalAmount,
//   // publicKey: public_key,
// };

function CheckOutPaymentMethod({ handleModal }) {
  const {
    selectedPayment,

    payment_method,
    user_address,
    selectedAddress,
    order_number,
    public_key,
    ref,
    verify,
  } = useSelector((state) => state.checkout);
  const { cart } = useSelector((state) => state.cart);

  const { country, email } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const orderNumber = order_number?.[0]?.order_number;

  const totalAmount = order_number?.[0]?.total_cost;

  // hhh
  const finalAmount = Math.round(+totalAmount?.replace(/,/g, '') * 100);

  console.log(ref);

  // you can call this function anything
  const onSuccess = (reference) => {
    console.log(reference);
    localStorage.removeItem('ref');
  };

  const onClose = () => {
    toast.error('Order Cancel');
  };

  // toast.success(place_order);

  const componentProps = {
    reference: ref,
    email: email,
    amount: finalAmount,
    publicKey: public_key,
    // reference: getRef,
    // ...config,
    text: `PAY NOW `,
    // ${
    //   `${cart?.cart?.[0]?.currency} ` + cart?.cart?.[0]?.charged_total_cost
    // }

    onSuccess: (reference) => {
      // verify payment here with the verify route
      dispatch(verifyPayment(reference.reference));

      setTimeout(() => {
        if (verify === true) {
          toast.success('Payment received proceed to place order');
        } else {
          toast.error('Payment verification Failed');
        }
      }, 2000);
      // any action that you want to perform after payment is succesfull

      onSuccess(reference);
      console.log('success');
      // console.log(config);
    },

    onClose: () => {
      //terminate payment here with the terminate route
      onClose();
    },
  };

  useEffect(() => {
    dispatch(getPaymentOptions());
    dispatch(getAddress());
    localStorage.removeItem('ref');
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
              flexDirection: 'column',
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
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
                    background:
                      selectedPayment === item.id ? '#0A503D' : '#fff',
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
                    dispatch(initializePayment(orderNumber));
                    console.log(selectedPayment);
                  }}
                >
                  {item.item_value.toUpperCase()}
                </Box>
              ))}
            </Box>

            <PaystackButton
              className={
                selectedPayment === ''
                  ? styles.paystackButtonDisabled
                  : styles.paystackButton
              }
              {...componentProps}
            />

            {/* <ButtonSmall
              text="PAY NOW"
              backgroundColor="#0A503D"
              width="90px"
              height="30px"
              color="#fff"
              fontSize="12px"
              onClick={payWithPayStack}
            /> */}
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
