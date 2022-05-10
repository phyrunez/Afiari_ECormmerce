import { useState } from 'react';

import { Typography, Box } from '@mui/material';

import { Input, LoginBtnComponent } from '../shared-components/InputComponent';
import { ButtonBig as Button } from '../shared-components/Button';
import Link from 'next/link';

import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { logInUser, handleUserInput } from '../../src/redux/auth/authAction';
import { addMultipleCart } from '../redux/cart/cartAction';
import { useCart } from 'react-use-cart';
import { getOrderNumber } from '../redux/checkout/checkoutAction';

const LoginPopUp = () => {
  const { api_error, country, email, password, loading, isLoggged_in } =
    useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const path = '/checkout';
  const router = useRouter();
  const [showpassword, setShowpassword] = useState(false);
  const { emptyCart } = useCart();

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('message');
    } else {
      const items = JSON.parse(localStorage.getItem('react-use-cart'));
      const cart = items.items.map((item) => ({
        id: item.id,
        quantity: item.quantity,
      }));

      console.log(items);

      console.log(cart.id, cart.quantity);

      const data = {
        country: country,
        id: cart.id,
        quantity: cart.quantity,
      };

      console.log(data.id, data.quantity);

      const userData = {
        username: email,
        password: password,
      };
      dispatch(logInUser(userData, router, path));
      if (isLoggged_in) {
        dispatch(getOrderNumber(country));
        dispatch(addMultipleCart(data.country, cart));
      }
      //   emptyCart();

      console.log(userData);
    }
  };
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',

        alignItems: 'center',
        position: 'absolute',
        top: '3rem',
        width: { xs: '100%', sm: ' 70%', md: '50%' },
        height: 'auto',
        background: '#fff',
        zIndex: '10000000000',
        padding: '2rem',
      }}
    >
      <Typography
        variant="h4"
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
        {' '}
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
        variant="p"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          color: ' #0A503D',
          cursor: 'pointer',
        }}
      >
        <Link href="/forget-password"> Forgot Password?</Link>
      </Typography>

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
      )}

      <Button
        text="LOGIN"
        color="#fff"
        backgroundColor="#0A503D"
        onClick={(e) => onSubmit(e)}
        isLoading={loading}
      />

      <LoginBtnComponent text="LOGIN WITH GOOGLE" text2="LOGIN WITH FACEBOOK" />

      <Typography
        variant="p"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Don’t have an account?
        <Link href="/sign-up">
          <p
            style={{
              marginLeft: '.5rem',
              color: '#0A503D',
            }}
          >
            {' '}
            Sign up
          </p>
        </Link>
      </Typography>
    </Box>
  );
};

export default LoginPopUp;
