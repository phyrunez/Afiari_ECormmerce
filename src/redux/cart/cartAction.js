import * as CartTypes from './cartTypes';
import { httpRequest } from '../../https/http';
import { API_ROUTES } from '../../../constants/config';

export const setIsLoading = (value) => ({
  type: CartTypes.IS_LOADING,
  payload: value,
});

export const getCart = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.getCart?.route,
      method: API_ROUTES?.getCart?.method,

      needToken: true,
    });

    if (response?.status === true) {
      dispatch({
        type: CartTypes?.GET_CART,
        payload: {
          cart: response?.result,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addCart = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.addToCart?.route + data.country,
      method: API_ROUTES?.addToCart?.method,
      body: { productId: data.id, productQuantity: 1 },
      needToken: true,
    });

    if (response?.status === true) {
      console.log('added to cart');
      dispatch({
        type: CartTypes?.ADD_TO_CART,
        payload: {
          cart_message: response?.success_message,
        },
      });

      dispatch(getCart());
    }
  } catch (error) {
    console.log(error);
  }
};

export const addMultipleCart = (data, cart) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const response = await httpRequest({
      url: API_ROUTES?.addMultipleCart?.route + data,
      method: API_ROUTES?.addMultipleCart?.method,
      body: [...cart],
      needToken: true,
    });

    if (response?.status === true) {
      dispatch({
        type: CartTypes?.ADD_MULTIPLE_CART,
        payload: {
          payload: response?.success_message,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleDelete = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const response = await httpRequest({
      url: API_ROUTES?.deleteCart?.route + data.id,
      method: API_ROUTES?.deleteCart?.method,
      needToken: true,
    });

    if (response?.status === true) {
      console.log('deleted cart');
      dispatch({
        type: CartTypes?.DELETE_CART,
        payload: response?.result,
      });
      dispatch(getCart());
    }
  } catch (error) {
    console.log(error);
  }
};

export const handleUpdate = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const response = await httpRequest({
      url:
        API_ROUTES?.updateCart?.route +
        data.id +
        `?service_country=${data.country}`,
      method: API_ROUTES?.updateCart?.method,
      needToken: true,
      body: {
        productId: data.product_id,
        productQuantity: data.quantity,
      },
    });

    if (response?.status === true) {
      console.log('updated cart');
      dispatch({
        type: CartTypes?.UPDATE_CART,
        payload: response?.success_message,
      });

      dispatch(getCart());
    }
  } catch (error) {
    console.log(error);
  }
};
