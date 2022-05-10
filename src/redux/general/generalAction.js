import { API_ROUTES } from '../../../constants/config';
import * as GeneralTypes from './generalTypes';
import { httpRequest } from '../../https/http';

export const setIsLoading = (value) => ({
  type: GeneralTypes.IS_LOADING,
  payload: value,
});

export const setSelectedCategory = (value) => ({
  type: GeneralTypes.GET_SELECTED_CATEGORY,
  payload: value,
});

export const getAllCountries = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES.serviceableCountries.route,
      method: API_ROUTES.serviceableCountries.method,
      needToken: false,
    });

    if (response?.status === true) {
      dispatch({
        type: GeneralTypes?.GET_SERVICEABLE_COUNTRY,
        payload: response.result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES.allCategories.route,
      method: API_ROUTES.allCategories.method,
      needToken: false,
    });

    if (response?.status === true) {
      dispatch({
        type: GeneralTypes?.GET_ALL_CATEGORIES,
        payload: response.result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllProducts =
  (country_id, PageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.allGeneralMarket.route}${country_id}&page_number=${PageNumber}`,
        method: API_ROUTES.allGeneralMarket.method,
        needToken: false,
      });

      if (response?.status === true) {
        dispatch({
          type: GeneralTypes?.GET_ALL_PRODUCTS,
          payload: {
            products: response.result,
            data: response?.meta_data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getProductsByCategory =
  (country_id, category_id, PageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.categoryMarket?.route}/${category_id}?service_country=${country_id}&page_number=${PageNumber}`,
        method: API_ROUTES?.categoryMarket?.method,
        needToken: false,
      });

      if (response?.status === true) {
        dispatch({
          type: GeneralTypes?.GET_PRODUCTS_BY_CATEGORY,
          payload: {
            productCategory: response?.result,
            data: response?.meta_data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getSingleProduct =
  (product_id, country_id) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.singleProduct.route}${product_id}?service_country=${country_id}`,
        method: API_ROUTES.singleProduct.method,
        needToken: false,
      });

      if (response?.status === true) {
        dispatch({
          type: GeneralTypes?.GET_SINGLE_PRODUCT,
          payload: {
            product: response.result,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
