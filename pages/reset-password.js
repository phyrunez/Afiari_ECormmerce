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

const ResetPassword = ({ isLinkVerified, err_message }) => {
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
        <Button
          text="RESET PASSWORD"
          color="#fff"
          backgroundColor="#0A503D"
          onClick={onSubmit}
          isLoading={loading}
        />
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
    if (result.status === true) {
      return {
        props: { isLinkVerified: true, err_message: 'Invalid email' }
      }
    } else {
      return {
        props: { isLinkVerified: false, err_message: 'Invalid email' },
      };
    }
  } catch (err) {
    return {
      props: { isLinkVerified: false, err_message: 'Server Error! Reload page to continue.' },
    };
  }
}
export default ResetPassword;

