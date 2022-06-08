import { Box, Hidden } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthenticationPages from '../components/AuthenticationPages-2';
import { forgotPassword } from '../assests/images/loginSvg';
import Spinner from '../components/Spinner';
import {
  forgetPassword,
  handleUserInput,
  sendConfirmationMail,
} from '../src/redux/auth/authAction';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';
import { useRouter } from 'next/router';
import { ArrowBackIos } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import BackButton from '../src/shared-components/BackButton';

const ForgetPassword = () => {
  const { country, api_error, email, isLoggged_in, password, loading } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '') {
      toast.error('Fields can not be empty');
    } else {
      // dispatch(login(userData));
      dispatch(forgetPassword(email));
      router.push('/mail-confirmation');
    }
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
