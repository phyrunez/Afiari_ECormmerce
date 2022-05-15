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
  testimonies: [],
  saved_testimony_message: '',
  comment: '',
  selectedProfileMenu: '',
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
    case GeneralTypes.GET_SELECTED_PROFILE_MENU:
      return {
        ...state,
        selectedProfileMenu: action.payload,
      };
    case GeneralTypes.SAVE__TESTIMONY:
      return {
        ...state,
        saved_testimony_message: action.payload,
      };
    case GeneralTypes.GET_TESTIMONY:
      return {
        ...state,
        testimonies: action.payload,
      };

    case GeneralTypes.USER_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
