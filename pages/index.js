import { Box, Typography, Skeleton } from '@mui/material';
import Image from 'next/image';
import Card from '../src/page-components/Card';
import Categories from '../src/page-components/Categories';
import Footer from '../src/page-components/Footer';
import Header from '../src/page-components/Header';
import Navbar from '../src/shared-components/navbar/Navbar';
import ServicesNavbar from '../src/shared-components/navbar/ServicesNavbar';
import Testimony from '../src/page-components/Testimony';
import afiari__bus from '../public/afiari__bus.svg';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getTestimony } from '../src/redux/general/generalAction';

const Home = () => {
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Navbar />
      <ServicesNavbar />
      <Header />
      <Categories />
      <Box
        sx={{
          padding: '5rem 3.5rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '25px',
            lineHeight: '22px',
            textAlign: 'center',
            marginBottom: '54px',
            color: ' #000000',
          }}
        >
          We ALWAYS want to serve you better
        </Typography>
        <Card />
      </Box>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-evenly' },
          flexDirection: 'row',
          // padding: "51px 27px",
          width: '100%',
          height: '20rem',
          backgroundImage: { xs: 'url("/afiari__bus.svg")', md: 'none' },
          background: { md: ' #E8FFF9' },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          padding: { xs: '0px', md: '15rem 3rem' },
        }}
      >
        <Typography
          variant="p"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: 'center',
            textAlign: { xs: 'center', md: 'justify' },
            fontStyle: 'normal',
            fontWeight: '600',
            fontSize: { xs: '20px', md: '39px' },
            color: { xs: ' #FFFFFF', md: '#3a3a3a' },
            lineHeight: '53px',
            width: { md: '581px', xs: '100%' },
            background: { xs: ' rgba(0, 34, 25, 0.824)', md: 'none' },
            height: { xs: '100%', md: 'auto' },
          }}
        >
          We deliver all your food items to your location in 24 HOURS
        </Typography>
        <Box
          component="div"
          sx={{
            display: { xs: 'none', md: 'flex' },
          }}
        >
          <Image src={afiari__bus} alt="afiari bus" width={739} height={280} />
        </Box>
      </Box>
      <Testimony />
      {/* <Footer /> */}
    </Box>
  );
};

export default Home;
