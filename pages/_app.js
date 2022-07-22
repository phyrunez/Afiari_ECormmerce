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
import Script from 'next/script'

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

      {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-YDBXXY5PPK" />

      <Script id="google-analytics" strategy="afterInteractive">
        {
          `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-YDBXXY5PPK');
          `
        }
      </Script>


      {/* <!-- Meta Pixel Code --> */}
      {/* <Script strategy="afterInteractive">
        !function(f,b,e,v,n,t,s)
        {
            if(f.fbq)return;n=f.fbq=function(){n.callMethod ?
              n.callMethod.apply(n, arguments) : n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
    }
    (window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '393131539190809');
            fbq('track', 'PageView');
      </Script>
      <noscript><img height="1" width="1" style="display:none"
        src="https://www.facebook.com/tr?id=393131539190809&ev=PageView&noscript=1"
      /></noscript> */}
      {/* <!-- End Meta Pixel Code --> */}

      <ToastContainer />
    </>
  );
}

export default MyApp;
