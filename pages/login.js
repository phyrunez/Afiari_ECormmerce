import { useEffect, useState } from 'react';
import { illustration, logo, VisibilityIcon } from '../assests/images/loginSvg';

import { Typography, Box, Hidden, CircularProgress } from '@mui/material';
import styles from '../styles/Input.module.css';

import {
  Input,
  LoginBtnComponent,
} from '../src/shared-components/InputComponent';
import { ButtonBig as Button } from '../src/shared-components/Button';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';
// import { login, reset } from '../redux/slice/auth/AuthSlice';
import { useRouter } from 'next/router';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { logInUser, handleUserInput } from '../src/redux/auth/authAction';
import { addMultipleCart } from '../src/redux/cart/cartAction';
import Spinner from '../components/Spinner';

const Login = () => {
  const { country, api_error, email, isLoggged_in, password, loading } =
    useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const router = useRouter();
  const path = router.query;
  // console.log(path);
  const [showpassword, setShowpassword] = useState(false);

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (user === user && isSuccess === true) {
  //     router.push('/');
  //   }

  //   dispatch(reset());
  // }, [isError, user, reset, isSuccess, message, router, dispatch]);

  //destructure form data

  //handling form submittion
  const onSubmit = (e) => {
    e.preventDefault();
    if (api_error) {
      toast.error(api_error);
    } else if (email === '' || password === '') {
      toast.error('Fields can not be empty');
    } else {
      const userData = {
        username: email,
        password: password,
      };

      // dispatch(login(userData));
      dispatch(logInUser(userData, router, path));
    }
  };

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: { lg: 'center', xs: 'center' },
          padding: { lg: '30px 50px  0 200px', xs: '24px' },
          width: '100%',
        }}
      >
        <Box
          className={styles.form__wrapper}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            marginLeft: { md: '50px', xs: '0px' },
          }}
        >
          <Link href="/">
            <a>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {logo}
              </Box>
            </a>
          </Link>
          <Typography
            variant="h4"
            className={styles.form__header}
            sx={{
              width: '279px',
              height: '53px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '39px',
              lineHeight: '53px',
              textAlign: 'center',
              letterSpacing: '0.04em',
              color: '#3A3A33',
              marginTop: '20px',
              marginBottom: '14px',
            }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '22px',
              textAlign: 'center',
              letterSpacing: ' 0.04em',
              color: '#3A3A33',
              marginBottom: '24px',
            }}
          >
            Fill the information below to login to Afiari
          </Typography>

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

          <Input
            type={showpassword === false ? 'password' : 'text'}
            label="Password"
            htmlFor="password"
            placeholder="*********"
            icon={
              showpassword === true ? (
                <VisibilityOff
                  onClick={() => setShowpassword(!showpassword)}
                  sx={{
                    height: '20px',
                  }}
                />
              ) : (
                <Visibility
                  onClick={() => setShowpassword(!showpassword)}
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

          <Typography
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              width: { lg: ' 360px', sm: '360px', xs: '100%', md: '360px' },
              fontWeight: '400',
              fontSize: ' 14.1149px',
              lineHeight: ' 19px',
              color: ' #0A503D',
              cursor: 'pointer',
            }}
          >
            <Link href="/forget-password"> Forgot Password?</Link>
          </Typography>
          {/* 
          {api_error && (
            <Typography
              variant="caption"
              sx={{
                color: 'red',
                marginTop: 3,
              }}
            >
              {api_error}
            </Typography>
          )} */}

          <Button
            text="LOGIN"
            color="#fff"
            backgroundColor="#0A503D"
            onClick={(e) => onSubmit(e)}
            // isLoading={loading}
          />

          <LoginBtnComponent
            text="LOGIN WITH GOOGLE"
            text2="LOGIN WITH FACEBOOK"
          />

          <Typography
            sx={{
              marginBottom: '333px',
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '16px',
              lineHeight: '22px',
              marginTop: '16px',
              color: ' #3A3A33',
            }}
          >
            Don’t have an account?
            <Box
              component="span"
              sx={{
                color: ' #0A503D',
                marginLeft: '5px',
              }}
            >
              <Link href="/sign-up">
                <a>Sign up</a>
              </Link>
            </Box>
          </Typography>
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
          {illustration}
        </Box>
      </Box>
    </>
  );
};

export default Login;
