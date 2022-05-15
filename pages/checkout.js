import { Box, Divider, IconButton, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import Footer from '../src/page-components/Footer';
import Navbar from '../src/shared-components/navbar/Navbar';
import styles from '../styles/Shop.module.css';
import Image from 'next/image';
import CheckOutPopUp from '../src/page-components/checkout/CheckOutPopUp';
import CheckOutPaymentMethod from '../src/page-components/checkout/CheckOutPaymentMethod';
import CheckoutCart from '../src/page-components/checkout/CheckoutCart';
import { useState } from 'react';
import CheckOutOldPayment from '../src/page-components/checkout/CheckOutOldPaymentPopUp';
import { AddAndRemoveCartButton } from '../src/shared-components/Button';
import { Delete } from '@mui/icons-material';
import { handleDelete } from '../src/redux/cart/cartAction';
import { useCart } from 'react-use-cart';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import withAuth from '../constants/ProtectedRoutes';
import {
  getOrderNumber,
  publicKey,
} from '../src/redux/checkout/checkoutAction';

function Checkout() {
  const [showModal, setShowModal] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const { cart } = useSelector((state) => state.cart);

  const {
    isEmpty,
    totalUniqueItems,
    items,
    addItem,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
    emptyCart,
  } = useCart();
  const { api_error, country, email, password, loading, isLogged_in } =
    useSelector((state) => state?.auth);

  const dispatch = useDispatch();

  const onClick = () => {
    setShowModal(false);
  };

  const handleModal = () => {
    setShowModal(true);
  };

  const handlePayment = () => {
    setShowPaymentForm(false);
  };

  const handleCheckOut = () => {
    setShowPaymentForm(true);
  };

  useEffect(() => {
    dispatch(publicKey());
    dispatch(getOrderNumber(country));
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      {/* ////////////////////// pop up /////////////////////////////////////////////// */}
      {showModal && (
        <>
          <Box
            sx={{
              position: 'absolute',
              display: 'flex',
              height: '100%',
              width: '100%',
              background: 'rgba(0, 0, 0, 0.53)',
              zIndex: '10000000000000',
              top: 0,
            }}
            onClick={onClick}
          ></Box>
          <CheckOutPopUp onClick={onClick} />
        </>
      )}

      {/* ////////////////////// end pop up /////////////////////////////////////////////// */}

      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '0px 21px',
        }}
      >
        {/*/////////////////////////// up //////////////////////////////////////*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '50px 0px',
          }}
        >
          <Divider
            textAlign="center"
            sx={{
              border: '1px solid #E6E6E',
              width: { xs: '100%', md: '50%' },
            }}
          >
            <Typography
              variant="h5"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                alignItems: 'center',
                color: '#000',
                fontSize: { xs: '20px', md: '39px' },
                fontWeight: '600',
                textAlign: 'center',
              }}
            >
              CHECK OUT
            </Typography>
          </Divider>

          <Typography
            variant="p"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '25px',
              lineHeight: '34px',
              textAlign: 'center',
              letterSpacing: ' 0.04em',

              color: ' #3A3A3A',
            }}
          >
            One last look in your cart
          </Typography>
        </Box>
        {/* <Box
          sx={{
            padding: { md: '0px 58px' },
            display: { xs: 'flex', md: 'none' },
            flexDirection: 'column',
            alignItems: { xs: 'center', lg: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            height: { xs: '450px', md: '400px' },
            overflowX: 'hidden',
            paddingTop: '2rem',
          }}
        >
          {cart?.cart?.[0]?.cart_items?.map((item, i) => (
            <Box
              key={item?.id}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: { sm: '472px', xs: '100%' },
                height: '136px',
                background: '#FFFFFF',
                border: '0.45702px solid rgba(0, 0, 0, 0.6)',
                borderBottomRightRadius: ' 11.4255px',
                borderTopLeftRadius: ' 11.4255px',
                padding: '1rem',
                marginTop: '21px',
              }}
            >
              <Image
                src={item?.product_image}
                alt="product"
                width={79}
                height={79}
                className={styles.cart_img}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  width: { xs: '90px', md: '153px' },
                  height: '73px',
                }}
              >
                <Typography className={styles.cart_details} variant="p">
                  {item?.product_name}
                </Typography>
                <Typography
                  className={styles.cart_details}
                  variant="p"
                ></Typography>
                <Typography className={styles.cart_details} variant="p">
                  {`${cart?.cart?.[0]?.currency} ` + item.unit_price}
                </Typography>
              </Box>

              <IconButton
                onClick={() => {
                  removeItem(item?.id);
                  const data = {
                    id: item.id,
                    country: country,
                  };
                  dispatch(handleDelete(data));
                }}
              >
                <Delete />
              </IconButton>

              <AddAndRemoveCartButton
                width="70px"
                height="35px"
                borderRadius="22px"
                fontSize="12px"
                backgroundColor="#fff"
                border=" 0.458333px solid #3A3A3A"
                text={item?.quantity}
                item={item}
                isLogged_in={isLogged_in}
                country={country}
                cartId={item.id}
                quantity={item.quantity}
                prodId={item.product_id}
                dispatch={dispatch}
              />
            </Box>
          ))}
        </Box> */}

        <Divider
          sx={{
            display: { xs: 'flex', md: 'none' },
            border: '1px solid rgba(0, 0, 0, 0.2)',
            marginBottom: '3rem',
          }}
        />

        {/*/////////////////////////// end up //////////////////////////////////////*/}

        {/*/////////////////////////// down //////////////////////////////////////*/}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { lg: 'row', xs: 'column' },
          }}
        >
          {/*////////////////////////////// left ////////////////////////////////////////////////*/}

          <CheckOutPaymentMethod handleModal={handleModal} />

          {/*////////////////////////////// left ////////////////////////////////////////////////*/}

          <Divider
            sx={{
              display: { xs: 'none', md: 'flex' },
              border: '1px solid rgba(0, 0, 0, 0.2)',
            }}
          />

          {/*/////////////////////////////////// right    ////////////////////////////// */}

          <CheckoutCart handleCheckOut={handleCheckOut} />

          {/*/////////////////////////////////// right    ////////////////////////////// */}
        </Box>
        {/*/////////////////////////// down end //////////////////////////////////////*/}
      </Box>
      <Footer />
    </Box>
  );
}

export default Checkout;
