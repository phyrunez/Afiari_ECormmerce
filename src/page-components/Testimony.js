import { Grid, Box, IconButton, Typography } from '@mui/material';
import Image from 'next/image';
import { Star } from '@mui/icons-material';
import styles from '../../styles/Testimony.module.css';
import React from 'react';
import Slider from 'react-slick';
import { useState, useEffect, useRef } from 'react';
import leftArrow from '../../public/leftArrow.svg';
import rightArrow from '../../public/rightArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { getTestimony } from '../redux/general/generalAction';

const Testimony = () => {
  const { testimonies } = useSelector((state) => state.general);

  console.log(testimonies);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTestimony());
  }, []);

  const items = [
    {
      id: '08d9b9c5-0f91-4774-87ed-c7b75029ac53',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes1.svg'),
      rate: [1, 2, 3],
    },
    {
      id: '08d9b9c5-0f9d-4029-8565-b2841c3f5800',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes2.svg'),
      rate: [1, 2, 3, 4, 5],
    },
    {
      id: '08d9b9c5-0f9d-40a5-83ec-9646afd9bbdd',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes3.svg'),
      rate: [1, 2, 3, 4],
    },
    {
      id: '08d9b9c5-0f9d-40b4-8251-4a63e01079d2',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes1.svg'),
      rate: [1, 2, 3, 5],
    },
    {
      id: '08d9b9c5-0f9d-4296-8cf2-fdec45333d9d',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes2.svg'),
      rate: [1, 2, 3],
    },
    {
      id: '08d9b9c5-0f9d-42a9-833e-c7f522348f2e',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes3.svg'),
      rate: [1, 2, 3, 4],
    },
    {
      id: '08d9b9c5-0f9d-42b5-83ee-e18683975286',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes1.svg'),
      rate: [1, 2],
    },
    {
      id: '08d9b9c5-0f9d-42c0-88b9-2166e2b98714',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes2.svg'),
      rate: [1, 2, 3],
    },
    {
      id: '08d9be6f-c878-4de7-89cb-96c2fa192391',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes1.svg'),
      rate: [1, 2, 3],
    },
    {
      id: '08d9be6f-c896-405b-8ea6-cfcabf3308cd',
      name: 'Product Category',
      value:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas dolore quisquam in sit at nostrum impedit molestiae molestias id laudantium porro doloribus facere magni, officiis fuga! Iusto soluta atque eum.',
      image: require('../../public/tes2.svg'),
      rate: [1, 2, 3],
    },
  ];

  const PrevBtn = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={leftArrow} alt="previous buttton" width={20} height={30} />
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, style, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <Image src={rightArrow} alt="next buttton" width={20} height={20} />
      </div>
    );
  };

  const Card = ({ src, details, star }) => {
    return (
      <div className={styles.top}>
        {src && <img src={src} alt="profile" width={80} height={80} />}
        <div className={styles.star}>{star} </div>

        <p className={styles.p}>{details}</p>
      </div>
    );
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
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

  return (
    <div
      style={{
        width: '100%',
        padding: '20px 80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'column',
        padding: '5rem',
      }}
    >
      <Typography variant="h4" className={styles.testimony_details}>
        Feedback
      </Typography>

      <Typography
        variant="p"
        sx={{
          fontStyle: 'normal',
          fontWeight: '400',
          fontSize: '20px',
          textAlign: 'center',
          marginBottom: '3rem',
          width: '314px',
          color: '#3A3A3A',
        }}
      >
        What our customers are saying
      </Typography>
      <div
        style={{
          textAlign: 'center',
          width: '100%',
        }}
      >
        <Slider {...settings} prevArrow={<PrevBtn />} nextArrow={<NextBtn />}>
          {testimonies.map((item, i) => (
            <Card
              key={item.id}
              src={item.picture ? item.picture : '/tes2.svg'}
              details={item.comment}
              star={[...Array(item.stars)].map((r, i) => (
                <IconButton
                  key={i}
                  sx={{
                    height: '40px',
                  }}
                >
                  <Star />
                </IconButton>
              ))}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Testimony;
