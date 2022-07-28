import { TOGGLE_MODAL, GET_STORES, STORE_SUGGESTIONS } from './storeTypes';

const initialState = {
  toggleModalState: false,
  stores: [],
  suggestions: [{ label: 'Current location', coords: null }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: {
      return {
        ...state,
        toggleModalState: !state.toggleModalState,
      };
    }
    case GET_STORES: {
      // console.log(action.payload)
      return {
        ...state,
        stores: [...action.payload],
      };
    }
    case STORE_SUGGESTIONS: {
      // console.log(action.payload)
      return {
        ...state,
        suggestions: [
          { label: 'Current location', coords: null },
          ...action.payload,
        ],
      };
    }
    case GET_STORE_PRODUCTS_BY_ID: {
      return {
        ...state,
        product: action?.payload?.products,
        meta_data: action?.payload?.data,
        initial_meta_data: action?.payload?.data
      };
    } 
    default:
      return state;
  }
};

export default reducer;
