import { Box } from '@mui/system';
import React, { useState } from 'react';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import Link from 'next/link'
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
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Navbar /></Box>
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
            marginTop: '3rem', 
            paddingRight: '-200rem !important',
            display: { lg: 'flex', xs: 'none' },
            left: '110.5rem'
          }}
        >
          <BackButton />
        </Box>
        {showNav && <AuthenticationPages
          heading="CHECK YOUR MAIL"
          subHeading="We sent a password reset link to your mail"
          paddinglg="10px"
          paddingxs="10px"
          question="Didn’t get a mail?"
          questionValue=" Resend reset link"
          // btnText="OPEN EMAIL"
          onClick={onClick}
        />}
        {!showNav && <><Link href="/">
            <a>
              <Box
                sx={{
                  display: {lg: 'none', xs: 'flex'},
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {logo}
              </Box>
            </a>
          </Link>
          <AuthenticationPages
           heading="CHECK YOUR MAIL"
           subHeading="We sent a password reset link to your mail"
           paddinglg="10px"
           paddingxs="10px"
           question="Didn’t get a mail?"
           questionValue=" Resend reset link"
           btnText="OPEN EMAIL"
           onClick={onClick}
         /></>
        }
        {/* 
        <Button text="OPEN EMAIL" color="#fff" backgroundColor="#0A503D" /> */}
      </Box>
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Footer /></Box>
   </Box>
  );
};

export default MailConfirmation;
