import {
  Box,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import React, { useState } from 'react';
import styles from '../../../styles/Shop.module.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductsByCategory,
  setSelectedCategory,
  setSearched,
  getAllProducts,
} from '../../redux/general/generalAction';

const ProductCategory = ({setIsLoading}) => {
  const { categories } = useSelector((state) => state.general);

  const { country } = useSelector((state) => state.auth);

  const [pageNumber, setPageNumber] = useState(1);

  const [selected, setSelected] = useState('all');

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2rem',
        h: '100%',
        height: '100%',
        paddingTop: '2rem',
        // border: '1px solid red',
      }}
    >
      <Typography
        variant="h6"
        sx={{
          fontStyle: 'normal',
          fontWeight: '600',
          fontSize: '21px',
          lineHeight: ' 42px',
          textAlign: 'center',
          color: ' #3A3A3A',
          // marginTop: '72px',
          marginBottom: '9px',
        }}
      >
        Product Category
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontStyle: 'normal',
          fontWeight: '300',
          fontSize: '18px',
          lineHeight: '27px',
          textAlign: 'center',
          color: 'rgba(0, 0, 0, 0.7)',
          marginBottom: '16px',
        }}
      >
        Select a category
      </Typography>
      <Divider
        sx={{
          border: '1px solid #E6E6E',
          marginBottom: '1rem',
        }}
      />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 'auto',
          overflowX: 'hidden',
          marginTop: '0 !important'
        }}
        className={styles.cart__warraper}
      >
        <ListItem
          sx={{
            cursor: 'pointer',
            background: '#fff',
            color: selected === 'all' ? '#0A503D' : '#3a3a3a',
            // fontWeight: selected === item.id ? '800' : 'normal',
            // fontSize: selected === item.id ? '20rem' : '30px',
            '&:hover': {
              backgroundColor: '#fff',
              color: selected === "all" ? '#0A503D' : '#3a3a3a',
              transform: 'scale(2rem)',
              fontSize: '40px',
            },
          }}
          className={
            selected === "all"
              ? styles.shop__filter__list__active
              : styles.shop__filter__list
          }
          key="all"
          onClick={() => {
            const countryId = JSON.parse(
              localStorage.getItem('selectedCountry')
            );
            setSelected("all");
            dispatch(setSelectedCategory(""));
            dispatch(setSearched(false));
            setIsLoading(true);
            dispatch(getAllProducts(countryId?.id, 1))
          }}
        >
          <ListItemText
            primary='All Products'
            classes={{
              primary:
                selected === 'all'
                  ? styles.shop__filter__list__active
                  : styles.shop__filter__list,
            }}
          />
        </ListItem>
        {categories.map((item) => (
          <ListItem
            sx={{
              cursor: 'pointer',
              background: '#fff',
              color: selected === item.id ? '#0A503D' : '#3a3a3a',
              // fontWeight: selected === item.id ? '800' : 'normal',
              // fontSize: selected === item.id ? '20rem' : '30px',
              '&:hover': {
                backgroundColor: '#fff',
                color: selected === item.id ? '#0A503D' : '#3a3a3a',
                transform: 'scale(2rem)',
                fontSize: '40px',
              },
            }}
            className={
              selected === item.id
                ? styles.shop__filter__list__active
                : styles.shop__filter__list
            }
            key={item.id}
            onClick={() => {
              const countryId = JSON.parse(
                localStorage.getItem('selectedCountry')
              );
              setSelected(item.id);
              setIsLoading(true);
              dispatch(getProductsByCategory(countryId?.id, item.id));
              dispatch(setSelectedCategory(item.item_value));
              dispatch(setSearched(false));
            }}
          >
            <ListItemText
              primary={item.item_value}
              classes={{
                primary:
                  selected === item.id
                    ? styles.shop__filter__list__active
                    : styles.shop__filter__list,
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default ProductCategory;
