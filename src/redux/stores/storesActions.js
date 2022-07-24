import * as StoreTypes from './storeTypes';
import { httpRequest } from '../../https/http';
import { toast } from 'react-toastify';
import { API_ROUTES } from '../../../constants/config';


export const getStores = ({ longitude, latitude, query, useQuery }) => async (dispatch) => {
  try {
    const result = await httpRequest({
      url: `${API_ROUTES?.getStores?.route}?longitude=${longitude}&latitude=${latitude}${useQuery ? 'storeName='+query :''}`,
      // url: `${API_ROUTES?.getStores?.route}?storeName=a`,
      method: API_ROUTES?.getStores?.method,
      needToken: false,
    });

    // console.log(result);

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

export const clearStores = () => (dispatch) => {
  dispatch({
    type: StoreTypes.CLEAR_STORES,
  });
};

export const getSuggestions = (query) => async (dispatch) => {
  const result = await httpRequest({
    url: `/api/place/suggestions?query=${query}`,
    // url: `${API_ROUTES?.getStores?.route}?storeName=a`,
    method: 'GET',
    needToken: false,
  });
  
  dispatch({
    type: StoreTypes.STORE_SUGGESTIONS,
    payload: result
  });
};
