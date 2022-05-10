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
} from '../../redux/general/generalAction';

const ProductCategory = () => {
  const { categories } = useSelector((state) => state.general);

  const { country } = useSelector((state) => state.auth);

  const [selected, setSelected] = useState('');

  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2rem',
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
          marginTop: '72px',
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
        }}
      />
      <List
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
        }}
      >
        {categories.map((item) => (
          <ListItem
            button
            sx={{
              background: selected === item.id ? '#0A503D' : '#fff',
              color: selected === item.id ? '#fff' : '#3a3a3a',
              '&:hover': {
                backgroundColor: '#0a3d30',
                color: '#fff',
              },
            }}
            className={styles.shop__filter__list}
            key={item.id}
            onClick={() => {
              setSelected(item.id);
              dispatch(getProductsByCategory(country, item.id));
              dispatch(setSelectedCategory(item.item_value));
            }}
          >
            <ListItemText
              primary={item.item_value}
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        ))}
        {/* <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Fresh Food"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Frozen Food"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Tubers"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Vegetables"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Grains"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link>
        <Link href="/">
          <ListItem button className={styles.shop__filter__list}>
            <ListItemText
              primary="Spices"
              classes={{ primary: styles.shop__filter__list }}
            />
          </ListItem>
        </Link> */}
      </List>
    </Box>
  );
};

export default ProductCategory;
