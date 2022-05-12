import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
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
          flexDirection: { xs: 'column', md: 'row' },

          alignItems: 'center',
          justifyContent: 'center',
          //   paddingTop: '3rem',
          //   paddingBottom: '15rem',
          padding: {
            xs: '4rem 0rem 15rem 0rem',
            md: '100px 180px 15rem 180px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            order: { md: '2' },
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            marginLeft: { md: '2rem' },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: { xs: '19px', md: '31px' },
              lineHeight: { xs: '22px', md: '27px' },
              marginBottom: '16px',
              color: '#000',
            }}
          >
            THANK YOU, AGAIN
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontWeight: '300',
              fontSize: { xs: '12px', md: '25px' },
              lineHeight: { xs: '16px', md: '27px' },
              marginBottom: '58px',
              color: '#000',
            }}
          >
            Your food items will be with you in a few hours
          </Typography>
        </Box>
        <img
          src="/thank_you_illustration.svg"
          alt="illustration "
          width={237.9}
          height={181}
          style={{
            order: { md: '1' },
          }}
        />
      </Box>
      <Footer />
    </>
  );
}

export default ThankYou;
