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
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSelectedProfileMenu } from '../../src/redux/general/generalAction';
import styles from '../../styles/Profile.module.css';

function ProfileSideNav() {
  const { isLogged_in, country, first_name, last_name, user_id, picture_url } =
    useSelector((state) => state.auth);

  const [active, setActive] = useState(false);

  const [selectedProfileList, setSelectedProfileList] = useState('');

  console.log(selectedProfileList);

  const dispatch = useDispatch();

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

  useEffect(() => {
    setSelectedProfileList('Shopping History');
  }, [])

  return (
    <Box
      sx={{
        position: active
          ? { xs: 'absolute', sm: 'relative' }
          : { sm: 'relative' },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: active
          ? { xs: 'auto', sm: 'auto', md: '350px' }
          : { xs: '100px', sm: '100px', md: '500px' },
        background: ' #FFFFFF',
        border: active ? { xs: 'unset', sm: 'unset', md: '1px solid rgba(0, 0, 0, 0.3)'} : '1px solid rgba(0, 0, 0, 0.3)',
        // marginLeft: '3rem',
        padding: active
          ? { xs: '24px 30px', sm: '24px 30px', md: '24px 0px' }
          : '24px 0px',
        paddingTop: '20px',
        borderTop: { xs: 'none' },
        borderBottom: { xs: 'none' },
        borderTopRightRadius: { md: '15px' },
        borderBottomRightRadius: { md: '15px' },
        zIndex: { xs: '100  ', md: '0' },
        boxShadow: active
          ? { xs: '6px 4px 8px #d5d5d54f', sm: '6px 4px 8px #d5d5d54f', md: 'unset' }
          : 'unset',
        // border: '1px solid red',
      }}
      className={styles.profile__side__nav__wrapper}
    >
      <Box
        onClick={() => {
          setActive(!active);
        }}
        sx={{
          display: { xs: 'flex', md: 'none' },
          // border: '1px solid red',
          // marginTop: '-13.5rem',
          cursor: 'pointer',
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
          // marginBottom: '67px',
        }}
      >
        <Typography
          variant="h4"
          className={styles.profile__header}
          sx={
            {
              // marginTop: '-8rem',
            }
          }
        >
          MY PROFILE
        </Typography>

        <img
          src={picture_url ? picture_url : '/user.svg'}
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
          {first_name + ' ' + last_name}
        </Typography>
      </Box>

      {/* ///////////////////// list items /////////////////////////////// */}
      <Box
        component="ul"
        className={styles.profile__side__nav__list}
        // onClick={() => {
        //   setSelectedProfileList(!selectedProfileList);
        // }}
        sx={{
          marginBottom: '500px',
        }}
      >
        {profileItems.map((item, i) => (
          <Box
            component="li"
            key={i}
            className={styles.profile__side__nav__list_item}
            onClick={() => {
              setSelectedProfileList(item.name);
              dispatch(getSelectedProfileMenu(item.name));
            }}
            sx={{
              // border: '2px solid red',
              background:
                selectedProfileList === item.name ? { md: '#0a503d' } : '#fff',
              color:
                selectedProfileList === item.name
                  ? { xs: '#000', md: '#fff' }
                  : '#000',
              height: { xs: 'auto', sm: 'auto', md: '108px' },
              padding: '20px 0px',
            }}
            // sx={{
            //   background: selectedProfileList === true ? ' #0A503D' : '#fff',
            // }}
          >
            <IconButton
              sx={{
                // border: '2px solid red',
                color:
                  selectedProfileList === item.name
                    ? { xs: 'black', md: 'black' }
                    : '#3A4942',
              }}
            >
              {item.icon}
            </IconButton>
            <Typography
              variant="p"
              sx={{
                display: { xs: active ? 'flex' : 'none', md: 'flex' },
                width: { xs: '100%', sm: '70%', md: '50%' },
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
