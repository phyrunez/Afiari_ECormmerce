import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_ROUTES, authToken } from '../../constants/config';
import { LOGIN_SUCCESS } from '../redux/auth/authTypes';
import { httpRequest } from '../https/http';
import * as AuthTypes from '../redux/auth/authTypes';
import {
  getAllCategories,
  getAllCountries,
  getAllProducts,
} from '../redux/general/generalAction';
import { addMultipleCart, getCart } from '../redux/cart/cartAction';
import { useCart } from 'react-use-cart';

function AuthProvider({ children }) {
  const { isLogged_in, country, loading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { emptyCart } = useCart();

  const fectchProfile = async () => {
    const token = localStorage.getItem(authToken);

    if (token) {
      const result = await httpRequest({
        url: API_ROUTES.userInfo.route,
        method: API_ROUTES.userInfo.method,
        needToken: true,
      });

      console.log(result);

      if (result?.status === true) {
        dispatch({
          type: AuthTypes.GET_CURRENT_USER,
          payload: { ...result?.result[0] },
        });
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem(authToken)) {
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: true,
      });
    }
    let PageNumber = 1;

    dispatch(getAllCountries());

    dispatch(getAllCategories());

    dispatch(getAllProducts(country, PageNumber));
    // dispatch(getCart());
  }, [dispatch, getAllCountries, getAllCategories, getAllProducts]);

  useEffect(() => {
    if (isLogged_in) {
      fectchProfile();
      const items = JSON.parse(localStorage.getItem('react-use-cart'));

      const cart = () => {
        const newCart = items.items.map((item) => {
          return {
            productId: item.id,
            productQuantity: item.quantity,
          };
        });
        return newCart;
      };
      cart();
      if (items) {
        dispatch(addMultipleCart(country, cart()));
        dispatch(getCart());
        emptyCart();
      }
    }
  }, [isLogged_in, dispatch, getCart, addMultipleCart]);

  return <Fragment>{children}</Fragment>;
}

export default AuthProvider;
