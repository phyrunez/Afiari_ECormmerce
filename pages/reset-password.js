import { Box } from '@mui/system';
import React, { useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AuthenticationPages from '../components/AuthenticationPages';
import Spinner from '../components/Spinner';
import { handleUserInput, resetPassword } from '../src/redux/auth/authAction';
import { ButtonBig as Button } from '../src/shared-components/Button';
import { Input } from '../src/shared-components/InputComponent';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import BackButton from '../src/shared-components/BackButton';

const ResetPassword = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const {
    reset_password,
    country,
    token,
    email,
    password,
    loading,
    repeat_password,
  } = useSelector((state) => state.auth);

  const onSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      toast.error('Fields can not be empty');
    } else if (password !== repeat_password) {
      toast.error('Password does not match');
    } else {
      const userData = {
        username: email,
        token: token,
        newPassword: password,
        confirmNewPassword: repeat_password,
      };

      dispatch(resetPassword(userData));

      toast.success('Your password has been reset successfully.');
      router.push('/password-reset-success');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem',
      }}
    >
      <BackButton />
      <AuthenticationPages
        heading="RESET PASSWORD"
        subHeading="Set a new password for your profile on Afiari"
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
      <Input
        type="password"
        label="password"
        htmlFor="password"
        placeholder="************"
        onChange={(e) => {
          dispatch(handleUserInput('password', e.target.value));
        }}
        name="password"
        id="password"
        value={password}
      />
      <Input
        type="password"
        label="password"
        htmlFor="repeat_password"
        placeholder="************"
        onChange={(e) => {
          dispatch(handleUserInput('repeat_password', e.target.value));
        }}
        name="repeat_password"
        id="repeat_password"
        value={repeat_password}
      />
      <Input
        type="text"
        label="token"
        htmlFor="token"
        placeholder="************"
        onChange={(e) => {
          dispatch(handleUserInput('token', e.target.value));
        }}
        name="token"
        id="token"
        value={token}
      />

      <Button
        text="RESET PASSWORD"
        color="#fff"
        backgroundColor="#0A503D"
        onClick={onSubmit}
        isLoading={loading}
      />
    </Box>
  );
};

export default ResetPassword;
