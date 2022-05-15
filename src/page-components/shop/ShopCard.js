import { Box, Button, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ButtonSmall } from '../../shared-components/Button';

import styles from '../../../styles/Shop.module.css';
import leftArrow from '../../../public/leftArrow.svg';
import rightArrow from '../../../public/rightArrow.svg';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  getGeneralMarket,
  getProductCategory,
} from '../../redux/slice/ProductSlice';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  getAllProducts,
  getProductsByCategory,
} from '../../redux/general/generalAction';
import { addCart } from '../../redux/cart/cartAction';

import { useCart } from 'react-use-cart';
import { formatCurrency, getNumber } from '../../utils/utils';

const ShopCard = () => {
  const {
    product,
    productCategory,
    selectedCategory,
    meta_data: metaData,
  } = useSelector((state) => state?.general);

  const { country, isLogged_in } = useSelector((state) => state?.auth);

  const { page_size, number_of_pages, page_index, total_count } = metaData;

  const dispatch = useDispatch();

  const router = useRouter();

  const [pageNumber, setPageNumber] = useState(1);

  const { addItem } = useCart();

  let displayedProduct = product;

  if (selectedCategory !== '') {
    displayedProduct = productCategory;
  }

  const products = () => {
    const newData = displayedProduct.map((prod, index) => {
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

  const [items] = useState({
    total: metaData?.total_count,
    per_page: metaData?.page_size,
    currentPage: metaData?.page_index,
    pages: metaData?.number_of_pages,
  });

  useEffect(() => {
    dispatch(getAllProducts(country, pageNumber));
    // dispatch(getProductCategory(item));
  }, [dispatch, pageNumber, country, getAllProducts]);

  // const handleNext = () => {
  //   if (items.currentPage <= items.pages) {
  //     dispatch(getGeneralMarket(items.currentPage++));
  //   }
  // };
  // const handlePrev = () => {
  //   if (items.currentPage !== 0)
  //     dispatch(getGeneralMarket(items.currentPage--));
  // };

  // const addToCart = () => {
  //   const data = {
  //     country: country,
  //     id: product[0]?.id,
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
  //     id: product[0]?.id,
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

  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Box
        component="div"
        className={styles.shop__card__wrapper}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // justifyContent: 'center',
          height: '900px',

          overflowX: 'hidden',
          // marginTop: { md: "-15rem", xs: "1rem" },
          width: { sx: '100%', sm: '50%', lg: '100%' },
          '&:hover': {
            overflowX: 'scroll',
          },
        }}
      >
        {products().length === 0 ? (
          <Box>
            <h1>Category Empty</h1>
          </Box>
        ) : (
          products()?.map((item, i) => (
            <Box
              key={item.id}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-around',
                // marginTop: '29px',
                width: '100%',
                padding: '29px 16px',
                cursor: 'pointer',
              }}
            >
              <Box
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'space-evenly',
                  width: { md: '80%', xs: '100%' },
                  height: { md: '200px', xs: '139.06px' },
                  background: '#FFFFFF',
                  boxShadow: '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
                  borderRadius: ' 5.20833px',
                  padding: '1rem 1rem',
                }}
              >
                {/* <Link href={`/shop/${item.id}`}> */}
                <Box
                  sx={{
                    height: '100%',
                  }}
                  onClick={() => {
                    router.push(`/shop/${item.id}`);
                  }}
                >
                  {item?.images[0]?.image_url ? (
                    <Image
                      key={item?.images[0]?.id}
                      loader={() => item?.images[0]?.image_url}
                      src={item?.images[0]?.image_url}
                      alt="product"
                      width={222}
                      height={140}
                      className={styles.product_img}
                      unoptimized={true}
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
                </Box>
                {/* </Link> */}

                <Box
                  component="div"
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    width: '50%',
                    // marginLeft: '1rem',
                    padding: '0 1rem',
                  }}
                >
                  {/* <Link href={`/shop/${item.id}`}> */}
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                    onClick={() => {
                      router.push(`/shop/${item.id}`);
                    }}
                  >
                    <Typography
                      variant="p"
                      className={styles.cart_product_details}
                    >
                      {item.name}
                    </Typography>
                    <Typography
                      variant="p"
                      className={styles.cart_product_details}
                      sx={{
                        fontWeight: '400',
                        marginBottom: { xs: '10px', md: '30px' },
                      }}
                    >
                      {item.description}
                    </Typography>
                    <Typography
                      variant="p"
                      className={styles.cart_product_details}
                      sx={{
                        marginBottom: { xs: '0px', md: '13px' },
                      }}
                    >
                      NGN {formatCurrency(item?.price)}
                    </Typography>
                  </Box>
                  {/* </Link> */}

                  <Box
                    component="div"
                    sx={{
                      display: 'flex',
                      width: '100%',
                      marginTop: '16px',
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
                      onClick={() => {
                        const data = {
                          country: country,
                          id: item.id,
                          isLogged_in: isLogged_in,
                        };
                        if (isLogged_in) {
                          dispatch(addCart(data));
                        } else {
                          addItem(item);
                        }
                      }}
                    >
                      ADD
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          ))
        )}
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: { md: '70%', xs: '90%' },
          height: ' 50px',
          background: ' #F7F3EF',
          marginTop: '5rem',
        }}
      >
        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          disabled={pageNumber === 1}
          onClick={() => {
            let num = 1;
            setPageNumber(num);
            dispatch(getAllProducts(country, num));
          }}
          // onClick={handlePrev}
        >
          <Image src={leftArrow} alt="product" width={10} height={10} />
          <Image src={leftArrow} alt="product" width={10} height={10} />
        </Box>
        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber(pageNumber - 1);
            dispatch(getAllProducts(country, pageNumber - 1));
          }}
          // onClick={handlePrev}
        >
          <Image src={leftArrow} alt="product" width={10} height={10} />
        </Box>

        <Typography
          variant="p"
          sx={{
            backgroundColor: '#fff',
            fontSize: '10px',
          }}
        >
          {`Product ${
            pageNumber === 1 ? '1' : pageNumber * page_size - page_size + 1
          } to ${
            pageNumber === 1
              ? page_size
              : number_of_pages === pageNumber
              ? total_count
              : pageNumber * page_size
          } `}
          {/* Products 1 to 7 of {total_count} */}
        </Typography>

        <select
          placeholder="page 1"
          style={{
            width: '80px',
            height: '15px',
            border: 'none',
            outline: 'none',
          }}
          onChange={(e) => setPageNumber(Number(e.target.value))}
          value={Number(pageNumber)}
        >
          {Array(number_of_pages)
            .fill()
            .map((num, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))}
        </select>

        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          disabled={pageNumber === number_of_pages}
          onClick={() => {
            setPageNumber(pageNumber + 1);
            dispatch(getAllProducts(country, pageNumber + 1));
          }}
          // onClick={handleNext}
        >
          <Image src={rightArrow} alt="product" width={10} height={10} />
        </Box>
        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          disabled={pageNumber === number_of_pages}
          onClick={() => {
            setPageNumber(number_of_pages);
            dispatch(getAllProducts(country, number_of_pages));
          }}
          // onClick={handleNext}
        >
          <Image src={rightArrow} alt="product" width={10} height={10} />
          <Image src={rightArrow} alt="product" width={10} height={10} />
        </Box>
      </Box>
    </Box>
  );
};

export default ShopCard;
