import { Delete } from '@mui/icons-material';
import { Button, Divider, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import {
  AddAndRemoveCartButton,
  ButtonSmall,
} from '../../shared-components/Button';
import Image from 'next/image';
import styles from '../../../styles/Shop.module.css';

import { useDispatch, useSelector } from 'react-redux';
import { useCart } from 'react-use-cart';
import {
  getOrderNumber,
  initializePayment,
  placeOrder,
  processPayment,
  verifyPayment,
} from '../../redux/checkout/checkoutAction';
import { formatCurrency } from '../../utils/utils';
import {
  addMultipleCart,
  getCart,
  handleDelete,
} from '../../redux/cart/cartAction';
import { usePaystackPayment } from 'react-paystack';
import { toast } from 'react-toastify';

function CheckoutCart({ handleCheckOut }) {
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

  const {
    init_payment,
    order_number,
    public_key,
    verify_payment,
    payment_meter,
    selectedPhod,
    selectedPayment,
    selectedAddress,
    place_order,
    init_result,
  } = useSelector((state) => state.checkout);

  const { api_error, country, email, password, loading, isLogged_in } =
    useSelector((state) => state?.auth);

  const dispatch = useDispatch();
  const orderNumber = order_number?.[0]?.order_number;

  const totalAmount = order_number?.[0]?.total_cost;

  const finalAmount = +totalAmount?.replace(/,/g, '') * 100;

  const config = {
    reference: init_payment?.[0]?.reference,
    email: email,
    amount: finalAmount,
    publicKey: public_key,
  };

  // you can call this function anything
  const onSuccess = (reference) => {
    console.log(reference);
    // const ref = init_payment?.[0]?.reference;
    // const masterID = order_number?.[0]?.order_master_id;

    // const verify = verify_payment;

    // dispatch(verifyPayment(ref));

    // if (verify === true) {
    //   const data = {
    //     paymentType: selectedPayment,
    //     shippingAddress: selectedAddress.id,
    //     masterRecordId: masterID,
    //   };

    //   dispatch(placeOrder(data));
    //   toast.success(place_order);
    //   console.log(data);
    // }
  };

  const onClose = () => {
    toast.error('Order Cancel');
  };
  const initializePayments = usePaystackPayment(config);

  const handleOrder = async () => {
    const ref = init_payment?.[0]?.reference;
    const masterID = order_number?.[0]?.order_master_id;

    const verify = verify_payment;

    const data = {
      paymentType: selectedPayment,
      shippingAddress: selectedAddress.id,
      masterRecordId: masterID,
    };
    initializePayments(onSuccess, onClose);
    // dispatch(initializePayment(orderNumber, verify, masterID, ref, data));
  };

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  console.log(orderNumber);
  console.log(public_key);
  console.log(selectedAddress.id);
  console.log(init_payment);

  return (
    <>
      <Box
        sx={{
          marginBottom: '15rem',
        }}
      >
        <Box
          sx={{
            padding: { md: '0px 58px' },
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'column',
            alignItems: { xs: 'center', lg: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            height: { xs: '450px', md: '400px' },
            overflowX: 'hidden',
            paddingTop: '3rem',
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
        </Box>

        <Divider
          sx={{
            display: { xs: 'none', md: 'flex' },
            border: '1px solid rgba(0, 0, 0, 0.2)',
            marginTop: '46px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginTop: '74px',
            padding: '0px 58px',
          }}
        >
          <Typography
            variant="p"
            sx={{
              marginBottom: '11px',
            }}
          >
            Use a Coupon for payment
          </Typography>
          <Typography variant="p">Enter coupon number</Typography>

          <input type="text" className={styles.checkout_input} />

          <ButtonSmall
            text="ADD COUPON"
            color="#fff"
            width="166px"
            height="48px"
            backgroundColor=" #0A503D"
            border="1.14483px solid rgba(0, 0, 0, 0.3)"
            borderRadius="57.2414px"
          />
        </Box>

        <Divider
          sx={{
            // display: { xs: 'none', md: 'flex' },
            border: '1px solid rgba(0, 0, 0, 0.2)',
            marginTop: '46px',
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginTop: '27px',
            cursor: 'pointer',
          }}
          onClick={handleOrder}
        >
          <Button
            variant="h4"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: { xs: '263', md: '515px' },
              height: { xs: '40px', md: '79px' },
              background: '#0A503D',
              borderRadius: {
                xs: '0px 0px 31.5402px 31.5402px',
                md: '0px 0px 61.8375px 61.8375px',
              },
              fontWeight: '600',
              fontSize: { xs: '12px', md: ' 25px' },
              lineHeight: ' 19px',
              textAlign: 'center',
              letterSpacing: ' 0.04em',
              cursor: 'pointer',
              color: ' #FFFFFF',
              '&:hover': {
                backgroundColor: '#0a3d30',
              },
            }}
            onClick={handleOrder}
          >
            PLACE ORDER:
            {`${cart?.cart?.[0]?.currency} ` +
              cart?.cart?.[0]?.charged_total_cost}
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CheckoutCart;
