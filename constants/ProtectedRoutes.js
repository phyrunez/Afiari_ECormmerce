import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { appRoutes } from './appRoutes';
import { authToken } from './config';

const ProtectedRoutes = ({ router, children }) => {
  const { isLogged_in } = useSelector((state) => state?.auth);

  const unProtectedRoutes = [
    appRoutes.HOME,
    appRoutes.LOGIN,
    appRoutes.FORGOT,
    appRoutes.REGISTER,
    appRoutes.RESET,
    appRoutes.FOODMARKET,
    appRoutes.PRODUCT,
    appRoutes.CART,
    appRoutes.PRIVACYPOLICY,
    appRoutes.TERMSANDCONDITION,
    appRoutes.PAYSTACK,
    appRoutes.FORGET_PASSWORD,
  ];

  const pathIsProtected = unProtectedRoutes.indexOf(router.pathname) === -1;
  useEffect(() => {
     if (!localStorage.getItem(authToken) && pathIsProtected ) {
        router.push({
        pathname: appRoutes.LOGIN,
        query: {
          from: router.pathname,
        },
      });
     }
  }, [router]);

  return children;
};

export default ProtectedRoutes;

// const withAuth = (Component) => {
//   const Auth = (props) => {
//     // Login data added to props via redux-store (or use react context for example)
//     const { isLogged_in } = useSelector((state) => state?.auth);

//     // If user is not logged in, return login component
//     if (!isLogged_in) {
//       // Router.push(appRoutes.LOGIN);
//       return <Login />;
//     }

//     // If user is logged in, return original component
//     return <Component {...props} />;
//   };

//   // Copy getInitial props so it will run as well
//   if (Component.getInitialProps) {
//     Auth.getInitialProps = Component.getInitialProps;
//   }

//   return Auth;
// };

// export default withAuth;
