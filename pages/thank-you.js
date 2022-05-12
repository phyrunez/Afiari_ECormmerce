import { Box, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import Footer from '../src/page-components/Footer';
import Navbar from '../src/shared-components/navbar/Navbar';

function ThankYou() {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: '3rem',
          paddingBottom: '15rem',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontStyle: 'bold',
            fontWeight: '400',
            fontSize: { xs: '19px', md: '31px' },
            lineHeight: { xs: '22px', md: '27px' },
            marginBottom: '16px',
            color: '#000',
          }}
        >
          THANK YOU, AGAIN
        </Typography>
        <Typography
          variant="h1"
          sx={{
            fontStyle: 'bold',
            fontWeight: '400',
            fontSize: { xs: '12px', md: '31px' },
            lineHeight: { xs: '16px', md: '27px' },
            marginBottom: '20px',
            color: '#000',
          }}
        >
          Your food items will be with you in a few hours
        </Typography>
        <img src="/thank_you_illustration.svg" alt="illustration " />
      </Box>
      <Footer />
    </>
  );
}

export default ThankYou;
