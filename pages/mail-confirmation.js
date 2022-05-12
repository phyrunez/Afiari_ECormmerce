import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages';

const MailConfirmation = () => {
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
        heading="CHECK YOUR MAIL"
        subHeading="We sent a password reset link to your mail"
        paddinglg="10px"
        paddingxs="10px"
        question="Didn’t get a mail?"
        questionValue=" Resend reset link"
        btnText="OPEN EMAIL"
      />
      {/* 
      <Button text="OPEN EMAIL" color="#fff" backgroundColor="#0A503D" /> */}
    </Box>
  );
};

export default MailConfirmation;
