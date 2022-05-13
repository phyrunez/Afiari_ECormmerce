import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages';
import Spinner from '../components/Spinner';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';

const ForgetPassword = () => {
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
      <AuthenticationPages
        heading="FORGOT PASSWORD"
        subHeading="Please enter your email so we can send you reset instructions"
        paddinglg="10px"
        paddingxs="10px"
      />
      <Input
        type="text"
        label="Email"
        htmlFor="email"
        placeholder="somebody@mail.com"
      />

      <Button text="SUBMIT" color="#fff" backgroundColor="#0A503D" />
    </Box>
  );
};

export default ForgetPassword;
