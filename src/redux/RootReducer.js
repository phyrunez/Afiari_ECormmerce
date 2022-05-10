import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import generalReducer from './general/generalReducer';
import checkoutReducer from './checkout/checkoutReducer';
import cartReducer from './cart/cartReducer';

export default combineReducers({
  auth: authReducer,
  general: generalReducer,
  checkout: checkoutReducer,
  cart: cartReducer,
});
