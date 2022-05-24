import * as ShoppingTypes from './shoppingTypes';

const initialState = {
  shoppingHistory: [],
  user_address: [],
  loading: false,
  address: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ShoppingTypes.SHOPPING__LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ShoppingTypes.GET__SHOPPING__HISTORY:
      return {
        ...state,
        shoppingHistory: action.payload,
      };

    case ShoppingTypes.UPDATE__ADDRESS:
      return {
        ...state,
        address: action.payload.address,
      };

    default:
      return state;
  }
};

export default reducer;
