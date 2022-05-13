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

  const [active, setActive] = useState(false);

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
        position: { sm: 'relative' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: active ? '45%' : '25%',
        background: ' #FFFFFF',
        border: '1px solid rgba(0, 0, 0, 0.3)',
        // marginLeft: '3rem',
        padding: '24px 0px',
        // borderTopRightRadius: '15px',
        // borderBottomRightRadius: '15px',
        borderTop: 'none',
        borderBottom: 'none',
        zIndex: '10000000000  ',
      }}
      className={styles.profile__side__nav__wrapper}
    >
      <Box
        onClick={() => {
          setActive(!active);
        }}
      >
        <img src="/menu.svg" alt="" />
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          marginBottom: '67px',
        }}
      >
        <Typography variant="h2" className={styles.profile__header}>
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
            // sx={{
            //   background: selectedProfileList === true ? ' #0A503D' : '#fff',
            // }}
          >
            <IconButton
              sx={{
                color:
                  selectedProfileList === item.name ? '#F7A929' : '#3A4942',
              }}
              onClick={() => setSelectedProfileList(item.name)}
            >
              {item.icon}
            </IconButton>
            <Typography
              variant="p"
              sx={{
                display: active ? 'flex' : 'none',
                width: { xs: '100%', sm: '70%' },
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '14px',
                lineHeight: '22px',
                /* identical to box height */

                textAlign: 'center',
                letterSpacing: '0.04em',

                color: ' #FFFFF',
              }}
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ProfileSideNav;
