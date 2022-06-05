import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { API_ROUTES, authToken } from '../../constants/config';
import { httpRequest } from '../https/http';
import * as AuthTypes from '../redux/auth/authTypes';
import {
  getAllCategories,
  getAllCountries,
  getAllProducts,
  getTestimony,
} from '../redux/general/generalAction';
import { addMultipleCart, getCart } from '../redux/cart/cartAction';
import { useCart } from 'react-use-cart';
import { getShoppingHistory } from '../redux/shopping/shoppingAction';
import { getDialCode } from '../redux/checkout/checkoutAction';
import { setUserCountry } from '../redux/auth/authAction';

function AuthProvider({ children }) {
  const { isLogged_in, country, loading } = useSelector((state) => state.auth);
  const { countries } = useSelector((state) => state?.general);

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

    const countryId = JSON.parse(localStorage.getItem('selectedCountry'));

    dispatch(setUserCountry(countryId?.id));

    dispatch(getAllCountries());

    dispatch(getAllCategories());

    dispatch(getDialCode());

    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    if (isLogged_in) {
      fectchProfile();
      // dispatch(getShoppingHistory());
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
        setTimeout(() => {
          const countryId = JSON.parse(localStorage.getItem('selectedCountry'));
          dispatch(addMultipleCart(countryId.id, cart()));
        }, 4000);
        dispatch(getCart());
        emptyCart();
      }
    }
  }, [isLogged_in, dispatch, emptyCart]);

  return <Fragment>{children}</Fragment>;
}

export default AuthProvider;
