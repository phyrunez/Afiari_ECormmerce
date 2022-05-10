import { Box, Typography } from '@mui/material';
import React from 'react';
import { ButtonSmall } from '../../shared-components/Button';

const FilterByPriceComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginBottom: '3rem',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontWeight: '600',
          fontSize: '21px',
          lineHeight: '34px',
          color: ' #000000',
          marginBottom: '8px',
        }}
      >
        Filter by Price
      </Typography>
      <input
        type="range"
        name=""
        id=""
        style={{
          marginBottom: '15px',
        }}
      />
      <ButtonSmall
        backgroundColor=" #0A503D"
        borderRadius="41.2844px"
        text="FILTER"
        width="98px"
        height="40px"
        color="#fff"
      />
      <Typography
        variant="p"
        sx={{
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '27px',
          marginTop: '15px',
          color: '#000000',
        }}
      >
        NGN 1000 - NGN 48,500
      </Typography>
    </Box>
  );
};

export default FilterByPriceComponent;
