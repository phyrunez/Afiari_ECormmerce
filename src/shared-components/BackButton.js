import { ArrowBackIos } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import React from 'react';
import { useRouter } from 'next/router';

function BackButton() {
  const router = useRouter();

  return (
    <Box
      component="div"
      sx={{
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '24px',
        height: '24px',
        left: '25px',
        top: '56px',
        background: '#3a3a3a',
        cursor: 'pointer',
        borderRadius: '100%',
        paddingLeft: '.3rem',
      }}
      onClick={() => {
        router.back();
      }}
    >
      <IconButton>
        <ArrowBackIos
          sx={{
            width: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        />
      </IconButton>
    </Box>
  );
}

export default BackButton;
