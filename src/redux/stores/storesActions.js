import * as StoreTypes from './storeTypes';
import { httpRequest } from '../../https/http';
import { toast } from 'react-toastify';
import { API_ROUTES } from '../../../constants/config';


export const getStores = ({ longitude, latitude, query, useQuery }) => async (dispatch) => {
  try {
    const result = await httpRequest({
      // url: `${API_ROUTES?.getStores?.route}?longitude=${longitude}&latitude=${latitude}${useQuery ? 'storeName='+query :''}`,
      url: `${API_ROUTES?.getStores?.route}?longitude=""&latitude=""`,
      method: API_ROUTES?.getStores?.method,
      needToken: false,
    });

    console.log(result);

    if (result && result?.status == true) {
      dispatch({
        type: StoreTypes?.GET_STORES,
        payload: result?.result,
      });
    }else {
      toast.error(result.err_message)
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: StoreTypes.TOGGLE_MODAL
  });
}

export const getSuggestions = (query) => async (dispatch) => {
  let result = await fetch(`${`/api/places/suggestions?query=${query}`}`);
  result = await result.json()
  // console.log(result)
  
  dispatch({
    type: StoreTypes.STORE_SUGGESTIONS,
    payload: result
  });
};

export const getAllProducts =
  (store_id) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.getStoreProductsById.route}/${store_id}`,
        method: API_ROUTES.getStoreProductsById.method,
        needToken: false,
      });

      if (response?.status === true) {
        dispatch({
          type: StoreTypes?.GET_STORE_PRODUCTS_BY_ID,
          payload: {
            products: response.result,
            data: response?.meta_data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };