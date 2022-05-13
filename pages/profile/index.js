import { Box } from '@mui/material';
import React from 'react';
import ProfileSideNav from '../../components/Profile/ProfileSideNav';
import ShoppingHistory from '../../components/Profile/ShoppingHistory';
import Navbar from '../../src/shared-components/navbar/Navbar';
import Footer from '../../src/page-components/Footer';
import { useSelector } from 'react-redux';

function Profile() {
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
        <Box>{mo ? 'h1' : <ShoppingHistory />}</Box>
      </Box>
      <Footer />
    </Box>
  );
}

export default Profile;
