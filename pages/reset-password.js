import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages';
import Spinner from '../components/Spinner';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';

const ResetPassword = () => {
  const { isLogged_in, country, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }
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
        heading="RESET PASSWORD"
        subHeading="Set a new password for your profile on Afiari"
        paddinglg="10px"
        paddingxs="10px"
      />
      <Input
        type="text"
        label="Email"
        htmlFor="email"
        placeholder="somebody@mail.com"
      />
      <Input
        type="password"
        label="password"
        htmlFor="password"
        placeholder="************"
      />

      <Button text="RESET PASSWORD" color="#fff" backgroundColor="#0A503D" />
    </Box>
  );
};

export default ResetPassword;
