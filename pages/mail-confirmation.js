import { Box } from '@mui/system';
import React from 'react';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import { useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages';
import Spinner from '../components/Spinner';
import BackButton from '../src/shared-components/BackButton';
import { useRouter } from 'next/router';

const MailConfirmation = () => {
  const router = useRouter();

  const onClick = (e) => {
    e.preventDefault();
    router.push('/');
  };

  return (
   <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
        }}
      >
        <BackButton />

        <AuthenticationPages
          heading="CHECK YOUR MAIL"
          subHeading="We sent a password reset link to your mail"
          paddinglg="10px"
          paddingxs="10px"
          question="Didn’t get a mail?"
          questionValue=" Resend reset link"
          btnText="OPEN EMAIL"
          onClick={onClick}
        />
        {/* 
        <Button text="OPEN EMAIL" color="#fff" backgroundColor="#0A503D" /> */}
      </Box>
      <Footer />
   </div>
  );
};

export default MailConfirmation;
