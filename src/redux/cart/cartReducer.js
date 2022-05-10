import * as CartTypes from './cartTypes';

const initialState = {
  cart: [],
  cart_message: '',
  delete_cart_message: '',
  update: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CartTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case CartTypes.ADD_TO_CART:
      return {
        ...state,
        cart_message: action.payload,
      };

    case CartTypes.ADD_MULTIPLE_CART:
      return {
        ...state,
        cart_message: action.payload,
      };
    case CartTypes.GET_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case CartTypes.DELETE_CART:
      return {
        ...state,
        delete_cart_message: action.payload,
      };
    case CartTypes.UPDATE_CART:
      return {
        ...state,
        update: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
