import React from 'react';
import Image from 'next/image';
import { Grid, Typography, IconButton, Box } from '@mui/material';
import cart from '../../public/cart.svg';
import { useState, useEffect } from 'react';
import styles from '../../styles/Input.module.css';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../redux/slice/ProductSlice';
import { getServiceableCountry } from '../redux/slice/ProductSlice';

const Header = () => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [showCountry, setShowCountry] = useState(false);
  const [src, setSrc] = useState([]);

  const { countries } = useSelector((state) => state?.general);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getServiceableCountry());
  }, [dispatch, getServiceableCountry]);

  const myLoader = ({ src }) => {
    return src;
  };

  const handleClick = () => {
    if (!showCountry) setShowCountry(true);
    else setShowCountry(false);
  };

  return (
    <Grid
      container
      sx={{
        justifyContent: { xs: 'center', md: 'center' },
        alignItems: { xs: 'center', lg: 'flex-start' },
        width: '100%',
        padding: { xs: '0 0', md: '3rem 0rem' },
        height: { xs: '400px', md: 'auto' },
      }}
    >
      <Grid
        item
        sx={{
          width: { lg: 'auto', md: '40%' },
          order: { md: '2' },
          display: { xs: 'none', md: 'flex' },
          // border: '1px solid red',
        }}
      >
        <Box
          sx={
            {
              // width: '100%',
              // height: '100%',
              // border: '1px solid red',
            }
          }
        >
          {cart && (
            <Image src={cart} alt="cart logo" width={550} height={450} />
          )}
        </Box>
      </Grid>

      <Grid
        item
        // container
        sx={{
          justifyItems: 'flex-end',
          alignContent: 'center',
          order: { md: '1' },
          backgroundImage: { xs: 'url("/cart.svg")', md: 'none' },
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          width: { xs: '100%', md: 'auto' },
          height: '100%',
          // border: '1px solid red',
        }}
      >
        <Box
          // item
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
            justifyContent: { xs: 'center', md: 'flex-start' },
            background: { xs: 'rgba(10, 80, 61, 0.75)', md: 'none' },
            width: '100%',
            height: '100%',
            padding: { lg: '78px 0px' },
          }}
        >
          {/* ////////////////////// THE SELECT COUNTRY CUSTOM SELECT DIV /////////////////////////////////// */}
          <Box
            sx={{
              position: { xs: 'absolute', md: 'relative' },
              top: { xs: '73px', md: '0' },
              left: { xs: '1rem', md: '0' },
            }}
          >
            <div
              value={selectedCountry}
              onChange={(e) => e.target.value}
              className={styles.select_country_wrapper}
              onClick={handleClick}
            >
              <div
                name="country"
                className={styles.select_country_input_text}
                contentEditable="false"
                suppressContentEditableWarning={true}
              >
                {showCountry === false &&
                  selectedCountry === '' &&
                  countries
                    .filter((country) => country?.item_value === 'Nigeria')
                    .map((country, i) => {
                      setSrc(country?.item_image_url);
                      setSelectedCountry(country?.item_value);

                      localStorage.setItem(
                        'selectedCountry',
                        JSON.stringify({
                          id: country?.id,
                          name: country?.item_value,
                        })
                      );
                    })}
                {showCountry === true && (
                  <div
                    className={styles.select_country_list__wrapper}
                    contentEditable="false"
                    suppressContentEditableWarning={true}
                  >
                    {countries.map((country, key) => (
                      <div
                        className={styles.select_country_list__items}
                        value={selectedCountry}
                        key={country.id}
                        onClick={(e) => {
                          e.preventDefault();
                          setSrc(country.item_image_url);
                          setSelectedCountry(country.item_value);

                          localStorage.setItem(
                            'selectedCountry',
                            JSON.stringify({
                              id: country.id,
                              name: country.item_value,
                            })
                          );
                        }}
                      >
                        {country.item_image_url && (
                          <Image
                            loader={myLoader}
                            className={styles.img_flag}
                            src={country.item_image_url}
                            alt=""
                            width={30}
                            height={30}
                            unoptimized={true}
                          />
                        )}
                        {country.item_value}
                      </div>
                    ))}
                  </div>
                )}

                {src && (
                  <img
                    // loader={myLoader}
                    className={styles.img_flag_div}
                    src={src}
                    alt=""
                    width={50}
                    height={40}
                  />
                )}

                {showCountry === true ? (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <ArrowDropUp />
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      position: 'absolute',
                      right: 0,
                    }}
                  >
                    <ArrowDropDown />
                  </IconButton>
                )}
              </div>
            </div>
          </Box>

          {/* ////////////////////// END OF THE SELECT COUNTRY CUSTOM SELECT DIV /////////////////////////////////// */}

          {/* ////////////////////// HEADER TITLE TEXT FOR LANDING PAGE /////////////////////////////////// */}
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: { xs: '39px', md: '48px' },
              lineHeight: { xs: '57px', md: '70px' },
              letterSpacing: { xs: '0.06em', lg: '0.15em' },
              textAlign: { xs: 'center', md: 'justify' },
              color: { md: '#000000', xs: ' #FFFFFF' },
              marginTop: { xs: '15px', lg: '40px' },
              marginButtom: '8px',
              width: { xs: '300px', sm: '350px', md: '450px', lg: '550px' },
              // border: '1px solid red',
            }}
            variant="h1"
          >
            We give you the best QUALITY
          </Typography>
          <Typography
            sx={{
              fontStyle: 'normal',
              fontWeight: { xs: '700', md: '400' },
              fontSize: { xs: '10px', md: '20px' },
              lineHeight: { xs: '11px', md: '27px' },
              letterSpacing: ' 0.15em',
              color: { xs: '#fff', md: '#3a3a3a' },
              display: 'flex',
              justifyContent: 'center',
              marginTop: { xs: '8px', md: '30px' },
            }}
            variant="p"
          >
            Buy all your food items at your convenience
          </Typography>

          {/* ////////////////////// END OF HEADER TITLE TEXT FOR LANDING PAGE /////////////////////////////////// */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Header;
