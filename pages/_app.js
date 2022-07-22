import '../styles/globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Head from 'next/head';
import configureStore from '../src/redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import AuthProvider from '../src/shared-components/AuthProvider';
import ProtectedRoutes from '../constants/ProtectedRoutes';
import { CartProvider } from 'react-use-cart';
import { useEffect } from 'react';
import { getAllCountries } from '../src/redux/general/generalAction';

const store = configureStore();
// const persistor = persistStore(store);

function MyApp({ Component, pageProps, router }) {
  return (
    <>
      <Head>
        <title>
          Afiari - Afiari is your best shop to buy food items anytime.
        </title>
        <meta
          name="Description"
          content="Access our Afiari food market and grocery stores close to you where you can buy foodstuff and groceries from the comfort of your home or office"
        />
        <meta
          name="Keywords"
          content="Foodstuff in Nigeria,
Foodstuff in Lagos,
Where can I buy foodstuff near me,
Foodstuff shop,
Foodstuff market in Lagos"
        />
        {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      {/* <script async src="https://www.googletagmanager.com/gtag/js?id=G-YDBXXY5PPK"></script>
      <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-YDBXXY5PPK');
      </script> */}
        {/* <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script> */}
        {/* <script src="../src/vendor/jquery.min.js"></script>
        <script src="../src/vendor/sweetalert.min.js"></script> */}
      </Head>

      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <CartProvider>
          <AuthProvider>
            <ProtectedRoutes router={router}>
              <Component {...pageProps} />
            </ProtectedRoutes>
          </AuthProvider>
        </CartProvider>
        {/* </PersistGate> */}
      </Provider>

      <ToastContainer />
    </>
  );
}

export default MyApp;
