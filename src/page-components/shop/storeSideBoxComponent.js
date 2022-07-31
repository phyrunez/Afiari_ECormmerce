import { Box, Typography } from '@mui/material';
import React from 'react';
import StoreProductCategory from './StoreProductCategory';
import FilterByPriceComponent from './FilterByPriceComponent';
import ShopWithComponent from './ShopWithComponent';
import NewArrival from './NewArrival';

const ShopWebViewLeftComponent = ({ setIsLoading }) => {
  return (
    <Box
      component="div"
      sx={{
        display: { lg: 'flex', xs: 'none' },
        flexDirection: 'column',
        alignItems: 'center',
        width: '50%',
        // border: "1px solid red",
      }}
    >
      <StoreProductCategory setIsLoading={setIsLoading} />
      <FilterByPriceComponent />
      <ShopWithComponent />
      <NewArrival />
    </Box>
  );
};

export default ShopWebViewLeftComponent;
