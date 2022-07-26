import { Star } from '@mui/icons-material';
import { IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Footer from '../src/page-components/Footer';
import RateUsPopUp from '../src/page-components/RateUsPopUp';
import { getCart } from '../src/redux/cart/cartAction';
import { ButtonSmall } from '../src/shared-components/Button';
import Navbar from '../src/shared-components/navbar/Navbar';
import styles from '../styles/Payment.module.css';

function PaymentComplete() {
  const [showRating, setShowRating] = useState(false);

  const handleModal = () => {
    setShowRating(!showRating);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Navbar />

      {showRating && (
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
            onClick={handleModal}
          ></Box>
          <RateUsPopUp handleModal={handleModal} />
        </>
      )}

      <Box
        sx={{
          display: 'flex',
          padding: '91px 0px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          <img src="/rate_us_illustration.svg" alt="illustration" />
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: { xs: 'center', lg: 'flex-start' },
            justifyContent: { xs: 'center', lg: 'flex-start' },
            flexDirection: 'column',
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontStyle: 'normal',
              fontWeight: '700',
              fontSize: { xs: '16px', md: '25px' },
              lineHeight: '22px',
              color: '#3A3A3A',
              //   textAlign: { xs: 'center', lg: 'justify' },
              marginBottom: { xs: '5px', md: '2rem' },
            }}
          >
            THANK YOU FOR SHOPPING WITH US
          </Typography>
          <Typography
            variant="p"
            sx={{
              fontStyle: 'normal',
              fontWeight: '300',
              fontSize: { xs: '12px', md: '25px' },
              lineHeight: '14px',
              color: ' #3A3A3A',
              //   textAlign: { xs: 'center', lg: 'justify' },
            }}
          >
            Your food items will be with you in a few hours
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: { xs: '278.54px', md: '698px' },
              height: { xs: '222.68px', md: '558px' },
              background: ' #FFFFFF',
              boxShadow: ' 0px 1.99531px 7.98123px rgba(0, 0, 0, 0.1)',
              borderRadius: { xs: '4.86799px', md: '12.1986px' },
              marginTop: '62px',
              padding: { xs: '2rem 0rem', md: '74px 0px' },
              alignItems: 'center',
              //   justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="p"
                sx={{
                  fontStyle: 'normal',
                  fontWeight: '400',
                  fontSize: { xs: '10px', md: '25px' },
                  lineHeight: { xs: '16px', md: '34px' },
                  color: '#3A3A3A',
                  marginBottom: '15px',
                }}
              >
                How was your experience shopping with Afiari?
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '100%',
                  marginBottom: '9px',
                  padding: '9px 0px',
                }}
              >
                {[1, 2, 3, 4, 5].map((item, i) => (
                  <img
                    src="/whiteStar.svg"
                    alt="star"
                    key={i}
                    // style={{
                    //   width: '30px',
                    //   height: '30px',
                    // }}
                    className={styles.payment__img__star}
                  />
                ))}
              </Box>
              <Box
                sx={{
                  display: { xs: ' flex ', md: 'none' },
                }}
              >
                <ButtonSmall
                  text="RATE US"
                  width="123px"
                  height="21.44px"
                  backgroundColor="#fff"
                  border=" 0.399062px solid #0A503D"
                  borderRadius="15.5331px"
                  fontSize="8px"
                  fontWeight="400"
                  color="#3a3a3a"
                  onClick={handleModal}
                />
              </Box>
              <Box
                sx={{
                  display: { xs: '  none', md: ' flex' },
                }}
              >
                <ButtonSmall
                  text="RATE US"
                  width="310px"
                  height="53.44px"
                  backgroundColor="#fff"
                  border=" 0.399062px solid #0A503D"
                  borderRadius="15.5331px"
                  fontSize="16px"
                  fontWeight="400"
                  color="#3a3a3a"
                  onClick={handleModal}
                />
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                marginTop: { xs: '10px', md: '31px' },
                width: '100% ',
                justifyContent: 'space-evenly',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: '400',
                    fontSize: { xs: '29.5306px', md: '74px' },
                    lineHeight: { xs: '40px', md: '101px' },
                    marginBottom: '3px',
                    color: '#3A3A3A',
                  }}
                >
                  5.0
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                  }}
                >
                  {[1, 2, 3, 4, 5].map((item, i) => (
                    <img
                      src="/blackStar.svg"
                      alt="star"
                      key={i}
                      className={styles.payment__img__star_two}
                    />
                  ))}
                </Box>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {[5, 4, 3, 2, 1].map((item, i) => (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    key={i}
                  >
                    <Typography
                      variant="p"
                      sx={{
                        fontStyle: 'normal',
                        fontWeight: '400',
                        fontSize: { xs: '10px', md: '16px' },
                        lineHeight: { xs: '16px', md: '22px' },
                        color: '#3A3A3A',
                        marginRight: '9px',
                        marginBottom: { xs: '1px', md: '20px' },
                      }}
                    >
                      {item}
                    </Typography>
                    <Box
                      sx={{
                        width: { xs: '142.86px', md: '358px' },
                        height: { xs: '4.79px', md: '12px' },

                        background: i === 0 ? ' #0A503D' : '#C4C4C4',
                        borderRadius: '19.9531px',
                        marginBottom: { xs: '1px', md: '20px' },
                      }}
                    ></Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default PaymentComplete;
