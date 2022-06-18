import { Close } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image'
import React, { useState } from 'react';
import styles from '../../styles/Profile.module.css';

function Notification() {
  const [unread, setUnread] = useState(false);
  const [read, setRead] = useState(false);
  return (
    <Box
      component="div"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        paddingTop: '50px',
        // border: '1px solid red',
      }}
      className={styles.profile__notification__wrapper}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
          borderBottom: ' 2px solid rgba(0, 0, 0, 0.3)',
          // border: '1px solid red',
        }}
      >
        <Typography
          variant="h5"
          className={styles.profile__paragraph}
          sx={{
            marginRight: '50px',
            borderBottom: unread ? '  3px solid rgba(0, 0, 0, 0.7)' : '0',
            padding: '10px 2px',
          }}
          onClick={() => {
            setUnread(true);
            setRead(false);
          }}
        >
          Unread Notifications
        </Typography>
        <Typography
          variant="h5"
          className={styles.profile__paragraph}
          sx={{
            borderBottom: read ? '  3px solid rgba(0, 0, 0, 0.7)' : '0',
            padding: '10px 2px',
          }}
          onClick={() => {
            setUnread(false);
            setRead(true);
          }}
        >
          Read Notifications
        </Typography>
      </Box>
      {read ? (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            background: '#fff',
            padding: { xs: '49px 30px' },
            // border: '1px solid red',
          }}
        >
          <Image
            src="/data.svg"
            alt="profile"
            width={32}
            height={47}
            className={styles.notification__img}
          />
          <Typography variant="p" className={styles.profile__paragraph}>
            Welcome to the Afiari Market. We are glad to have you here with us
          </Typography>
          <IconButton>
            <Close fontSize="14px" />
          </IconButton>
        </Box>
      ) : (
        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly',
            width: '100%',
            background: ' #BFF0E3',
            padding: { xs: '49px 30px' },
            // border: '1px solid red',
          }}
        >
          <Image
            src="/data.svg"
            alt="profile"
            width={32}
            height={47}
            className={styles.notification__img}
          />
          <Typography variant="p" className={styles.profile__paragraph}>
            Welcome to the Afiari Market. We are glad to have you here with us.
            feel free to reach us through any of our contacts at the footer of
            our page
          </Typography>
          <IconButton>
            <Close fontSize="14px" />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}

export default Notification;
