import { Box, Hidden } from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthenticationPages from '../components/AuthenticationPages-2';
import forgot_password_illustration from '../public/forgot_password_illustration.svg';
import { logo } from '../assests/images/loginSvg';
import Spinner from '../components/Spinner';
import {
  forgetPassword,
  handleUserInput,
} from '../src/redux/auth/authAction';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import Image from 'next/image';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';
import { useRouter } from 'next/router';
import BackButton from '../src/shared-components/BackButton';
import appRoutes from './../constants/appRoutes'

const ForgetPassword = () => {
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '5rem',
          width: '100%',
          marginBottom: '15rem',
          marginTop: '-5rem'
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
          <Box sx={{ marginTop: '3rem', paddingRight: '-200rem !important'}}>
            <BackButton />
          </Box>
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
            display: { lg: 'flex', xs: 'none' },
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
      <Footer />
    </Box>
  );
};

export default ForgetPassword;
