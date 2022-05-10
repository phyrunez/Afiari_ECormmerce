import { Box, Typography } from '@mui/material';
import React from 'react';
import { ButtonSmall } from '../../shared-components/Button';

function NewArrival() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '259px',
        height: '290px',
        paddingBottom: '41px',
        backgroundImage: 'url("/newArrival.svg")',
      }}
    >
      <Typography
        variant="h5"
        sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: ' 25.4727px',
          lineHeight: '35px',
          paddingBottom: '16px',
          color: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        NEW ARRIVALS
      </Typography>
      <ButtonSmall
        width="169px"
        height="35px"
        backgroundColor="#fff"
        borderRadius=" 8.15126px"
        color="#3a3a3a"
        text="CLICK HERE NOW "
      />
    </Box>
  );
}

export default NewArrival;
