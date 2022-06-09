import { Box, Hidden } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import AuthenticationPages from '../components/AuthenticationPages-2';
import { forgotPassword } from '../assests/images/loginSvg';
import Spinner from '../components/Spinner';
=======
import AuthenticationPages from '../components/AuthenticationPages';
>>>>>>> 8e12c7f91102927587651fda125c7654e03ed510
import {
  forgetPassword,
  handleUserInput,
} from '../src/redux/auth/authAction';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
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

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(forgetPassword(email)).then(() => {
      if (forgotPasswordResult.status === false) {
        toast.error(forgotPasswordResult.error_message);
      }else {
        router?.push(`${ router?.basePath }${appRoutes.MAIL_CONFIRMATION}`);
        toast.success(forgotPasswordResult.success_message);
      }
    });
  };
  return (
    <div>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          padding: '1rem'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
          }}
        >
          <BackButton />
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
            onClick={onSubmit}
            isLoading={loading}
          />
        </Box>
        <Box
          xs={Hidden}
          sx={{
            marginTop: '110px',
            display: { xs: 'none', lg: 'flex' },
            // width: '400px',
            marginRight: '3rem',
          }}
        >
          {forgotPassword}
        </Box>
      </Box>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
