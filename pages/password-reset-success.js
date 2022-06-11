import password_success_illustration from '../public/password_success_illustration.svg';

import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

import { ButtonBig as Button } from '../src/shared-components/Button';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import AuthenticationPages from '../components/AuthenticationPages-2';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

const MailConfirmation = () => {
  const router = useRouter();

  const onClick = () => {
    router.push('/login');
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        width: '100%',
        height: '100%'
      }}
    >
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Navbar /></Box>
      {/* <AuthenticationPages /> */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          // flexDirection: {xs: 'column'},
          justifyContent: 'center',
          padding: '5rem',
          width: '100%',
          marginBottom: '20rem',
          marginTop: '1rem'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3.7rem',
          }}
        >
          <Typography
            sx={{
              textAlign: 'center',
              fontSize: '30px',
              fontWeight: 'bold',
              color: '#000',
            }}
          >
            Your password has been reset successfully.
          </Typography>

          <Button
            text="LOGIN"
            color="#fff"
            backgroundColor="#0A503D"
            onClick={onClick}
          />
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', xs: 'none' },
            marginTop: '1rem'
          }}
        >
          <Image
            src={password_success_illustration}
            alt="passwordSuccess illustration"
            width={519}
            height={417}
          />
        </Box>
      </Box>
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Footer /></Box>
    </Box>
  );
};

export default MailConfirmation;
