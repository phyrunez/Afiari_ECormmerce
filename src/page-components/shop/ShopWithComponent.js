import React from 'react';
import styles from '../../../styles/Shop.module.css';
import Link from 'next/link';
import { Box, List, ListItem, ListItemText, Typography } from '@mui/material';

const ShopWithComponent = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        marginTop: '18px',
      }}
    >
      <Typography
        variant="p"
        sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '20px',
          lineHeight: '27px',

          color: '#000000',
        }}
      >
        You can also shop by :
      </Typography>
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Link href="/">
          <a>
            <ListItem
              button
              className={styles.shop__filter__list}
              sx={{
                textDecoration: 'underline',
              }}
            >
              <ListItemText primary="Food Recipe" />
            </ListItem>
          </a>
        </Link>
        <Link href="/">
          <a>
            <ListItem
              button
              className={styles.shop__filter__list}
              sx={{
                textDecoration: 'underline',
              }}
            >
              <ListItemText primary="Health Challenge" />
            </ListItem>
          </a>
        </Link>
      </List>
    </Box>
  );
};

export default ShopWithComponent;
