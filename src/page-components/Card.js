import { Typography, Grid, Box } from '@mui/material';
import Image from 'next/image';
import React from 'react';
import { ButtonSmall as Button } from '../shared-components/Button';

const Card = () => {
  const data = [
    {
      img: require('../../public/foodrecipe.png'),
      heading: 'Food recipe',
      details:
        ' You can view our list of recipes and shop for the ingredients of that meal instantly',
    },
    {
      img: require('../../public/order by health challenge.png'),
      heading: 'Health Challenge',
      details:
        'We care so much about your health as we have a list of healthy food items that help manage certain health conditions',
    },
  ];
  return (
    <>
      {data.map((item, i) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: { md: 'row', xs: 'column' },
            marginBottom: '24px',
            alignItems: { md: 'center' },
            justifyContent: 'space-around',
          }}
          key={i}
        >
          <Box
            sx={{
              order: { md: i % 2 !== 0 ? '2' : '1' },
            }}
          >
            <Image src={item.img.default} alt="offer" />
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              order: { md: i % 2 !== 0 ? '1' : '2' },
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: { md: '31px', xs: '20px' },
                lineHeight: '42px',
                marginTop: '16px',
                marginBottom: '8px',
              }}
            >
              {item.heading}{' '}
            </Typography>
            <Typography
              variant="p"
              sx={{
                width: { md: '264px', xs: '100%' },
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '16px',
                lineHeight: '22px',
                marginBottom: '16px',
              }}
            >
              {item.details}{' '}
            </Typography>
            <Button
              text="SHOP NOW"
              width="90px"
              borderRadius="50px"
              backgroundColor=" #0A503D"
              height="40px"
              fontWeight="400"
              fontSize="10px"
              color="#FFFFFF"
              href="/shop"
            />
          </Box>
        </Box>
      ))}
    </>
  );
};

export default Card;
