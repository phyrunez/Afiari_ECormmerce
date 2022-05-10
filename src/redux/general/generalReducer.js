import * as GeneralTypes from './generalTypes';

const initialState = {
  isLoading: false,
  countries: [],
  product: [],
  productCategory: [],
  categories: [],
  singleProduct: [],
  meta_data: {},
  cart_message: '',
  selectedCategory: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GeneralTypes.IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case GeneralTypes.GET_SERVICEABLE_COUNTRY:
      return {
        ...state,
        countries: action.payload,
      };
    case GeneralTypes.GET_ALL_PRODUCTS:
      return {
        ...state,
        product: action?.payload?.products,
        meta_data: action?.payload?.data,
      };
    case GeneralTypes.GET_PRODUCTS_BY_CATEGORY:
      return {
        ...state,
        productCategory: action?.payload?.productCategory,
        meta_data: action?.payload?.data,
      };
    case GeneralTypes.GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action?.payload?.product,
      };
    case GeneralTypes.GET_ALL_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case GeneralTypes.GET_SELECTED_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
