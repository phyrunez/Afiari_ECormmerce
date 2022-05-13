import { Box, Divider, Typography } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ButtonSmall } from '../../src/shared-components/Button';
import styles from '../../styles/Profile.module.css';
import leftArrow from '../../public/leftArrow.svg';
import rightArrow from '../../public/rightArrow.svg';
import { useSelector } from 'react-redux';

function ShoppingHistory() {
  const { loading, shopping_history, user_address } = useSelector(
    (state) => state.history
  );

  console.log(shopping_history);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        marginLeft: '1rem',
        justifyContent: 'center',
        paddingTop: '25px',
      }}
      className={styles.profile__shipping__history__wrapper}
    >
      <Typography
        variant="h2"
        sx={{
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '22px',
          //   textAlign: 'center',
          letterSpacing: ' 0.04em',
          color: ' #000000',
          marginBottom: '16px',
        }}
      >
        SHOPPING HISTORY
      </Typography>

      {/* card wrapper */}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   height: '350px',
          overflowX: 'hidden',
          //   border: '1px solid red',
        }}
      >
        {[...Array(5)].map((item, i) => (
          <Box
            key={i}
            variant="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              padding: '23px',
              width: ' 236px',
              height: ' 123.19px',
              background: ' #FFFFFF',
              boxShadow: ' 0px 1.48428px 1.85534px rgba(0, 0, 0, 0.15)',
              borderRadius: ' 9.27672px',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px',
            }}
          >
            {/* card top */}
            <Box
              variant="div"
              sx={{
                display: 'flex',
              }}
            >
              <img
                src="/data.svg"
                alt="item"
                width={50}
                height={50}
                style={{
                  marginRight: '8px',
                }}
              />

              <Box
                variant="div"
                sx={{
                  display: 'flex',
                }}
              >
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
                  >
                    NGN 15,700
                  </Typography>
                  <Typography
                    className={styles.profile__card__address__para}
                    variant="p"
                  >
                    No. 45, Ojulegba...
                  </Typography>
                  <Typography
                    className={styles.profile__card__address__para}
                    variant="p"
                  >
                    24th November, 2021
                  </Typography>
                </Box>
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
        ))}
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
