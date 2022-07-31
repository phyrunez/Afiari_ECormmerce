import {
    Box,
    Divider,
    Typography,
    List,
    ListItem,
    ListItemText,
  } from '@mui/material';
  import React, { useEffect, useState } from 'react';
  import styles from '../../../styles/Shop.module.css';
  import Link from 'next/link';
  import { useDispatch, useSelector } from 'react-redux';
  import { useRouter } from 'next/router'
  import {
    getStoreProductsByCategory,
    setSelectedCategory,
    setSearched,
    getAllStoreProducts,
  } from '../../redux/stores/storesActions';
  
  const ProductCategory = ({setIsLoading}) => {
    const { categories } = useSelector((state) => state.stores);
  
    const { country } = useSelector((state) => state.auth);
  
    const [pageNumber, setPageNumber] = useState(1);
  
    const [selected, setSelected] = useState('all');
  
    const dispatch = useDispatch();

    const router = useRouter();

    // useEffect(() => {
    //   if (router.asPath !== router.route) {
    //     const categoryId = JSON.parse(
    //       localStorage.getItem('selectedCountry')
    //     );
    //     const storeId = router.query.id;
    //     // const categoryId = router.query.id;
    //     dispatch(getStoreProductsByCategory(categoryId.id, storeId))
    //   }
    // },[router])
  
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
              const storeId = router.query.id;
              setSelected("all");
              dispatch(setSelectedCategory(""));
              dispatch(setSearched(false));
              setIsLoading(true);
              dispatch(getAllStoreProducts(storeId, pageNumber))
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
                const storeId = router.query.id;
                setSelected(item.id);
                setIsLoading(true);
                dispatch(getStoreProductsByCategory(countryId.id, item.id, storeId));
                dispatch(setSelectedCategory(item.item_value));
                dispatch(setSearched(false));
                // setIsLoading(false);
                console.log(item.id)
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
  