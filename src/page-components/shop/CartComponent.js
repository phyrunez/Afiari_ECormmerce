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
import { toast } from 'react-toastify';

const CartComponent = ({ handleCancel, setId }) => {
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

  const currency = cartItems?.map((item) => item?.currency);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const disableCheckoutBtn =
    !cartItems || cartItems?.length === 0 ? true : false;

  return (
    <Box
      sx={{
        display: { lg: 'flex', xs: 'none' },
        flexDirection: 'column',
        // padding: '53px 83px',
        height: 'auto',
        width: '70%',
        marginBottom: '2rem',
        // border: '1px solid red',
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
          sx={{
            display: 'flex',
            flexDirection: 'column',
            padding: '1rem',
            height: '300px',
            overflowX: 'hidden',
            width: '100%',
            marginBottom: '2rem',
            marginTop: '1rem',
            // border: '1px solid red',
          }}
          className={styles.cart__warraper}
        >
          {cartItems?.map((item, i) => (
            <Box
              key={i}
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                width: '100%',
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
                  src={item?.images[0]?.image_url}
                  loader={() => item?.images[0]?.image_url}
                  alt="product"
                  width={59}
                  height={59}
                  className={styles.cart_img}
                />
              ) : (
                <Image
                  src={item?.product_image}
                  loader={() => item?.product_image}
                  alt="product"
                  width={59}
                  height={59}
                  className={styles.cart_img}
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
                    ? `${cart?.cart?.[0]?.currency} ` + item.charged_unit_price
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
                    handleCancel();
                    setId(isLogged_in ? data : item?.id);
                    // setItemID();

                    // isLogged_in
                    // ? dispatch(handleDelete(data))
                    // : removeItem(item?.id);
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
            width: '267px',
            height: '40px',
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
          disabled={disableCheckoutBtn}
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
                : `${currency?.[0]} ` + formatCurrency(cartTotal)
            }`
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default CartComponent;
