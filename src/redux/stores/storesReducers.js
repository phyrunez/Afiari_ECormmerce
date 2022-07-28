import { 
  TOGGLE_MODAL, 
  GET_STORES, 
  STORE_SUGGESTIONS, 
  GET_STORE_PRODUCTS_BY_ID, 
  GET_STORE_PRODUCTS_BY_CATEGORY,
  SEARCHED,
  SET_INITIAL_METADATA,
  SEARCH_PRODUCT,
  GET_SELECTED_CATEGORY
} from './storeTypes';

const initialState = {
  toggleModalState: false,
  stores: [],
  storeProducts: [],
  storeProductCategory: [],
  meta_data: {},
  initial_meta_data: {},
  selectedCategory: '',
  searched: [],
  hasSearched: false,
  suggestions: [{ label: 'Current location', coords: null }],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_MODAL: 
      return {
        ...state,
        toggleModalState: !state.toggleModalState,
      };
    
    case GET_STORES: 
      // console.log(action.payload)
      return {
        ...state,
        stores: [...action.payload],
      };
    
    case STORE_SUGGESTIONS: 
      // console.log(action.payload)
      return {
        ...state,
        suggestions: [
          { label: 'Current location', coords: null },
          ...action.payload,
        ],
      };

    case SEARCHED:
      return {
        ...state,
        hasSearched: action.payload,
      };

    case GET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    case SEARCH_PRODUCT:
      return {
        ...state,
        searched: action.payload.product,
        meta_data: action.payload.data,
        hasSearched: true,
      };

    case SET_INITIAL_METADATA:
      return {
        ...state,
        meta_data: state.initial_meta_data,
      };
    
    case GET_STORE_PRODUCTS_BY_ID: 
      return {
        ...state,
        storeProducts: action?.payload?.storeProducts,
        meta_data: action?.payload?.data,
        initial_meta_data: action?.payload?.data
      };
    
    case GET_STORE_PRODUCTS_BY_CATEGORY: 
      return {
        ...state,
        storeProductCategory: action?.payload?.storeProductCategory,
        meta_data: action?.payload?.data,
        currentCategory: action?.payload?.categoryId,
      }
    default:
      return state;
  }
};

export default reducer;
