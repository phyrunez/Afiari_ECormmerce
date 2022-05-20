import { Box, Typography, Divider, IconButton, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Footer from '../src/page-components/Footer';
import Navbar from '../src/shared-components/navbar/Navbar';
import Image from 'next/image';
import cart_illustration from '../public/cart_illustration.svg';
import {
  AddAndRemoveCartButton,
  ButtonSmall,
} from '../src/shared-components/Button';
import styles from '../styles/Shop.module.css';
import { Delete } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import {
  addCart,
  addMultipleCart,
  getCart,
  handleDelete,
  handleUpdate,
  setIsLoading,
} from '../src/redux/cart/cartAction';
import {
  getOrderNumber,
  publicKey,
} from '../src/redux/checkout/checkoutAction';
import { useCart } from 'react-use-cart';
import { formatCurrency } from '../src/utils/utils';
import Spinner from '../components/Spinner';
import DeleteNotification from '../src/page-components/shop/DeleteNotification';

function Cart() {
  const { isLogged_in, country, public_key, loading } = useSelector(
    (state) => state.auth
  );

  const [show, setShow] = useState(false);
  const [itemID, setItemID] = useState('');

  const [showLogin, setShowLogin] = useState(false);

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

  // const [disableCheckoutBtn, setDisableCheckoutBtn] = useState(true);

  const dispatch = useDispatch();

  const cartItems = isLogged_in ? cart?.cart?.[0]?.cart_items : items;

  const disableCheckoutBtn =
    !cartItems || cartItems?.length === 0 ? true : false;

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const router = useRouter();

  const currency = cartItems?.map((item) => item?.currency);

  // const [cartItems, setCartItems] = useState([]);

  // const handleDelete = () => {
  //   dispatch({
  //     type: CartTypes.DELETE_CART,
  //     payload: cart?.cart?.[0]?.cart_items?.filter(
  //       (item) => item.id !== action.payload.id
  //     ),
  //   });
  // };

  const handleModal = (id) => {
    dispatch(handleDelete(id));
    setShow(false);
  };

  const handleCancel = (id) => {
    setShow(false);
  };

  const onClick = () => {
    if (isLogged_in) {
      router.push('/checkout');
    } else {
      toast.error('You need to be logged in');
      router.push('/login');
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        // border: '1px solid red',
      }}
    >
      <Navbar />

      {show && (
        <DeleteNotification
          id={itemID}
          handleCancel={handleCancel}
          handleModal={handleModal}
        />
      )}

      {/* {show && (
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
          
          >
            <Box>
              <Typography variant='p'>
                Are you sure want to delete this Product?
              </Typography>

              <ButtonSmall 
              text='Cancel'
              />
              <ButtonSmall 
              text='Ok'
              />
            </Box>
          </Box>
          
        </>
      )} */}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: { md: '3rem 3rem' },
          // border: '1px solid red',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: { xs: '1rem', md: '53px 83px' },
            height: 'auto',
            // overflowX: 'hidden',
            // width: '30%',
            marginBottom: '2rem',
            // border: "1px solid red",
          }}
        >
          <Divider
            textAlign="center"
            sx={{
              border: '1px solid #E6E6E',
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
                color: '#000000',
                fontSize: '29px',
                fontWeight: '600',
                textAlign: 'center',
                // marginTop: '2rem',
              }}
            >
              Your Cart
            </Typography>
          </Divider>
          {!cartItems || cartItems?.length === 0 ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: { md: '472px', xs: '100%' },
                height: '136px',
                background: '#FFFFFF',

                padding: '1rem',
                marginTop: '21px',
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontSize: '14px',
                }}
              >
                Cart is empty
              </Typography>
            </Box>
          ) : (
            <Box
              className={styles.cart__warraper}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: { xs: '3rem', md: '53px 83px' },
                height: '300px',
                overflowX: 'hidden',

                // width: '30%',
                marginBottom: '2rem',
                marginTop: '3rem',
                // border: "1px solid red",
              }}
            >
              {cartItems?.map((item, i) => (
                <Box
                  key={item.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    alignItems: 'center',
                    width: { md: '472px', xs: '100%' },
                    height: '136px',
                    background: '#FFFFFF',
                    border: '0.45702px solid rgba(0, 0, 0, 0.6)',
                    borderBottomRightRadius: ' 11.4255px',
                    borderTopLeftRadius: ' 11.4255px',
                    padding: '1rem',
                    marginTop: '21px',
                  }}
                >
                  {!isLogged_in ? (
                    <Image
                      src={item?.images?.[0]?.image_url}
                      alt="product"
                      width={79}
                      height={79}
                      className={styles.cart_img}
                    />
                  ) : (
                    <Image
                      src={item?.product_image}
                      alt="product"
                      width={79}
                      height={79}
                      className={styles.cart_img}
                    />
                  )}
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
                      {isLogged_in ? item.product_name : item?.name}
                    </Typography>
                    <Typography
                      className={styles.cart_details}
                      variant="p"
                    ></Typography>
                    <Typography className={styles.cart_details} variant="p">
                      {/* {isLogged_in ? cart?.cart?.[0]?.currency : 'NGN'}{' '}
                  {item?.charged_unit_price} */}
                      {isLogged_in
                        ? `${cart?.cart?.[0]?.currency}  ` +
                          `${item?.charged_cost}`
                        : `${item?.currency}`}
                      {!isLogged_in && formatCurrency(item?.price)}
                    </Typography>
                  </Box>

                  <Box>
                    <IconButton
                      onClick={() => {
                        const data = {
                          id: item.id,
                          country: country,
                        };

                        setItemID(isLogged_in ? data : item?.id);
                        setShow(true);

                        // isLogged_in
                        //   ? dispatch(handleDelete(data))
                        //   : removeItem(item?.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Box>
                  {/* 
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  alignItems: 'center',
                  width: '70px',
                  height: '35px',
                  borderRadius: '22px',

                  backgroundColor: '#fff',
                  border: ' 0.458333px solid #3A3A3A',
                }}
              >
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '10px',
                    height: '10px',
                    color: '#F72A42',
                    border: '0.916667px solid #F72A42',
                    borderRadius: '100%',
                  }}
                  onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                >
                  -
                </Button>
                <Typography variant="p">{item.quantity}</Typography>
                <Button
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '8px',
                    height: '8px',
                    color: '#0A503D',
                    border: '0.916667px solid #0A503D',
                    borderRadius: '100%',
                  }}
                  onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                >
                  +
                </Button>
              </Box> */}

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
            </Box>
          )}
          <Divider
            sx={{
              border: '1px solid #E6E6E',
              marginTop: '36px',
            }}
          ></Divider>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              marginTop: '27px',
            }}
          >
            <Button
              variant="h4"
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '267px',
                height: '40px',
                background: '#0A503D',
                borderRadius: '0px 0px 31.3421px 31.3421px',
                fontWeight: '600',
                fontSize: ' 14.2819px',
                lineHeight: ' 19px',
                textAlign: 'center',
                letterSpacing: ' 0.04em',

                color: ' #FFFFFF',
                '&:hover': {
                  backgroundColor: '#0a3d30',
                },
              }}
              disabled={disableCheckoutBtn}
              onClick={onClick}
            >
              {isLogged_in
                ? `CHECK OUT: ${
                    !cart?.cart?.[0]?.charged_total_cost
                      ? '0'
                      : `${cart?.cart?.[0]?.currency}  ` +
                        `  ${cart?.cart?.[0]?.charged_total_cost}`
                  }`
                : `CHECK OUT: ${
                    cartItems?.length === 0
                      ? 0
                      : `${currency?.[0]} ` + formatCurrency(cartTotal)
                  }`}
              {/* CHECK OUT : {isLogged_in ? item.currency : 'NGN'}
              {isLogged_in ? cart?.cart?.[0]?.total_cost : ''} */}
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: { lg: 'flex', xs: 'none' },
          }}
        >
          <Image
            src={cart_illustration}
            alt="cart illustration"
            width={619}
            height={517}
          />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Cart;
