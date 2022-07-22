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
  InputBase,
} from '@mui/material';
import { MapIcon } from '../../../public/Marker.svg'


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
          <Paper
            component="form"
            sx={{
              p: '2px 4px',
              display: 'flex',
              alignItems: 'center',
              width: '321px',
              left: '412px',
              border: '1.53151px solid rgba(0, 0, 0, 0.3)',
              borderRadius: '10px',
              marginTop: '0px'
            }}
          >
            <IconButton
              type="button"
              sx={{ p: '10px' }}
              aria-label="search"
              onClick={() => clearSearchField()}
            >
              <MapIcon />
              {/* {
                searchFieldLoaded ? <Clear /> : <Search />
              } */}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="You can search for another location"
            />
          </Paper>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor
            auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et. Donec sed odio
            dui. Donec ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => dispatch(toggleModal())}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
