import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appRoutes } from './appRoutes';
import { useRouter } from 'next/router';
const isBrowser = () => typeof window !== 'undefined';

const ProtectedRoutes = ({ router, children }) => {
  const { isLogged_in } = useSelector((state) => state?.auth);

  const unProtectedRoutes = [
    appRoutes.HOME,
    appRoutes.LOGIN,
    appRoutes.FORGOT,
    appRoutes.REGISTER,
    appRoutes.RESET,
    appRoutes.SHOP,
    appRoutes.PRODUCT,
    appRoutes.CART,
  ];

  const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;

  useEffect(() => {
    if (!isLogged_in && pathIsProtected && isBrowser()) {
      router.push(appRoutes.LOGIN);
    }
  }, [isLogged_in, pathIsProtected, appRoutes, isBrowser]);

  return children;
};

export default ProtectedRoutes;
