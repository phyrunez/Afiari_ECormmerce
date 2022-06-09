import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import AuthenticationPages from '../components/AuthenticationPages';
import {
  forgetPassword,
  handleUserInput,
} from '../src/redux/auth/authAction';
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
  );
};

export default ForgetPassword;
