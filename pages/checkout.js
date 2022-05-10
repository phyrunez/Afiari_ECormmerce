import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import Footer from '../src/page-components/Footer';
import Navbar from '../src/shared-components/navbar/Navbar';

import CheckOutPopUp from '../src/page-components/checkout/CheckOutPopUp';
import CheckOutPaymentMethod from '../src/page-components/checkout/CheckOutPaymentMethod';
import CheckoutCart from '../src/page-components/checkout/CheckoutCart';
import { useState } from 'react';
import CheckOutOldPayment from '../src/page-components/checkout/CheckOutOldPaymentPopUp';

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);

  const onClick = () => {
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handlePayment = () => {
    setShowPaymentForm(false);
  };

  const handleCheckOut = () => {
    setShowPaymentForm(true);
  };

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {/* ////////////////////// pop up /////////////////////////////////////////////// */}
      {showModal && (
        <>
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              height: '100%',
              width: '100%',
              background: 'rgba(0, 0, 0, 0.53)',
              zIndex: '10000000000000',
              top: 0,
            }}
            onClick={onClick}
          ></Box>
          <CheckOutPopUp onClick={onClick} />
        </>
      )}

      {/* ////////////////////// end pop up /////////////////////////////////////////////// */}

      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 21px',
        }}
      >
        {/*/////////////////////////// up //////////////////////////////////////*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px 0px',
          }}
        >
          <Divider
            textAlign="center"
            sx={{
              border: '1px solid #E6E6E',
              width: { xs: '100%', md: '50%' },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                color: '#000',
                fontSize: { xs: '20px', md: '39px' },
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              CHECK OUT
            </Typography>
          </Divider>

          <Typography
            variant="p"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '25px',
              lineHeight: '34px',
              textAlign: 'center',
              letterSpacing: ' 0.04em',

              color: ' #3A3A3A',
            }}
          >
            One last look in your cart
          </Typography>
        </Box>

        {/*/////////////////////////// end up //////////////////////////////////////*/}

        {/*/////////////////////////// down //////////////////////////////////////*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { lg: 'row', xs: 'column' },
          }}
        >
          {/*////////////////////////////// left ////////////////////////////////////////////////*/}

          <CheckOutPaymentMethod handleModal={handleModal} />

          {/*////////////////////////////// left ////////////////////////////////////////////////*/}

          <Divider
            sx={{
              border: '1px solid rgba(0, 0, 0, 0.2)',
            }}
          />

          {/*/////////////////////////////////// right    ////////////////////////////// */}

          <CheckoutCart handleCheckOut={handleCheckOut} />

          {/*/////////////////////////////////// right    ////////////////////////////// */}
        </Box>
        {/*/////////////////////////// down end //////////////////////////////////////*/}
      </Box>
      <Footer />
    </Box>
  );
}

export default Checkout;
