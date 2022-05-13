import { Box, Typography } from '@mui/material';
import React from 'react';
import { ButtonSmall } from '../../src/shared-components/Button';
import { Input } from '../../src/shared-components/InputComponent';
import styles from '../../styles/Profile.module.css';

function ProfileSettings() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '25px 35px ',
        border: '1px solid red',
      }}
    >
      <Typography
        variant="h2"
        className={styles.profile__header}
        sx={{
          marginTop: '2rem',
          marginBottom: '16px',
        }}
      >
        PROFILE SETTINGS
      </Typography>

      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src="/data.svg"
            alt=""
            width={43}
            height={43}
            style={{
              borderRadius: '100%',
            }}
          />
          <Typography variant="p">Michael Adewole</Typography>
        </Box>
        <ButtonSmall text="UPDATE PHOTO" />
      </Box>

      <Box
        variant="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          //   alignItems: 'center',
          justifyContent: 'center',
          //   width: '100%',
          border: '1px solid red',
        }}
      >
        <Input type="text" label="Full name" placeholder="Michael Adewole" />
        <Input
          type="text"
          label="Address"
          placeholder="No. 45, Ojulegba road, Ojuelegba, Lagos"
        />
        <Input type="text" label="Email" placeholder="somebody@mail.com" />
        <Input label="Password" placeholder="************" type="password" />
        <Box>
          <input className={styles.profile__input} />
          <input />
        </Box>
        <Input />
        <Box>
          <input />
          <input />
        </Box>
        <ButtonSmall text="UPDATE PROFILE" />
      </Box>
    </Box>
  );
}

export default ProfileSettings;
