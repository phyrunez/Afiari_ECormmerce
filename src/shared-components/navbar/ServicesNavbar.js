import { AppBar, Toolbar, Box } from '@mui/material';
import React from 'react';
import styles from '../../../styles/Navbar.module.css';
import Image from 'next/image';
import CardPayment from '../../../public/CardPayment.svg';
import FreeShipping from '../../../public/FreeShipping.svg';
import returnsIcon from '../../../public/returnsIcon.svg';
import OnlineSupport from '../../../public/OnlineSupport.svg';

function ServicesNavbar() {
  return (
    <Toolbar
      className={styles.toolbar}
      sx={{
        display: { xs: 'none', md: 'flex' },
        width: '100%',
        background: ' #FFFFFF',
        border: ' 0.260779px solid rgba(0, 0, 0, 0.3)',
        //   height: '40px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'center',
          padding: '8px 45px',
        }}
      >
        <li className={styles.nav__service__link}>
          <Image
            src={FreeShipping}
            alt="Free Shipping"
            width={15}
            height={15}
          />
          Free Shipping
        </li>
        <li className={styles.nav__service__link}>
          <Image src={returnsIcon} alt="Easy Returns" width={15} height={15} />
          Easy Returns
        </li>
        <li className={styles.nav__service__link}>
          <Image src={CardPayment} alt="Card Payment" width={15} height={15} />
          Secure Payment
        </li>
        <li className={styles.nav__service__link}>
          <Image
            src={OnlineSupport}
            alt="Online Support"
            width={15}
            height={15}
          />
          Support 24/7
        </li>
      </Box>
    </Toolbar>
  );
}

export default ServicesNavbar;
