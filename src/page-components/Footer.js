import React from 'react';
import { Box, Grid, IconButton, Typography, Divider } from '@mui/material';
import Image from 'next/image';
import logo from '../../public/afiari__footer__logo.svg';
import Link from 'next/link';
import {
  Email,
  Facebook,
  Instagram,
  LocationOn,
  Phone,
  Twitter,
  WhatsApp,
  YouTube,
} from '@mui/icons-material';
import styles from '../../styles/Footer.module.css';

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'center', md: 'flex-start' },
        justifyContent: { xs: 'center', md: 'space-evenly' },
        width: '100%',
        height: 'auto',
        background: '#0A503D',
        padding: '4rem 4rem',
        color: '#fff',
      }}
      className={styles.footer}
    >
      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: { xs: 'center', md: 'center' },
          justifyContent: { xs: 'center', md: 'space-between' },
          height: { xs: 'auto', md: '100%' },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: { md: '150px', sx: '0px' },
            height: '100%',
            width: '100%',
          }}
        >
          {logo && <Image src={logo} alt="logo" width="80rem" height="80rem" />}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              fontStyle: 'normal',
              fontWeight: '400',
              fontSize: '12px',
              lineHeight: '18px',
            }}
          >
            Follow us on :
          </Typography>
          <Box
            component="ul"
            sx={{
              display: 'flex',
              flexDirection: 'row',
            }}
          >
            <Link href="https://www.youtube.com/channel/UC77LGMgeVqSEvIehzKAO_sw">
              <IconButton>
                <YouTube className="social__icons" />
              </IconButton>
            </Link>
            <Link href="https://www.facebook.com/afiaridotcom">
              <IconButton>
                <Facebook className="social__icons" />
              </IconButton>
            </Link>
            <Link href="https://www.instagram.com/afiaridotcom/">
              <IconButton>
                <Instagram className="social__icons" />
              </IconButton>
            </Link>
            <Link href="https://twitter.com/afiaridotcom">
              <IconButton>
                <Twitter className="social__icons" />
              </IconButton>
            </Link>
            <Link href="https://wa.link/crfwt9">
              <IconButton>
                <WhatsApp className="social__icons" />
              </IconButton>
            </Link>
          </Box>
        </Box>
      </Box>

      <Divider
        orientation="vertical"
        flexItem
        sx={{
          display: { xs: 'none', md: 'flex' },
          margin: { md: '33px 30px 33px 80px', xs: '0 0' },
          border: ' 0.260417px solid rgba(255, 255, 255, 0.3)',
        }}
      ></Divider>

      <Box
        component="div"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'flex-start' },
          paddingTop: '.5rem',
          width: '100%',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: { sm: 'row', xs: 'column' },
            alignItems: 'flex-start',
            justifyContent: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Box component="ul" className={styles.footer__list}>
            <Link href="/FoodMarket" passHref>
              <li>Food Market</li>
            </Link>
            <Link href="/stores-around-you" passHref>
              <li>Stores Around You</li>
            </Link>
          </Box>
          <Box component="ul" className={styles.footer__list}>
            <Link href="https://www.linkedin.com/company/afiari/">
              <li>LinkedIn </li>
            </Link>
            <Link href="https://www.afiari.com/blog">
              <li>Blog</li>
            </Link>
          </Box>
          <Box component="ul" className={styles.footer__list}>
            <Box component="li">
              <Link href="mailto:info@afiari.com">
                <Box className="social__icons__wrapper">
                  <IconButton>
                    <Email className="social__icons" />
                  </IconButton>
                  <Typography variant="span">Email :</Typography>
                  <Typography variant="span">info@afiari.com</Typography>
                </Box>
              </Link>
            </Box>
            <Box component="li">
              <Link href="/location">
                <Box className="social__icons__wrapper">
                  <IconButton>
                    <LocationOn className="social__icons" />
                  </IconButton>
                  <Typography variant="span">Location :</Typography>
                  <Typography variant="span">
                    294, Herbert Macaulay, Yaba, Lagos, Nigeria
                  </Typography>
                </Box>
              </Link>
            </Box>
            <Box component="li">
              <Box>
                <Link href="/phone">
                  <Box className="social__icons__wrapper" x>
                    <IconButton>
                      <Phone className="social__icons" />
                    </IconButton>
                    <Typography variant="span">Contact :</Typography>
                    <Typography variant="span">07062029656</Typography>
                  </Box>
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box component="ul" className={styles.policy}>
          <li>
            {' '}
            <Link href="/privacy_policy">Privacy Policy</Link>
          </li>
          <li>
            {' '}
            <Link href="/terms_and_condition">Terms of Service</Link>
          </li>

          <li> &copy; 2022 Afiari</li>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
