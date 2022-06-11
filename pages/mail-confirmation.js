import { Box } from '@mui/system';
import React, { useState } from 'react';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import { useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages-2';
import Spinner from '../components/Spinner';
import { logo } from '../assests/images/loginSvg';
import BackButton from '../src/shared-components/BackButton';
import { useRouter } from 'next/router';

const MailConfirmation = () => {
  const [showNav, setShowNav] = useState(false)
  const router = useRouter();

  const onClick = (e) => {
    e.preventDefault();
    router.push('/');
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
      height: '100%',
      // border: '1px solid red',
    }}
   >
      <Navbar />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20rem',
          padding: '4.5rem',
        }}
      >
        <Box 
          sx={{
            display: { lg: 'flex', xs: 'none' },
            left: '-17.5rem'
          }}
        >
          <BackButton />
        </Box>
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
   </Box>
  );
};

export default MailConfirmation;
