import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React, { Fragment } from 'react';
import { ButtonSmall } from '../../src/shared-components/Button';
import styles from '../../styles/Profile.module.css';
import leftArrow from '../../public/leftArrow.svg';
import rightArrow from '../../public/rightArrow.svg';
import { useSelector } from 'react-redux';

function ShoppingHistory() {
  const { loading, shoppingHistory, user_address } = useSelector(
    (state) => state.history
  );

  console.log(shoppingHistory)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginLeft: '1rem',
        justifyContent: 'center',
        paddingTop: '25px',
      }}
      className={styles.profile__shipping__history__wrapper}
    >
      {/* card wrapper */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '650px',
            overflowX: 'hidden',
            // border: '1px solid red',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: { xs: '16px', md: '31px' },
              lineHeight: { xs: '22px', md: '42px' },
              //   textAlign: 'center',
              letterSpacing: ' 0.04em',
              color: ' #000000',
              marginBottom: '16px',
            }}
          >
            {/*  heading*/}
            SHOPPING HISTORY
          </Typography>
          {shoppingHistory.length !== 0 ? (
            shoppingHistory.map((item) => (
              <Box
                key={item.id}
                variant="div"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '23px',
                  width: { xs: ' 236px', sm: '350px', md: '694px' },
                  height: { xs: ' 123.19px', sm: '300px', md: '362px' },
                  background: ' #FFFFFF',
                  boxShadow: ' 0px 1.48428px 1.85534px rgba(0, 0, 0, 0.15)',
                  borderRadius: ' 9.27672px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '15px',
                }}
              >
                {/* card top */}
                <Box
                  variant="div"
                  sx={{
                    display: 'flex',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      width: { xs: '44px', sm: '90px', md: '174px' },
                      height: { xs: '44px', sm: '90px', md: '174px' },
                      cursor: 'pointer',
                    }}
                  >
                    <img
                      src={
                        item?.order_items?.[0].product_images?.[0]?.image_url
                      }
                      alt="item"
                      width="100%"
                      height="100%"
                      style={{
                        marginRight: '8px',
                      }}
                    />
                  </Box>

                  <Box
                    variant="div"
                    sx={{
                      display: 'flex',
                    }}
                  >
                    <>
                      <Box
                        variant="div"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                          sx={{
                            fontWeight: { md: '700' },
                          }}
                        >
                          Total Purchase
                        </Typography>

                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                        >
                          Delivery Address
                        </Typography>
                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                        >
                          Delivery date
                        </Typography>
                      </Box>
                      <Divider
                        sx={{
                          margin: '0 6px',
                          border: ' 0.371069px solid rgba(0, 0, 0, 0.3)',
                        }}
                      />
                      <Box
                        variant="div"
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                          sx={{
                            fontWeight: { md: '700' },
                          }}
                        >
                          {item.currency + item.total_cost}
                        </Typography>
                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                        >
                          {item?.shipping_info?.street?.substr(0, 25)}
                          ...
                        </Typography>
                        <Typography
                          className={styles.profile__card__address__para}
                          variant="p"
                        >
                          {(shoppingHistory?.[0]?.date_ordered).substr(0, 10)}
                        </Typography>
                      </Box>
                    </>
                  </Box>
                </Box>

                {/* card down */}
                <Box variant="div">
                  <ButtonSmall
                    className={styles.profile__shipping_btn}
                    text="MORE DETAILS"
                  />
                </Box>
              </Box>
            ))
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
                // border: '1px solid red',
              }}
            >
              <h4>Your Shopping history is empty</h4>
            </Box>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: { md: '70%', xs: '90%' },
          height: ' 50px',
          background: ' #F7F3EF',
          marginTop: '2rem',
          marginBottom: '2rem',
        }}
      >
        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          //   disabled={pageNumber === 1}
          //   onClick={() => {
          //     let num = 1;
          //     setPageNumber(num);
          //     dispatch(getAllProducts(country, num));
          //   }}
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
          //   disabled={pageNumber === 1}
          //   onClick={() => {
          //     setPageNumber(pageNumber - 1);
          //     dispatch(getAllProducts(country, pageNumber - 1));
          //   }}
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
          {/* {`Product ${
            pageNumber === 1 ? '1' : pageNumber * page_size - page_size + 1
          } to ${
            pageNumber === 1
              ? page_size
              : number_of_pages === pageNumber
              ? total_count
              : pageNumber * page_size
          } `} */}
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
          //   onChange={(e) => setPageNumber(Number(e.target.value))}
          //   value={Number(pageNumber)}
        >
          {/* {Array(number_of_pages)
            .fill()
            .map((num, i) => (
              <option key={i} value={i + 1}>
                {i + 1}
              </option>
            ))} */}
        </select>

        <Box
          component="button"
          sx={{
            cursor: 'pointer',
            border: 'none',
            background: 'none',
          }}
          //   disabled={pageNumber === number_of_pages}
          //   onClick={() => {
          //     setPageNumber(pageNumber + 1);
          //     dispatch(getAllProducts(country, pageNumber + 1));
          //   }}
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
          //   disabled={pageNumber === number_of_pages}
          //   onClick={() => {
          //     setPageNumber(number_of_pages);
          //     dispatch(getAllProducts(country, number_of_pages));
          //   }}
          // onClick={handleNext}
        >
          <Image src={rightArrow} alt="product" width={10} height={10} />
          <Image src={rightArrow} alt="product" width={10} height={10} />
        </Box>
      </Box>
    </Box>
  );
}

export default ShoppingHistory;
