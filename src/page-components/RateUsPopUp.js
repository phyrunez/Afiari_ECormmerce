import React, { useState } from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import { ButtonSmall } from '../shared-components/Button';
import styles from '../../styles/Payment.module.css';

function RateUsPopUp() {
  const [starClicked, setStarClicked] = useState(false);
  const [itemClicked, setItemClicked] = useState('');
  return (
    <Box
      sx={{
        position: 'absolute',
        zIndex: '10000000000000000',
        top: '250px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: { xs: '331px', md: ' 697px' },
        height: { xs: '302px', md: '546px' },
        background: '#FFFFFF',
        boxShadow: ' 0px 2.76557px 11.0623px rgba(0, 0, 0, 0.25)',
        borderRadius: '13.8278px',
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontStyle: 'bold',
          fontWeight: '400',
          fontSize: { xs: '16px', md: '31px' },
          lineHeight: '22px',
          marginBottom: { xs: '19px', md: '39px' },
          color: '#000',
        }}
      >
        Thank you for taking out time to rate us
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          width: '100%',
          padding: '16px 0px',
          border: '1px solid rgba(0, 0, 0, 0.3)',
          marginBottom: { xs: '16px', md: '29px' },
        }}
      >
        {[1, 2, 3, 4, 5].map((item, i) => (
          <img
            src={
              starClicked && itemClicked === item
                ? '/blackStar.svg'
                : '/whiteStar.svg'
            }
            alt="star"
            key={i}
            width={46}
            height={46}
            className={styles.payment__img__star_popup}
            onClick={() => {
              setStarClicked(!starClicked);
              setItemClicked(item);
            }}
          />
        ))}
      </Box>

      <Typography
        variant="h5"
        sx={{
          fontStyle: 'bold',
          fontWeight: '700',
          fontSize: { xs: '12px', md: '20px' },
          lineHeight: '16px',
          marginBottom: '4px',
          color: ' #866363',
        }}
      >
        Write a review
      </Typography>
      <Typography
        variant="p"
        sx={{
          fontStyle: 'bold',
          fontWeight: '400',
          fontSize: '8px',
          lineHeight: { xs: '11px', md: '16px' },
          marginBottom: '12px',
          color: ' #000000',
        }}
      >
        Let others know about your experience
      </Typography>

      <input
        type="text"
        placeholder="Enter your comment here"
        // style={{
        //   width: '503px',
        //   height: '66px',

        //   background: ' #FFFFFF',
        //   border: '0.553114px solid rgba(0, 0, 0, 0.3)',
        //   borderRadius: '8.2967px',
        //   marginBottom: '16px',
        //   outline: 'none',
        //   paddingLeft: '1rem',
        // }}
        className={styles.payment__review_input}
      />

      <ButtonSmall
        text="POST"
        width="123px"
        height="53.72px"
        backgroundColor="#0A503D"
        border=" 0.399062px solid #0A503D"
        borderRadius="21.5331px"
        fontSize="8px"
        fontWeight="400"
        color="#fff"
        className={styles.payment__review__btn__popup}
      />
    </Box>
  );
}

export default RateUsPopUp;
