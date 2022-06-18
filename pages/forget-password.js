import { Box, Hidden } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthenticationPages from '../components/AuthenticationPages-2';
import forgot_password_illustration from '../public/forgot_password_illustration.svg';
import styles from '../styles/Input.module.css';
import { logo } from '../assests/images/loginSvg';
import Spinner from '../components/Spinner';
import {
  forgetPassword,
  handleUserInput,
} from '../src/redux/auth/authAction';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';
import { useRouter } from 'next/router';
import BackButton from '../src/shared-components/BackButton';
import appRoutes from './../constants/appRoutes'

const ForgetPassword = () => {
  const [showNav, setShowNav] = useState(false)
  const { email, loading, forget_password: forgotPasswordResult } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const listener = event => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        console.log("Enter key was pressed. Run your function.");
        event.preventDefault();
        // callMyFunction();
        onSubmit(event)
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [ email ]);

  const onSubmit = () => {
    // e.preventDefault();

    dispatch(forgetPassword(email)).then(() => {
      if (forgotPasswordResult.status === false) {
        toast.error(forgotPasswordResult.error_message);
      }else {
        // router?.push(`${ router?.basePath }${appRoutes.MAIL_CONFIRMATION}`);
        router?.push('/mail-confirmation');
        toast.success(forgotPasswordResult.success_message);
      }
    });
  };

  const tempStyle = {
    backgroundColor: 'red',
    '@media screen and (max-width: 600px)' : {
      backgroundColor: 'blue',
    }
  }
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: {lg: 'center', md: 'center', sm: 'center'},
        justifyContent: {lg: 'center', md: 'center', sm: 'center'},
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        margin: {xs: '2rem 12rem', md: 'auto', lg: 'auto'}
        // border: '1px solid red',
      }}
    >
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Navbar /></Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem',
          width: '100%',
          marginBottom: '15rem',
          marginTop: '-3.5rem'
        }}
      >
        <Box
          // style={tempStyle}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: {lg: 'center', md: 'center', sm: 'center', xs: 'center'},
            justifyContent: {lg: 'center', md: 'center', sm: 'center', xs: 'center'},
            padding: '4.5rem',
          }}
        >
          <Box 
            sx={{ 
              marginTop: '3rem', 
              paddingRight: '-200rem !important',
              display: {lg: 'flex', xs: 'none', sm: 'none'},
              left: '110.5rem'
            }}
            >
            <BackButton />
          </Box>
          {showNav && <AuthenticationPages
            heading="FORGOT PASSWORD"
            subHeading="Please enter your email so we can send you reset instructions"
            paddinglg="10px"
            paddingxs="10px"
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
              heading="FORGOT PASSWORD"
              subHeading="Please enter your email so we can send you reset instructions"
              paddinglg="10px"
              paddingxs="10px"
            />
            </>
          }
          <Input
            type="text"
            label="Email"
            htmlFor="email"
            placeholder="somebody@mail.com"
            onChange={(e) => {
              dispatch(handleUserInput('email', e.target.value));
            }}
            name="email"
            id="email"
            value={email}
          />

          <Button
            text="SUBMIT"
            color="#fff"
            backgroundColor="#0A503D"
            onClick={e => onSubmit(e)}
            isLoading={loading}
          />
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', sm: 'none' },
            marginLeft: '7rem',
            marginTop: '2rem'
          }}
        >
          <Image
            src={forgot_password_illustration}
            alt="forgotPassword illustration"
            width={419}
            height={317}
          />
        </Box>
      </Box>
      <Box sx={{ display: {lg: 'flex', xs: 'none'}, width: '100%'}}><Footer /></Box>
    </Box>
  );
};

export default ForgetPassword;
