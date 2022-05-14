import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import ProfileSideNav from '../../components/Profile/ProfileSideNav';
import ShoppingHistory from '../../components/Profile/ShoppingHistory';
import Navbar from '../../src/shared-components/navbar/Navbar';
import Footer from '../../src/page-components/Footer';
import { useSelector } from 'react-redux';
import ProfileSettings from '../../components/Profile/ProfileSettings';
import { getShoppingHistory } from '../../src/redux/shopping/shoppingAction';

function Profile() {
  useEffect(() => {
    dispatch(getShoppingHistory());
  }, [dispatch]);
  const mo = true;
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
        border: '1px solid red',
      }}
    >
      <Navbar />
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: 'auto',
        }}
      >
        <ProfileSideNav />
        {mo ? <ProfileSettings /> : <ShoppingHistory />}
      </Box>
      <Footer />
    </Box>
  );
}

export default Profile;
