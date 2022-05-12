import { Box } from '@mui/material';
import React from 'react';
import ProfileSideNav from '../components/Profile/ProfileSideNav';
import ShoppingHistory from '../components/Profile/ShoppingHistory';
import Navbar from '../src/shared-components/navbar/Navbar';
import Footer from '../src/page-components/Footer';
import { useSelector } from 'react-redux';
import Spinner from '../components/Spinner';

function Profile() {
  const { loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Spinner />;
  }
  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <ProfileSideNav />
        <Box>
          <ShoppingHistory />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Profile;
