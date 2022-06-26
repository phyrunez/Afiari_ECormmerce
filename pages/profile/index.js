import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProfileSideNav from '../../components/Profile/ProfileSideNav';
import ShoppingHistory from '../../components/Profile/ShoppingHistory';
import Navbar from '../../src/shared-components/navbar/Navbar';
import Footer from '../../src/page-components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../../styles/Profile.module.css';
import ProfileSettings from '../../components/Profile/ProfileSettings';
import { getShoppingHistory } from '../../src/redux/shopping/shoppingAction';
import Notification from '../../components/Profile/Notification';
import ProfileOpenNotification from '../../components/Profile/ProfileOpenNotification';

function Profile() {
  const dispatch = useDispatch();

  const [selected, setSelected] = useState('');
  const { selectedProfileMenu } = useSelector((state) => state.general);

  useEffect(() => {
    dispatch(getShoppingHistory());
  }, [dispatch]);

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0px',
        width: '100%',
        // border: '1px solid red',
      }}
    >
       <Box className={styles.profile__nav} sx={{ width: '100%'}}><Navbar /></Box>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
      >
        <ProfileSideNav />

        {selectedProfileMenu === 'Shopping History' ? (
          <ShoppingHistory />
        ) : selectedProfileMenu === 'Notification' ? (
           <Notification />
          // <ProfileOpenNotification />
        ) : // <Notification />
        selectedProfileMenu === 'Profile Settings' ? (
          <ProfileSettings />
        ) : (
          <ShoppingHistory />
        )}

        {/* <ProfileOpenNotification /> */}
      </Box>
      <Box className={styles.profile__footer} sx={{ marginTop: '200px', width: '100%'}}><Footer /></Box>
    </Box>
  );
}

export default Profile;
