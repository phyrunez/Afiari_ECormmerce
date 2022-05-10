import { useSelect } from '@mui/base';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { refreshToken } from '../redux/slice/auth/AuthSlice';

const AuthRefresh = () => {
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      if (user) {
        dispatch(refreshToken());
        console.log('i was called');
      }
    }, 2000);

    return () => clearInterval(interval);
  });

  return (
    <>
      <h1>good</h1>
    </>
  );
};

export default AuthRefresh;
