import { useEffect, useState } from 'react';
import { SignUpIllu, logo, VisibilityIcon } from '../assests/images/loginSvg';
import { Grid, Typography, Box, Hidden } from '@mui/material';
import {
  Input,
  LoginBtnComponent,
} from '../src/shared-components/InputComponent';
import { ButtonBig as Button } from '../src/shared-components/Button';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';

import { useRouter } from 'next/router';

import { VisibilityOff, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';
import {
  signUpUser,
  handleUserInput,
  getExistingMails,
} from '../src/redux/auth/authAction';
import Spinner from '../components/Spinner';

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [showpassword, setShowpassword] = useState(false);
  const [query, setQuery] = useState('');
  const [q, setQ] = useState(false);

  // const { email, firstName, lastName, password } = formData;

  const dispatch = useDispatch();

  const {
    email,
    firstName,
    lastName,
    password,
    loading,
    signup_api_message,
    existing_emails,
  } = useSelector((state) => state.auth);
  const router = useRouter();

  console.log(existing_emails);

  const emails = existing_emails?.result;

  // useEffect(() => {
  //   if (isError) {
  //     toast.error(message);
  //   }

  //   if (user === user && isSuccess === true) {
  //     router.push('/');
  //   }

  //   dispatch(reset());
  // }, [isError, user, isSuccess, message, router, dispatch]);

  // const onChange = (e) => {
  //   setFormData((prevState) => ({
  //     ...prevState,
  //     [e.target.name]: e.target.value,
  //   }));
  // };
  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password,
    };
    dispatch(signUpUser(userData, router))
      .then(() => {
        let signupMessage;
        if (typeof window !== 'undefined') {
          signupMessage = JSON.parse(localStorage.getItem('signupMessage'));
        }

        console.log(signupMessage);

        if (signupMessage.status === true) {
          toast.success(signupMessage.success_message);
          router.push('/FoodMarket');
          localStorage.removeItem('signupMessage');
        } else {
          toast.error(signupMessage.error_message);
        }
      })
  };

  console.log(signup_api_message);

  // if (loading) {
  //   return <Spinner />;
  // }

  console.log(q);
  useEffect(() => {
    dispatch(getExistingMails());

    emails?.filter((email) => {
      if (email.toLowerCase().includes(query.toLowerCase())) {
        setQ(true);
      } else {
        setQ(false);
      }
    });
  }, [dispatch, emails, query]);
  return (
    <>
      <Box
        className="login__wrapper"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: { lg: '30px 50px  0 130px', xs: '24px' },
          width: '100%',
        }}
      >
        <Box
          className="form__wrapper"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            // width: '100%',
            marginLeft: { md: '80px', xs: '0px' },
          }}
        >
          <Link href="/">
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                cursor: 'pointer',
              }}
            >
              {logo}
            </Box>
          </Link>

          <Typography
            variant="h4"
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
            SIGN UP
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
              marginBottom: '32px',
            }}
          >
            Please complete the form to register to be an Afiari customer
          </Typography>

          <Input
            type="text"
            label="First name"
            htmlFor="First name"
            placeholder="Anozie"
            onChange={(e) => {
              dispatch(handleUserInput('firstName', e.target.value));
            }}
            name="firstName"
            id="firstname"
            value={firstName}
          />

          <Input
            type="text"
            label="Last name"
            htmlFor="last name"
            placeholder="Peter"
            onChange={(e) => {
              dispatch(handleUserInput('lastName', e.target.value));
            }}
            name="lastName"
            id="lastname"
            value={lastName}
          />

          <Input
            type="text"
            label="Email"
            htmlFor="email"
            placeholder="somebody@mail.com"
            name="email"
            id="email"
            onChange={(e) => {
              dispatch(handleUserInput('email', e.target.value));
              setQuery(e.target.value);
            }}
            value={email}
          />

          {q && (
            <h5
              style={{
                color: 'red',
              }}
            >
              email already exist
            </h5>
          )}

          <Input
            type={showpassword === false ? 'password' : 'text'}
            label="Password"
            htmlFor="password"
            placeholder="************"
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
              width: { lg: '360px', xs: '100%', md: '360px' },
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: ' 19px',
              color: ' #000000',
            }}
          >
            <input
              type="checkbox"
              name=""
              id=""
              onClick={() => {
                if (checked === false) {
                  setChecked(true);
                  setBtnDisabled(false);
                } else {
                  setChecked(false);
                  setBtnDisabled(true);
                }
              }}
            />
            I agree to the{' '}
            <span
              style={{
                marginRight: '0.2rem',
                marginLeft: '0.2rem',
                color: ' #0A503D',
              }}
            >
              <Link href="/terms_and_condition"> Terms of Service </Link>
            </span>
            and
            <span
              style={{
                marginRight: '0.2rem',
                marginLeft: '0.2rem',
                color: ' #0A503D',
              }}
            >
              <Link href="/privacy_policy">Privacy Policy </Link>
            </span>
            of Afiari
          </Typography>
          <Button
            text="SIGN UP"
            color="#fff"
            backgroundColor={
              btnDisabled === false ? '#0A503D' : 'rgba(119, 157, 138, 0.919)'
            }
            onClick={handleSubmit}
            disabled={btnDisabled}
            isLoading={loading}
            type="submit"
          />

          <LoginBtnComponent
            text="SIGN UP WITH GOOGLE"
            text2="SIGN UP WITH FACEBOOK"
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
            Already have an account?{' '}
            <Box
              component="span"
              sx={{
                color: ' #0A503D',
              }}
            >
              <Link href="/login">Login</Link>
            </Box>
          </Typography>
        </Box>
        <Box
          xs={Hidden}
          sx={{
            marginTop: '110px',
            display: { xs: 'none', lg: 'flex' },
            width: '400px',
            // marginLeft: '20px',
          }}
        >
          {SignUpIllu}
        </Box>
      </Box>
    </>
  );
};

export default SignUp;
