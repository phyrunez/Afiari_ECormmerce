import * as ShoppingTypes from './shoppingTypes';

const initialState = {
  shopping_history: [],
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
        shopping_history: action.payload.shopping_history,
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
