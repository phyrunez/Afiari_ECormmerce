import React from 'react';
import { Button, Box, IconButton, CircularProgress } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from 'react-use-cart';
import { handleUpdate } from '../redux/cart/cartAction';
import { useDispatch } from 'react-redux';

export const ButtonSmall = ({
  text,
  color,
  borderRadius,
  width,
  height,
  fontSize,
  backgroundColor,
  fontWeight,
  lineHeight,
  border,
  onClick,
  href,
  isLoading = false,
  className,
  disabled,
}) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        width: { width },
        height: { height },
        borderRadius: { borderRadius },
        color: { color },
        fontSize: { fontSize },
        backgroundColor: { backgroundColor },
        fontWeight: { fontWeight },
        lineHeight: { lineHeight },
        border: { border },
        '&:hover': {
          backgroundColor: '#0A503D',
          color: '#fff',
          border: '1px solid #0A503D',
        },
      }}
      href={href}
      className={className}
      disabled={disabled}
    >
      {/* {href ? (
        <Link href={href}>{text}</Link>
      ) : isLoading ? (
        <CircularProgress />
      ) : (
        text
      )} */}

      {isLoading ? (
        <CircularProgress
          sx={{
            color: '#fff',
          }}
          size={20}
        />
      ) : (
        `${text}`
      )}
    </Button>
  );
};

export const ButtonBig = ({
  text,
  color,
  border,
  backgroundColor,
  onClick,
  disabled,
  isLoading = false,
  type,
  href,
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      type={type}
      sx={{
        width: { lg: ' 360px', sm: '360px', xs: '100%', md: '360px' },
        height: '57.55px',
        borderRadius: '44.1089px',
        color: { color },
        fontSize: { xs: '12px', lg: '15px' },
        backgroundColor: { backgroundColor },
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        border: { border },
        marginTop: '24.81px',
        padding: '0 55px',
        '&:hover': {
          backgroundColor: '#0a3d30',
        },
      }}
      href={href}
    >
      {isLoading ? (
        <CircularProgress
          sx={{
            color: '#fff',
          }}
          size={20}
        />
      ) : (
        `${text}`
      )}
    </Button>
  );
};
export const LoginWithButton = ({
  text,
  color,
  border,
  backgroundColor,
  src,
}) => {
  return (
    <Button
      sx={{
        width: { lg: ' 360px', sm: '360px', xs: '100%', md: '360px' },
        height: '57.55px',
        borderRadius: '44.1089px',
        color: { color },
        fontWeight: '600',
        fontSize: { xs: '12px', lg: '15px' },
        backgroundColor: { backgroundColor },
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        border: '1px solid #0A503D',
        marginTop: '24.81px',
        padding: '0 55px',
      }}
    >
      {src && <Image src={src} width={20} height={20} />}
      <Box
        sx={{
          marginLeft: '16px',
        }}
      >
        {text}
      </Box>
    </Button>
  );
};

export const AddAndRemoveCartButton = ({
  text,
  color,
  borderRadius,
  width,
  height,
  fontSize,
  backgroundColor,
  fontWeight,
  lineHeight,
  border,
  marginLeft,
  marginRight,
  item,
  isLogged_in,
  country,
  cartId,
  quantity,
  prodId,
  dispatch,
}) => {
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

  return (
    <Button
      sx={{
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: { width },
        height: { height },
        borderRadius: { borderRadius },
        color: { color },
        fontSize: { fontSize },
        backgroundColor: { backgroundColor },
        fontWeight: { fontWeight },
        lineHeight: { lineHeight },
        border: { border },
        marginRight: { marginRight },
        marginLeft: { marginLeft },
      }}
    >
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '15px',
          height: '15px',
          color: '#F72A42',
          border: '0.916667px solid #F72A42',
          borderRadius: '100%',
        }}
        onClick={() => {
          const data = {
            country: country,
            id: cartId,
            quantity: quantity > 1 && quantity - 1,
            product_id: prodId,
          };
          if (isLogged_in) {
            dispatch(handleUpdate(data));
          } else {
            updateItemQuantity(item.id, item.quantity - 1);
          }
        }}
      >
        -
      </span>
      {text}
      <span
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '15px',
          height: '15px',
          color: '#0A503D',
          border: '0.916667px solid #0A503D',
          borderRadius: '100%',
        }}
        onClick={() => {
          const data = {
            country: country,
            id: cartId,
            quantity: quantity + 1,
            product_id: prodId,
          };
          isLogged_in
            ? dispatch(handleUpdate(data))
            : updateItemQuantity(item.id, item.quantity + 1);
        }}
      >
        +
      </span>
    </Button>
  );
};
