import successIllustration from '../public/successIllustration.svg';

import { Box, Typography } from '@mui/material';
import React from 'react';
import Image from 'next/image';

import { ButtonBig as Button } from '../src/shared-components/Button';
import AuthenticationPages from '../components/AuthenticationPages';

const MailConfirmation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
      }}
    >
      <AuthenticationPages />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          marginTop: '-3rem',
          marginBottom: '2rem',
        }}
      >
        <Image src={successIllustration} alt="illustration" />
      </Box>

      <Typography
        sx={{
          textAlign: 'center',
          fontSize: '20px',
          fontWeight: '600',
          color: '#000',
        }}
      >
        Your password has been reset successfully.
      </Typography>

      <Button text="LOGIN" color="#fff" backgroundColor="#0A503D" />
    </Box>
  );
};

export default MailConfirmation;
