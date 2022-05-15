import { Box, Typography } from '@mui/material';
import React from 'react';
import BackButton from '../../src/shared-components/BackButton';
import styles from '../../styles/Profile.module.css';

function ProfileOpenNotification() {
  return (
    <Box
      component="div"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '50px 55px 40px 55px',
        // border: '1px solid red',
      }}
      className={styles.profile__notification__open__wrapper}
    >
      <BackButton />
      <Typography
        variant="h2"
        sx={{
          fontWeight: '600',
          fontSize: '16px',
          marginBottom: '47px',
          marginTop: '50px',
        }}
      >
        Welcome to the Afiari Market.
      </Typography>
      <Typography
        sx={{
          marginBottom: '47px',
        }}
        className={styles.profile__paragraph}
        variant="p"
      >
        Welcome to the Afiari Market. We are glad to have you here with us. feel
        free to reach us through any of our contacts at the footer of our page
      </Typography>
      <img
        src="/notification_illustration.svg"
        alt="illustration"
        className={styles.profile__illustration}
      />
      <Typography
        variant="p"
        sx={{
          fontSize: '16px',
          marginTop: '47px',
        }}
        className={styles.profile__paragraph}
      >
        Thank you and enjoy your day
      </Typography>
    </Box>
  );
}

export default ProfileOpenNotification;
