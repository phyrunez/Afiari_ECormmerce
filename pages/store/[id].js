import { Box, Typography, Button, Divider, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Footer from '../../src/page-components/Footer';
import Navbar from '../../src/shared-components/navbar/Navbar';
import item_description_illustration from '../../public/item_description_illustration.svg';
import reviews_illustration from '../../public/reviews-illustration.svg';
// import male_illustration from '../../public/male.png';
import styles from '../../styles/Shop.module.css';
import { useSelector, useDispatch } from 'react-redux';
// import { getSingleProduct } from '../../redux/slice/ProductSlice';
import { useRouter } from 'next/router';
import { ArrowBackIos, IonBu } from '@mui/icons-material';
import { getSingleProduct } from '../../src/redux/general/generalAction';
import { authToken } from '../../constants/config';

import {
  addCart,
  getCart,
  getPublicKey,
} from '../../src/redux/cart/cartAction';
// import { addCart } from '../../redux/slice/CartSlice';

import { useCart } from 'react-use-cart';
import { formatCurrency, getNumber } from '../../src/utils/utils';
import Spinner from '../../components/Spinner';
import {
  handleUserInput,
  saveTestimony,
} from '../../src/redux/general/generalAction';
import BackButton from '../../src/shared-components/BackButton';

function ProductDetail() {
  const {
    singleProduct: product,
    comment,
    shouldReview,
  } = useSelector((state) => state.general);
  const { country, isLogged_in, loading } = useSelector((state) => state.auth);
  // const { cart } = useSelector((state) => state.cart);
  const [rating, setRating] = useState(0);
  const [disable, setDisable] = useState(true);

  const { addItem, items } = useCart();

  const [review, setReview] = useState(false);
  const [description, setDescription] = useState(true);

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

  const handleSaveTestimony = () => {
    const data = {
      numberOfStars: rating,
      comment: comment,
    };

    dispatch(saveTestimony(data));
    handleModal();
    toast.success('Thank you for your feedback');
  };

  useEffect(() => {
    console.log('some', shouldReview);
  }, [shouldReview]);

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

  return (
    <Box>
      <Navbar />
      {!review ? (
        <div>
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
                Item Description
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
        </div>
      ) : (
        <div>
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
                xs: 'url("/reviews_illustration.svg")',
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
                  textAlign: { xs: 'center', md: 'left' },
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
                See what our customers
                <br />
                think of this product
              </Typography>
            </Box>

            <Box
              sx={{
                display: { md: 'flex', xs: 'none' },
              }}
            >
              <Image
                src={reviews_illustration}
                alt="product"
                width={400}
                height={300}
              />
            </Box>
          </Box>
        </div>
      )}
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
            margin: 'auto',
            // marginTop: '29px',
            width: '100%',

            padding: { xs: '47px 61px', sm: '87px 100px', md: '87px 175px' },
            // border: '1px solid red',
          }}
        >
          {/* <BackButton /> */}
          {/* <Box
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
            onClick={() => {
              router.back();
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
          </Box> */}
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
                // border: '1px sqolid red',
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
          justifyContent: 'space-between',
          borderBottom: ' 1px solid rgba(0, 0, 0, 0.3)',

          padding: { xs: '0px 20px', md: '0px 200px', lg: '0px 250px' },

          marginBottom: '1rem',
          width: '100%',
          justifyContent: 'space-between',
          // border: '1px solid red',
        }}
      >
        <Typography
          variant="p"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderBottom: description ? ' 4px solid  #363434' : '0',
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
            borderBottom: review ? ' 4px solid  #363434' : '0',
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
          justifyContent: 'left',
          alignItems: 'left',
          height: '869px',
          padding: '11px 42px',
        }}
      >
        {description &&
          product?.map((item) => (
            <Typography key={item?.id}>
              {item?.description
                ? item.description
                : 'No description for this item'}
            </Typography>
          ))}
        {review &&
          product?.map((item) => (
            <Box
              key={item.id}
              component="div"
              sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                marginTop: '25px',
              }}
            >
              <Box
                component="div"
                sx={{
                  width: { xs: '25px', md: '100px' },
                  height: { xs: '25px', md: '100px' },
                  marginRight: '1rem',
                  borderRadius: '100%',
                }}
              >
                <Image
                  src="/data.svg"
                  alt="profile"
                  width="100%"
                  height="100%"
                  style={{
                    borderRadius: '120%',
                  }}
                />
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  sx={{
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: { xs: '10px', md: '16px' },
                    lineHeight: '12px',
                    // textAlign: 'center',

                    color: ' #000000',
                    marginBottom: '8px',
                    marginTop: '14px',
                  }}
                >
                  Georgefx - October 8 2021
                </Typography>
                <Typography
                  sx={{
                    width: { xs: '187px', md: '520px' },
                    fontStyle: 'normal',
                    fontWeight: '400',
                    fontSize: { xs: '10px', md: '16px' },
                    lineHeight: { xs: '12px', md: '22px' },
                    // textAlign: 'center',
                    marginBottom: '26px',
                    color: ' #000000',
                  }}
                >
                  This yam is the best recommended nigerian yam for the pounded
                  yam recipe and it is also suitable for other yam dishes.
                </Typography>

                {!shouldReview && (
                  <Box>
                    <Typography
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: { xs: '10px', md: '25px' },
                        lineHeight: { xs: '12px', md: '34px' },
                        // textAlign: 'center',
                        textDecorationLine: 'underline',
                        marginBottom: '8px',
                        color: ' #000000',
                      }}
                    >
                      Add your review
                    </Typography>

                    <Typography
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: { xs: '10px', md: '16px' },
                        lineHeight: { xs: '12px', md: '22px' },
                        marginBottom: '4px',
                        color: ' #000000',
                      }}
                    >
                      Rate the product
                    </Typography>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        // justifyContent: 'space-evenly',
                        width: { xs: '15px', md: '36px' },
                        fontSize: '160px',
                        marginBottom: { xs: '16px', md: '29px' },
                      }}
                    >
                      {[...Array(5)].map((item, index) => {
                        index += 1;
                        return (
                          <Image
                            src={
                              index <= rating
                                ? '/blackStar.svg'
                                : '/whiteStar.svg'
                            }
                            alt="star"
                            key={index}
                            width="100%"
                            height="100%"
                            className={styles.payment__img__star_popup}
                            onClick={() => {
                              setRating(index);
                              setDisable(false);
                              // itemClicked.push(item);
                            }}
                          />
                        );
                      })}
                    </Box>

                    <Typography
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: { xs: '10px', md: '16px' },
                        lineHeight: { xs: '12px', md: '22px' },
                        marginBottom: '30px',
                        color: ' #000000',
                      }}
                    >
                      Write your review
                    </Typography>

                    <input
                      type="text"
                      value={comment}
                      name="comment"
                      id="comment"
                      onChange={(e) => {
                        dispatch(handleUserInput('comment', e.target.value));
                      }}
                      className={styles.product__detail__review_input}
                    />

                    <button
                      //
                      className={styles.product__detail__review_btn}
                      disabled={disable}
                      onClick={handleSaveTestimony}
                    >
                      Submit
                    </button>
                  </Box>
                )}
              </Box>
            </Box>
          ))}
      </Box>

      <Footer />
    </Box>
  );
}

export default ProductDetail;
