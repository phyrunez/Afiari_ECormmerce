import {
  Divider,
  Box,
  Chip,
  Typography,
  Button,
  CircularProgress,
  IconButton,
} from '@mui/material';
import Image from 'next/image';
import data from '../../../public/data.svg';
import { AddAndRemoveCartButton } from '../../shared-components/Button';
import styles from '../../../styles/Shop.module.css';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { formatCurrency } from '../../utils/utils';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Delete } from '@mui/icons-material';
import { handleDelete } from '../../redux/cart/cartAction';

const CartComponent = () => {
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
  const router = useRouter();
  const { isLogged_in, country } = useSelector((state) => state?.auth);

  const { cart } = useSelector((state) => state.cart);

  const cartItems = isLogged_in ? cart?.cart?.[0]?.cart_items : items;

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: { lg: 'flex', xs: 'none' },
        flexDirection: 'column',
        // padding: '53px 83px',
        height: 'auto',
        width: '30%',
        marginBottom: '2rem',
        border: '1px solid red',
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
            color: '#000',
            fontSize: '14px',
            fontWeight: '400',
            textAlign: 'center',
            marginTop: '1rem',
          }}
        >
          Your Cart
        </Typography>
      </Divider>
      {!cartItems || cartItems.length === 0 ? (
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
          <h1>Cart is empty</h1>
        </Box>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: { xs: '1rem', md: '53px 83px' },
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
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '298px',
                height: '99px',
                background: '#FFFFFF',
                border: '0.45702px solid rgba(0, 0, 0, 0.6)',
                borderBottomRightRadius: ' 11.4255px',
                borderTopLeftRadius: ' 11.4255px',

                marginTop: '21px',
              }}
            >
              {!isLogged_in ? (
                <Image
                  src={item?.images[0]?.image_url}
                  alt="product"
                  width={59}
                  height={59}
                  style={{
                    borderRadius: '100% !important',
                  }}
                />
              ) : (
                <Image
                  src={item?.product_image}
                  alt="product"
                  width={59}
                  height={59}
                  style={{
                    borderRadius: '100% !important',
                  }}
                />
              )}

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                }}
              >
                <Typography className={styles.cart_details} variant="p">
                  {/* Red Pepper(Shombo) */}
                  {isLogged_in ? item.product_name : item?.name}
                </Typography>
                <Typography className={styles.cart_details} variant="p">
                  {isLogged_in
                    ? `${cart?.cart?.[0]?.currency} ` + item.unit_price
                    : item?.currency}
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
                    isLogged_in
                      ? dispatch(handleDelete(data))
                      : removeItem(item?.id);
                  }}
                >
                  <Delete />
                </IconButton>
              </Box>
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
            width: '215px',
            height: '29px',
            background: '#0A503D',
            borderRadius: '0px 0px 22.851px 22.851px',
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
          onClick={() => {
            setLoading(true);
            if (isLogged_in) {
              router.push('/checkout');
            } else {
              console.log('open auth modal');
            }
          }}
        >
          {loading ? (
            <CircularProgress
              sx={{
                color: '#fff',
              }}
              size={20}
            />
          ) : isLogged_in ? (
            `CHECK OUT: ${
              !cart?.cart?.[0]?.charged_total_cost
                ? '0'
                : `${cart?.cart?.[0]?.currency}  ` +
                  `  ${cart?.cart?.[0]?.charged_total_cost}`
            }`
          ) : (
            `CHECK OUT: ${
              cartItems?.length === 0
                ? 0
                : `${currency[0]} ` + formatCurrency(cartTotal)
            }`
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CartComponent;
