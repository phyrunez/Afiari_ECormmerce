import { API_ROUTES } from '../../../constants/config';
import * as GeneralTypes from './generalTypes';
import { httpRequest } from '../../https/http';

export const handleUserInput = (name, value) => ({
  type: GeneralTypes.USER_INPUT,
  payload: {
    name: name,
    value: value,
  },
});

export const setIsLoading = (value) => ({
  type: GeneralTypes.IS_LOADING,
  payload: value,
});

export const setSelectedCategory = (value) => ({
  type: GeneralTypes.GET_SELECTED_CATEGORY,
  payload: value,
});
export const getSelectedProfileMenu = (value) => ({
  type: GeneralTypes.GET_SELECTED_PROFILE_MENU,
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

    response?.result
      ?.filter((country) => country?.item_value === 'Nigeria')
      .map((country, i) => {
        localStorage.setItem(
          'selectedCountry',
          JSON.stringify({
            id: country?.id,
            name: country?.item_value,
          })
        );
      });

    // localStorage.setItem('selectedCountry', JSON.stringify());

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

export const saveTestimony = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.testimony?.route,
      method: API_ROUTES?.testimony.method,
      needToken: true,
      body: { ...data },
    });

    console.log(response);

    if (response?.status === true) {
      dispatch({
        type: GeneralTypes?.SAVE__TESTIMONY,
        payload: response,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getTestimony = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.getTestimony?.route,
      method: API_ROUTES?.getTestimony.method,
    });

    if (response?.status === true) {
      dispatch({
        type: GeneralTypes?.GET_TESTIMONY,
        payload: response.result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getSearchProduct =
  (text, country, page_number) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${
          API_ROUTES?.searchProduct?.route + text
        }&service_country=${country}&page_number=${page_number}`,
        method: API_ROUTES?.searchProduct.method,
      });

      if (response?.status === true) {
        dispatch({
          type: GeneralTypes?.SEARCH_PRODUCT,
          payload: response.result,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
