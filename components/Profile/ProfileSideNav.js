import {
  CreditCard,
  Notifications,
  Settings,
  ShoppingBag,
} from '@mui/icons-material';
import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styles from '../../styles/Profile.module.css';

function ProfileSideNav() {
  const { isLogged_in, country, first_name, last_name, user_id, picture_url } =
    useSelector((state) => state.auth);

  const [selectedProfileList, setSelectedProfileList] = useState(false);

  const profileItems = [
    {
      name: 'Shopping History',
      icon: <ShoppingBag />,
    },
    {
      name: 'Notification',
      icon: <Notifications />,
    },
    {
      name: 'Afiari Coupons',
      icon: <CreditCard />,
    },
    {
      name: 'Profile Settings',
      icon: <Settings />,
    },
  ];

  return <Box>nice</Box>;
}

export default ProfileSideNav;
