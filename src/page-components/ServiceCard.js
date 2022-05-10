import React from 'react';
import {
  AirportShuttle,
  CompareArrows,
  CreditCard,
  SupportAgent,
} from '@mui/icons-material';
import { Box, Typography, Divider, IconButton } from '@mui/material';

const ServiceCard = () => {
  const services = [
    {
      icon: () => (
        <IconButton>
          <AirportShuttle />
        </IconButton>
      ),
      name: 'Free Shipping',
      color: ' #FFD5D9',
    },
    {
      icon: () => (
        <IconButton>
          <CompareArrows />
        </IconButton>
      ),
      name: 'Easy Returns',
      color: ' #FFF1D9',
    },
    {
      icon: () => (
        <IconButton>
          <CreditCard />
        </IconButton>
      ),
      name: 'Secure Payment',
      color: '#FFDADA',
    },
    {
      icon: () => (
        <IconButton>
          <SupportAgent />
        </IconButton>
      ),
      name: 'Support 24/7',
      color: ' #E7FFF1',
    },
  ];

  return (
    <Box
      sx={{
        display: { md: 'flex', xs: 'none' },

        justifyContent: 'space-evenly',
        marginBottom: '2rem',
        width: '100%',
      }}
    >
      {services.map((service, i) => {
        const backgroundColor = service.color;

        return (
          <Box
            key={i}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: { backgroundColor },
              justifyContent: 'space-evenly',
              alignItems: 'center',
              borderRadius: '36.4308px 0px',
              width: '206px',
              height: '294px',
              marginBottom: '2rem',
            }}
          >
            <Box>{service.icon()}</Box>

            <Typography
              variant="p"
              sx={{
                fontWeight: ' 400',
                fontSize: '20px',
                lineHeight: '27px',

                color: ' #000000',
              }}
            >
              {service.name}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

export default ServiceCard;
