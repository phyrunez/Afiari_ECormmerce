import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleDelete } from '../../redux/cart/cartAction';
import { ButtonSmall } from '../../shared-components/Button';

function DeleteNotification({ id, handleModal, handleCancel }) {
  const dispatch = useDispatch();
  return (
    <Box
      sx={{
        position: 'absolute',
        display: 'flex',
        // flexDirection: 'column',
        height: '100%',
        width: '100%',
        background: 'rgba(0, 0, 0, 0.53)',
        zIndex: '10000000000000',
        // alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          width: { sm: '472px', xs: '250px' },
          height: '106px',
          background: '#FFFFFF',
          border: '0.45702px solid rgba(0, 0, 0, 0.6)',
          borderBottomRightRadius: ' 11.4255px',
          borderTopLeftRadius: ' 11.4255px',
          padding: '1rem',
          marginTop: '21px',
        }}
      >
        <Typography variant="p">
          Are you sure want to delete this Product?
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <ButtonSmall text="Cancel" onClick={handleCancel} />
          <ButtonSmall
            text="Ok"
            onClick={() => {
              handleModal(id);
              toast.success('Product Removed from Cart Successfully');
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DeleteNotification;
