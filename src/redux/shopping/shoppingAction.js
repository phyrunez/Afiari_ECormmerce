import * as ShoppingTypes from './shoppingTypes';
import { httpRequest } from '../../https/http';
import { API_ROUTES } from '../../../constants/config';

export const setIsLoading = (value) => ({
  type: ShoppingTypes.SHOPPING__LOADING,
  payload: value,
});

export const getShoppingHistory = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.shopping_history?.route,
      method: API_ROUTES?.shopping_history?.method,
      needToken: true,
    });

    console.log(result);

    if (result?.status == true) {
      dispatch({
        type: ShoppingTypes?.GET__SHOPPING__HISTORY,
        payload: {
          shopping_history: result?.result,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateAddress = (address_id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.updateAddress?.route + address_id,
      method: API_ROUTES?.updateAddress?.method,
      needToken: true,
    });

    console.log(result);

    if (result?.status == true) {
      dispatch({
        type: ShoppingTypes?.UPDATE__ADDRESS,
        payload: {
          address: result,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};
