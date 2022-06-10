import { Box } from '@mui/system';
import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages-2';
import Spinner from '../components/Spinner';
import { handleUserInput, resetPassword, verifyPasswordReset } from '../src/redux/auth/authAction';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';
import Image from 'next/image';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import reset_password_illustration from '../public/reset_password_illustration.svg';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import BackButton from '../src/shared-components/BackButton';

const ResetPassword = ({ isLinkVerified, err_message }) => {
  const [showPassword, setShowPassword] = useState(false)

  const router = useRouter();
  const dispatch = useDispatch();
  const email = router.query.email;
  const token = router.query.token;

  const { password, loading, repeat_password } = useSelector(
    (state) => state.auth
  );

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      toast.error('Fields can not be empty');
    } else if (password !== repeat_password) {
      toast.error('Password does not match');
    } else {
      const userData = {
        email,
        token: token,
        newPassword: password,
        confirmNewPassword: repeat_password,
      };

      dispatch(resetPassword(userData)).then((args) => {
        console.log(args);
        toast.success('Your password has been reset successfully.');
        router.push('/password-reset-success');
      });
    }
  };

  if (isLinkVerified) {
    return (
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxHeight: '100%',
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
              heading="RESET PASSWORD"
              subHeading="Set a new password for your profile on Afiari"
              paddinglg="10px"
              paddingxs="10px"
            />
            <Input
              type={showPassword === false ? 'password' : 'text'}
              label="New Password"
              htmlFor="password"
              placeholder="************"
              icon={
                showPassword === true ? (
                  <VisibilityOff
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      height: '20px',
                    }}
                  />
                ) : (
                  <Visibility
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      height: '20px',
                    }}
                  />
                )
              }
              onChange={(e) => {
                dispatch(handleUserInput('password', e.target.value));
              }}
              name="password"
              id="password"
              value={password}
            />
            <Input
              type={showPassword === false ? 'password' : 'text'}
              label="Confirm Password"
              htmlFor="repeat_password"
              placeholder="************"
              icon={
                showPassword === true ? (
                  <VisibilityOff
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      height: '20px',
                    }}
                  />
                ) : (
                  <Visibility
                    onClick={() => setShowPassword(!showPassword)}
                    sx={{
                      height: '20px',
                    }}
                  />
                )
              }
              onChange={(e) => {
                dispatch(handleUserInput('repeat_password', e.target.value));
              }}
              name="repeat_password"
              id="repeat_password"
              value={repeat_password}
            />
            <Button
              text="RESET PASSWORD"
              color="#fff"
              backgroundColor="#0A503D"
              onClick={onSubmit}
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
              src={reset_password_illustration}
              alt="forgotPassword illustration"
              width={419}
              height={317}
            />
          </Box>
        </Box>
        <Footer />
      </Box>
    );
  } else {
    return <Box>{err_message}</Box>
  }
};

export async function getServerSideProps(context) {
  const email = context.query.email;
  const token = context.query.token;
  if (!email || !token) return {
    props: { isLinkVerified: true, err_message: 'Invalid email' },
  }
  try {
    const result = await verifyPasswordReset(email, token)
    console.log(result)
    if (result.status === true) {
      return {
        props: { isLinkVerified: true }
      }
    } else {
      return {
        props: { isLinkVerified: false, err_message: 'Invalid email' },
      };
    }
  } catch (err) {
    console.log(err)
    return {
      props: { isLinkVerified: false, err_message: 'Server Error! Reload page to continue.' },
    };
  }
}
export default ResetPassword;

