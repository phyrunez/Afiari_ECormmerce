import { Box, Divider, Typography } from '@mui/material';
import React from 'react';
import { ButtonSmall } from '../../shared-components/Button';
import { Input } from '../../shared-components/InputComponent';
import styles from '../../../styles/Shop.module.css';

const paymentMethod = [
  {
    label: 'Paystack',
    value: 'paystack',
  },
  {
    label: 'Pay On Delivery',
    value: 'Pay On Delivery',
  },
  {
    label: 'Flutterwave',
    value: 'Flutterwave',
  },
];

function CheckOutOldPayment({ handlePayment }) {
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          width: ' 100%',
          height: ' 100%',
          background: ' rgba(0, 0, 0, 0.53)',
          zIndex: '100000000',
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
        onClick={handlePayment}
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
            PAYMENT DETAILS
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
              label="Card holder"
              placeholder="Becky Oreva"
              htmlFor="full name"
              type="text"
              //   onChange={}
              name="full name"
              id="full name"
              //   onClick={}
            />
            <Input
              label="Card number"
              placeholder="502345678912"
              htmlFor="Card number"
              type="number"
              //   onChange={}
              name="Card number"
              id="Card number"
              //   onClick={}
            />
            <Input
              label="Expiry date"
              placeholder="mm/yy"
              htmlFor="Expiry date"
              type="text"
              //   onChange={}
              name="Expiry date"
              id="Expiry date"
              //   onClick={}
            />
            <Input
              label="CVV"
              placeholder="***"
              htmlFor="CVV"
              type="password"
              //   onChange={}
              name="CVV"
              id="CVV"
              //   onClick={}
            />

            <ButtonSmall
              text="PAY NOW"
              backgroundColor="#0A503D"
              borderRadius="50px"
              width="338px"
              height="48px"
              color="#fff"
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default CheckOutOldPayment;
