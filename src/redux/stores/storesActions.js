import * as StoreTypes from './storeTypes';
import { httpRequest } from '../../https/http';
import { API_ROUTES } from '../../../constants/config';


// export const getShoppingHistory = () => async (dispatch) => {
//   try {
//     dispatch(setIsLoading(true));
//     const result = await httpRequest({
//       url: API_ROUTES?.shopping_history?.route,
//       method: API_ROUTES?.shopping_history?.method,
//       needToken: true,
//     });

//     console.log(result);

//     if (result?.status == true) {
//       dispatch({
//         type: ShoppingTypes?.GET__SHOPPING__HISTORY,
//         payload: result?.result,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: StoreTypes.TOGGLE_MODAL
  });
}
