import * as StoreTypes from './storeTypes';
import { httpRequest } from '../../https/http';
import { toast } from 'react-toastify';
import { API_ROUTES } from '../../../constants/config';


export const getStores = ({ longitude, latitude, query }) => async (dispatch) => {
  try {
    const result = await httpRequest({
      url: `${API_ROUTES?.getStores?.route}?storeName=${query}&longitude=${longitude}&latitude=${latitude}`,
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
