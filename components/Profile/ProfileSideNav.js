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

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '30%', md: '365px' },
        // flex: '.7',
        background: ' #FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        // marginLeft: '3rem',
        padding: '102px 0px',
        borderTopRightRadius: '15px',
        borderBottomRightRadius: '15px',
        borderTop: 'none',
        borderBottom: 'none',
        margin: '1rem 0rem 0rem 0rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginBottom: '67px',
        }}
      >
        <Typography
          variant="h2"
          sx={
            {
              // fontStyle: 'normal',
              // fontWeight: '400',
              // fontSize: '31px',
              // lineHeight: '42px',
              // textAlign: ' center',
              // letterSpacing: ' 0.04em',
              // marginBottom: '20px',
              // color: '#000000',
            }
          }
          className={styles.profile__header}
        >
          MY PROFILE
        </Typography>

        <img
          src="/data.svg"
          alt="profile image"
          className={styles.profile__image}
        />

        <Typography
          variant="p"
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '16px',
            lineHeight: '22px',
            textAlign: ' center',
            letterSpacing: ' 0.04em',
            color: '#000000',
          }}
        >
          Bankole Ibrahim
        </Typography>
      </Box>

      {/* ///////////////////// list items /////////////////////////////// */}
      <Box
        component="ul"
        className={styles.profile__side__nav__list}
        onClick={() => {
          setSelectedProfileList(!selectedProfileList);
        }}
        sx={{
          marginBottom: '500px',
        }}
      >
        {profileItems.map((item, i) => (
          <Box
            component="li"
            key={i}
            className={styles.profile__side__nav__list_item}
            sx={{
              background: selectedProfileList === true ? ' #0A503D' : '#fff',
            }}
          >
            <IconButton>{item.icon}</IconButton>
            {item.name}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProfileSideNav;
