import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '../../src/page-components/Footer';
import Navbar from '../../src/shared-components/navbar/Navbar';
import item_description_illustration from '../../public/item_description_illustration.svg';
import styles from '../../styles/Shop.module.css';
import { useSelector, useDispatch } from 'react-redux';
// import { getSingleProduct } from '../../redux/slice/ProductSlice';
import { useRouter } from 'next/router';
import { ArrowBackIos, IonBu } from '@mui/icons-material';
import { getSingleProduct } from '../../src/redux/general/generalAction';
import test from '../../public/tes1.svg';
import {
  addCart,
  getCart,
  getPublicKey,
} from '../../src/redux/cart/cartAction';
// import { addCart } from '../../redux/slice/CartSlice';

import { useCart } from 'react-use-cart';
import { formatCurrency, getNumber } from '../../src/utils/utils';
import Spinner from '../../components/Spinner';

function ProductDetail() {
  const { singleProduct: product } = useSelector((state) => state.general);
  const { country, isLogged_in, loading } = useSelector((state) => state.auth);
  // const { cart } = useSelector((state) => state.cart);
  const { addItem, items } = useCart();

  const [review, setReview] = useState(false);
  const [description, setDescription] = useState(false);

  const router = useRouter();

  let id = router.query.productId;

  const dispatch = useDispatch();

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(getSingleProduct(id ? id : null, country));
    }, 1000);

    return () => clearTimeout(timeout);
  }, [dispatch, id, country]);

  const products = () => {
    const newData = product.map((prod, index) => {
      return {
        id: prod.id,
        star_rating: prod.star_rating,
        name: prod.name,
        description: prod.description,
        date_created: prod.date_created,
        sku: prod.sku,
        date_text: prod.date_text,
        price: getNumber(prod.afiari_price),
        currency: prod.currency,
        store_id: prod.store_id,
        store_name: prod.store_name,
        categories: prod.categories,
        images: prod.images,
        reviews: prod.reviews,
      };
    });
    return newData;
  };

  // const addToCart = () => {
  //   const data = {
  //     country: country,
  //     id: id,
  //     isLogged_in: isLogged_in,
  //     product: {
  //       id: `${product[0]?.id}`,
  //       product_image: `${product[0]?.images[0]?.image_url}`,
  //       product_name: `${product[0]?.name}`,
  //       charged_unit_price: `${product[0]?.afiari_price}`,
  //       quantity: 1,
  //     },
  //   };
  //   const data2 = {
  //     country: country,
  //     id: id,
  //     isLogged_in: isLogged_in,
  //   };
  //   if (!isLogged_in) {
  //     const t = JSON.parse(localStorage.getItem('cart'));
  //     const u = t
  //       ? t.map((el) => {
  //           if (el.id === product.id) {
  //             return { ...el, quantity: el.quantity + 1 };
  //           }
  //           return { ...el };
  //         })
  //       : dispatch(addCart(data));
  //     localStorage.setItem('cart', JSON.stringify(u));
  //   } else {
  //     dispatch(addCart(data2));
  //   }

  //   // console.log(data.product);
  //   // if (isLogged_in) {

  //   //   //   dispatch(addCart(country, id));
  //   //   // } else {
  //   //   //   localStorage.setItem('cart', product);
  //   // }
  // };

  // console.log(product);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Navbar />
      <Box
        className={styles.shop__header}
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-evenly' },
          width: '100%',
          height: { xs: '229px', md: '402px' },
          backgroundImage: {
            xs: 'url("/item_description_illustration.svg")',
            md: 'none',
          },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          marginBottom: '25px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: { xs: 'center', md: 'space-evenly' },
            width: { xs: '100%', md: '50%' },
            height: '100%',
          }}
        >
          <Typography
            //   className={styles.shop__header__text}
            variant="h1"
            sx={{
              fontWeight: '600',
              fontSize: { xs: '20px', md: '48px' },
              lineHeight: { xs: '37px', md: '65px' },
              textAlign: { xs: 'center', md: 'justify' },
              color: { xs: ' #FFFFFF', md: '#3a3a3a' },
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'center', md: 'flex-start' },
              justifyContent: 'center',
              width: { xs: '100%', md: '445px', lg: '592px' },
              height: { xs: '100%', md: 'auto' },
              background: { xs: ' rgba(0, 34, 25, 0.824)', md: 'none' },
            }}
          >
            A full description of the item
          </Typography>
        </Box>

        <Box
          sx={{
            display: { md: 'flex', xs: 'none' },
          }}
        >
          <Image
            src={item_description_illustration}
            alt="product"
            width={400}
            height={300}
          />
        </Box>
      </Box>
      <Divider
        sx={{
          width: '100%',
        }}
      ></Divider>
      {products()?.map((item) => (
        <Box
          key={item?.id}
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: '29px',
            width: '100%',

            padding: { xs: '47px 61px', sm: '87px 200px', md: '87px 200px' },
            // border: '1px solid red',
          }}
        >
          <Box
            component="div"
            sx={{
              position: 'absolute',
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px',
              left: '12px',
              top: '56px',
              background: '#3a3a3a',
              cursor: 'pointer',
              borderRadius: '100%',
              paddingLeft: '.3rem',
            }}
          >
            <IconButton>
              <ArrowBackIos
                sx={{
                  width: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              />
            </IconButton>
          </Box>
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-evenly',
              width: { md: '80%', xs: '100%' },
              height: { md: '200px', xs: '308px' },
              background: '#FFFFFF',

              borderRadius: ' 5.20833px',
              // padding: '1rem 1rem',
              // border: '1px solid red',
            }}
          >
            {item?.images[0]?.image_url ? (
              <Image
                key={item?.images[0]?.id}
                loader={() => item?.images[0]?.image_url}
                src={item?.images[0]?.image_url}
                alt="product"
                width={222}
                height={186}
                unoptimized={true}
                className={styles.product_img}
              />
            ) : (
              <Image
                src="/fish.png"
                alt="product"
                width={50}
                height={50}
                className={styles.product_img}
              />
            )}

            <Box
              component="div"
              sx={{
                // border: '1px solid red',
                display: 'flex',
                flexDirection: { xs: 'row', md: 'column' },
                alignItems: 'flex-start',
                justifyContent: 'center',
                width: { xs: '100%', md: '50%' },
                // marginLeft: '1rem',
                // padding: '0 1rem',
              }}
            >
              <Box
                component="div"
                sx={{
                  width: { xs: '50%', md: '100%' },
                  display: 'flex',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  // border: '1px solid red',
                }}
              >
                <Typography variant="p" className={styles.cart_product_details}>
                  {item?.description}
                </Typography>
                <Typography
                  variant="p"
                  className={styles.cart_product_details}
                  sx={{
                    fontWeight: '400',
                    // border: '1px solid red',
                    width: '100%',
                    marginBottom: { xs: '10px', md: '30px' },
                  }}
                >
                  {item?.name}
                </Typography>
                <Typography
                  variant="p"
                  className={styles.cart_product_details}
                  sx={{
                    marginBottom: { xs: '0px', md: '13px' },
                  }}
                >
                  {item?.currency}
                  {formatCurrency(item?.price)}
                </Typography>
              </Box>
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  alignItems: { xs: 'flex-end', md: 'flex-start' },
                  justifyContent: 'flex-end',
                  width: { xs: '50%', md: '100%' },
                  height: '100%',
                  flexDirection: 'column',
                  // marginTop: '16px',
                  // border: '1px solid red',
                }}
              >
                <Button
                  sx={{
                    width: { xs: '56px', md: '85px' },
                    height: { xs: '18px', md: '35px' },
                    borderRadius: '50px',
                    fontSize: { xs: '9px', md: '12px' },
                    backgroundColor: ' #0A503D',
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: '#0a3d30',
                      color: '#fff',
                    },
                  }}
                  // onClick={addToCart}
                  onClick={() => {
                    if (isLogged_in) {
                      const data = {
                        country: country,
                        id: item.id,
                      };
                      addCart(data);
                    } else {
                      addItem(item);
                    }
                  }}
                >
                  ADD
                </Button>
                <Typography
                  variant="p"
                  sx={{
                    display: { xs: 'none', md: 'flex' },
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: '14px',
                    lineHeight: '34px',
                    textAlign: 'center',
                    color: '#000000',
                  }}
                >
                  Food class:
                  {item?.categories[0]?.category_text}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      ))}

      <Box
        sx={{
          display: 'flex',
          borderBottom: ' 1px solid rgba(0, 0, 0, 0.3)',
          padding: { xs: '0px 50px', md: '0px 302px' },
          marginBottom: '1rem',
          width: '100%',
          // border: '1px solid red',
        }}
      >
        <Typography
          variant="p"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: ' 4px solid  #363434',
            padding: '10px 2px',
            marginRight: '3rem',
            width: '102px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setReview(false);
            setDescription(true);
          }}
        >
          Description
        </Typography>
        <Typography
          variant="p"
          sx={{
            display: 'flex',
            // borderBottom: ' 3px solid  #363434',
            padding: '10px 2px',
            marginRight: '3rem',
            width: '102px',
            cursor: 'pointer',
          }}
          onClick={() => {
            setDescription(false);

            setReview(true);
          }}
        >
          Reviews (1)
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          height: '869px',
        }}
      >
        {description &&
          product?.map((item) => (
            <Typography key={item.id}>{item.description}</Typography>
          ))}
        {review &&
          product?.map((item) => (
            <Box
              key={item.id}
              component="div"
              sx={{
                display: 'flex',
              }}
            >
              <Box
                component="div"
                sx={{
                  width: '34px',
                  height: '34px',
                  background: ' #FFFFFF',
                  border: ' 0.33px solid #3A3A3A',
                  boxSizing: ' borderBox',
                }}
              >
                <img src={test} alt="profile" />
              </Box>
              <Box>
                <Typography>Georgefx - October 8 2021</Typography>
                <Typography>
                  This yam is the best recommended nigerian yam for the pounded
                  yam recipe and it is also suitable for other yam dishes.
                </Typography>
                <Typography>Add your review</Typography>
                <Typography>Rate the product</Typography>
                <Typography>Write your review</Typography>
                <button
                  style={{
                    width: ' 32.17px',
                    height: '9.79px',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: ' 2.79755px',
                    lineHeight: ' 4px',
                    borderRadius: '8.74233px',
                    background: '#0A503D',
                    color: ' #FFFFFF',
                  }}
                >
                  Submit
                </button>
              </Box>
            </Box>
          ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default ProductDetail;
