// <<<<<<< HEAD
// import React, { useState } from 'react'
// // import Modal from './Modal';
// import { useSelector } from 'react-redux';
// import { makeStyles } from '@material-ui/core/styles';
// import { Button, Modal } from '@mui/material';

// function rand() {
//     return Math.round(Math.random() * 20) - 10;
// }

// function getModalStyle() {
//     const top = 50 + rand();
//     const left = 50 + rand();
//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles(theme => ({
//     modal: {
//         display: 'flex',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     paper: {
//         position: 'absolute',
//         width: 450,
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));
// =======
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { ButtonSmall } from '../../shared-components/Button'
import Image from 'next/image';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/stores/storesActions';
import {
  Paper,
  Box,
  InputBase,
} from '@mui/material';
import MapIcon from '../../../public/Marker.svg'


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export default function StoresAroundYou() {
  const dispatch = useDispatch()
  const toggleModalState = useSelector(
    (state) => state.stores.toggleModalState
  );
  return (
    <div>
      <BootstrapDialog
        onClose={() => dispatch(toggleModal())}
        aria-labelledby="customized-dialog-title"
        open={toggleModalState}
      >
        <DialogTitle 
          sx={{ 
            m: 5, 
            mb: 2,
            p: 2, 
            textAlign: 'center', 
            fontWeight: 'bold', 
            color: 'black' 
          }}
        >
          Stores Around You
          <IconButton
            aria-label="close"
            onClick={() => dispatch(toggleModal())}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              display: { md: 'flex' },
              // flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              width: '90%',
              margin: 'auto',
            }}
          >
            <Paper
              component="form"
              sx={{
                p: '0px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '321px',
                height: '40px',
                left: '412px',
                border: '1.53151px solid rgba(0, 0, 0, 0.3)',
                borderRadius: '10px',
                marginRight: '32px'
              }}
            >
              <IconButton
                type="button"
                sx={{ p: '10px' }}
                aria-label="search"
                onClick={() => clearSearchField()}
              >
                <Image
                  src={MapIcon}
                  alt="Marker"
                  width={25}
                  height={25}
                />
                {/* {
                  searchFieldLoaded ? <Clear /> : <Search />
                } */}
              </IconButton>
              <InputBase
                sx={{ ml: 0, flex: 1, fontSize: '13px' }}
                placeholder="You can search for another location"
              />
            </Paper>
            <ButtonSmall
              width="120px"
              height="40px"
              borderRadius="16px"
              fontSize="12px"
              backgroundColor=" #0A503D"
              text="SEARCH"
              color="#fff"
              onClick={() => search()}
            />
          </Box>
          <Box
            component="div"
            sx={{
              display: 'flex',
              justifyContent: 'space-evenly',
              width: { md: '80%', xs: '100%' },
              height: { md: '150px', xs: '150.06px' },
              background: '#FFFFFF',
              boxShadow: '0px 4.16667px 8.33333px rgba(0, 0, 0, 0.08)',
              borderRadius: ' 5.50833px',
              padding: '1rem 1rem',
              margin: 'auto',
              marginTop: '2rem',
              // border: '1px solid red',
            }}
          >I am The One</Box>
        </DialogContent>
        <DialogActions sx={{margin: "auto"}}>
          {/* <Button autoFocus onClick={() => dispatch(toggleModal())}>
            Save changes
          </Button> */}
          <ButtonSmall
            width="170px"
            height="40px"
            borderRadius="16px"
            fontSize="12px"
            backgroundColor=" #0A503D"
            text="SEARCH NEW STORE"
            color="#fff"
            onClick={() => search()}
          />
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
