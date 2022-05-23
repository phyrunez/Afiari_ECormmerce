import { Box, Typography } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { handleDelete } from '../../redux/cart/cartAction';
import { ButtonSmall } from '../../shared-components/Button';
import styles from '../../../styles/Shop.module.css';

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
          justifyContent: 'center',
          alignItems: 'center',
          width: { sm: '472px', xs: '350px', md: '615px' },
          height: { xs: '349px', md: '349px' },
          background: '#FFFFFF',
          border: '0.45702px solid rgba(0, 0, 0, 0.6)',
          borderRadius: ' 20.0195px',
          padding: { md: '44px 67px' },
          marginTop: '21px',
        }}
      >
        <Typography
          variant="p"
          sx={{
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: { xs: '18px', md: '24px' },
            lineHeight: '33px',
            color: '#000000',
            marginBottom: '55px',
            textAlign: 'center',
          }}
        >
          Do you want to delete the item?
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: { xs: '16px', md: '20px' },
            lineHeight: '27px',
            color: '#3a3a3a',
            marginBottom: '25px',
            textAlign: 'center',
          }}
        >
          Clicking on delete will remove the item from your cart
        </Typography>
        <Typography
          variant="p"
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: { xs: '16px', md: '20px' },
            lineHeight: '27px',
            color: '#3a3a3a',
            marginBottom: '25px',
            textAlign: 'center',
          }}
        >
          Click on “GO BACK” to end the process
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            // padding: { md: '0px 143px' },
            width: '100%',
            marginTop: '15px',
            // border: '1px solid red',
          }}
        >
          <ButtonSmall
            text="GO BACK"
            onClick={handleCancel}
            width={151}
            height={40}
            border=" 1.60156px solid #0A503D"
            borderRadius=" 40.0391px"
            color=" #0A503D"
            backgroundColor="#fff"
            className={styles.deletePopUpBtn}
          />
          <ButtonSmall
            text="Ok"
            onClick={() => {
              handleModal(id);
              toast.success('Product Removed from Cart Successfully');
            }}
            width={151}
            height={40}
            border=" 1.60156px solid #0A503D"
            borderRadius=" 40.0391px"
            color="#fff"
            backgroundColor=" #0A503D"
            className={styles.deletePopUpBtn}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default DeleteNotification;
