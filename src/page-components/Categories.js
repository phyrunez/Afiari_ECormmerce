import { useState, useEffect } from 'react';
import { Typography } from '@mui/material';
import Image from 'next/image';
import styles from '../../styles/Categories.module.css';
import Slider from 'react-slick';
import { getProductCategory, reset } from '../redux/slice/ProductSlice';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  getProductsByCategory,
  setSelectedCategory,
} from '../redux/general/generalAction';

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.general);

  const { country, isLogged_in } = useSelector((state) => state?.auth);
  // useEffect(() => {
  //   dispatch(getProductsByCategory());
  // }, [dispatch]);

  // useEffect(() => {
  //   if (isSuccess) {
  //     dispatch(reset());
  //   }
  // }, [dispatch, isSuccess, reset]);

  //////////////////////////// CUSTOMIZING SOME SETTINGS ON THE REACT-SLICK SLIDER //////////////////////////

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  //////////////////////////// END OF CUSTOMIZING SOME SETTINGS ON THE REACT-SLICK SLIDER //////////////////////////

  //////////////////////////// CUSTOMIZING THE NEXT AND PREV BUTTON ON THE REACT-SLICK SLIDER //////////////////////////

  //1. PREV BUTTON
  const PrevBtn = (props) => {
    const { className, style, onClick } = props;

    return (
      <div
        className={className}
        style={{ ...style, display: 'block' }}
        onClick={onClick}
      >
        <Image
          src="/leftArrow.svg"
          alt="previous buttton"
          width={20}
          height={20}
          style={{
            color: '#000',
          }}
        />
      </div>
    );
  };

  //2. NEXT BUTTON
  const NextBtn = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{
          display: 'block',
          background: ' #E8FFF9  ',
          // color: 'red',
          borderRadius: 'none',
        }}
      >
        <Image
          src="/rightArrow.svg"
          alt="next buttton"
          width={20}
          height={20}
        />
      </div>
    );
  };

  //////////////////////////// END OF CUSTOMIZING THE NEXT AND PREV BUTTON ON THE REACT-SLICK SLIDER //////////////////////////

  // //////////////////////////// THE CARD FOR DISPLAYINY EACH CATEGORY //////////////////////////
  const Card = ({ src, details, router, item }) => {
    return (
      <div
        className={styles.top}
        onClick={() => {
          dispatch(setSelectedCategory(details)),
            dispatch(getProductsByCategory(country, item));
          router.push({ pathname: '/shop', state: { category: item } });
        }}
      >
        <Image
          loader={() => src}
          src={src}
          alt="profile"
          width={180}
          height={272}
          className={styles.img}
          unoptimized={true}
        />

        <p className={styles.p}>{details}</p>
      </div>
    );
  };

  const router = useRouter();

  //////////////////////////// END OF THE CARD FOR DISPLAYINY EACH CATEGORY //////////////////////////

  return (
    <>
      <div
        style={{
          width: '100%',
          padding: '20px 10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          background: '#E8FFF9',
          // marginTop: '1rem',
          padding: '3rem 0rem',
        }}
      >
        <Typography
          variant="h4"
          className={styles.categories_heading}
          sx={{
            width: '100%',
            fontSize: { md: '29px', xs: '16px' },
          }}
        >
          Start shopping from our wide range of categories
        </Typography>

        <div
          className={styles.foo}
          style={{
            textAlign: 'center',
            width: '70%',
          }}
        >
          <Slider {...settings} prevArrow={<PrevBtn />} nextArrow={<NextBtn />}>
            {categories.map((item, i) => (
              <Card
                key={item.id}
                src={item.item_image_url}
                details={item.item_value}
                router={router}
                item={item.id}
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Categories;
