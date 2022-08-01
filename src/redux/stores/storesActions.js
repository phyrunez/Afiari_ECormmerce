import { API_ROUTES } from '../../../constants/config';
import * as StoreTypes from './storeTypes';
import { httpRequest } from '../../https/http';

export const handleUserInput = (name, value) => ({
  type: StoreTypes.USER_INPUT,
  payload: {
    name: name,
    value: value,
  },
});

export const setIsLoading = (value) => ({
  type: StoreTypes.IS_LOADING,
  payload: value,
});

export const setSelectedCategory = (value) => ({
  type: StoreTypes.GET_SELECTED_CATEGORY,
  payload: value,
});

export const getSelectedProfileMenu = (value) => ({
  type: StoreTypes.GET_SELECTED_PROFILE_MENU,
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
        type: StoreTypes?.GET_SERVICEABLE_COUNTRY,
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
        type: StoreTypes?.GET_ALL_CATEGORIES,
        payload: response.result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

// export const getProductsByCategory =
//   (country_id, category_id, PageNumber = 1) =>
//   async (dispatch) => {
//     try {
//       dispatch(setIsLoading(true));
//       const response = await httpRequest({
//         url: `${API_ROUTES?.categoryMarket?.route}/${category_id}?service_country=${country_id}&page_number=${PageNumber}`,
//         method: API_ROUTES?.categoryMarket?.method,
//         needToken: false,
//       });

//       if (response?.status === true) {
//         dispatch({
//           type: StoreTypes?.GET_PRODUCTS_BY_CATEGORY,
//           payload: {
//             productCategory: response?.result,
//             data: response?.meta_data,
//             categoryId: category_id,
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

export const getSingleProduct =
  (product_id, country_id) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.singleProduct.route}${product_id}?service_country=${country_id}`,
        method: API_ROUTES.singleProduct.method,
        needToken: false,
      });

      const reviewResponse = await httpRequest({
        url: `${API_ROUTES?.shouldReview.route}${product_id}`,
        method: API_ROUTES.shouldReview.method,
        needToken: true,
      });

      if (response?.status === true) {
        dispatch({
          type: StoreTypes?.GET_SINGLE_PRODUCT,
          payload: {
            product: response.result,
          },
        });
      }

      if (reviewResponse?.status === true) {
        dispatch({
          type: StoreTypes?.SET_SHOULD_REVIEW,
          payload:  reviewResponse.result[0],
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
        type: StoreTypes?.SAVE__TESTIMONY,
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
        type: StoreTypes?.GET_TESTIMONY,
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
          type: StoreTypes?.SEARCH_PRODUCT,
          payload: {
            product: response.result,
            data: response?.meta_data,
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

export const setSearched = (searched) => async (dispatch) => {
  dispatch({
    type: StoreTypes?.SEARCHED,
    payload: searched,
  });
};

export const setInitialMetaData = () => async (dispatch) => {
  dispatch({
    type: StoreTypes?.SET_INITIAL_METADATA,
  });
};

export const getStores = ({ longitude, latitude, query, useQuery }) => async (dispatch) => {

  try {
    const result = await httpRequest({
      url: useQuery ? 
        `${API_ROUTES?.searchStore?.route}?longitude=${longitude}&latitude=${latitude}&storeName=${query}` 
        : `${API_ROUTES?.getStores?.route}?longitude=${longitude}&latitude=${latitude}`,
      // url: `${API_ROUTES?.getStores?.route}?longitude=${longitude}&latitude=${latitude}${useQuery ? 'storeName='+query :''}`,
      // url: `${API_ROUTES?.getStores?.route}?longitude=1&latitude=1`,
      method: API_ROUTES?.getStores?.method,
      needToken: false,
    });

    console.log("ma for joor!!", result);

    if (result && result?.status == true) {
      dispatch({
        type: StoreTypes?.GET_STORES,
        payload: result?.result,
      });
    }else {
      toast.error(result.err_message)
    }
  } catch (error) {
    console.log(error);
  }
};

export const toggleModal = () => (dispatch) => {
  dispatch({
    type: StoreTypes.TOGGLE_MODAL
  });
}

export const getSuggestions = (query) => async (dispatch) => {
  let result = await fetch(`${`/api/places/suggestions?query=${query}`}`);
  result = await result.json()
  // console.log(result)
  
  dispatch({
    type: StoreTypes.STORE_SUGGESTIONS,
    payload: result
  });
};

export const getAllStoreProducts =
  (storeId, pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.getStoreProductsById.route}/${storeId}`,
        method: API_ROUTES.getStoreProductsById.method,
        needToken: false,
      });

      console.log("Response from storesActions", response)

      if (response?.status === true) {
        dispatch({
          type: StoreTypes?.GET_STORE_PRODUCTS_BY_ID,
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
 

export const getStoreProductsByCategory =
  (country_id, category_id, storeId, pageNumber = 1) =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: `${API_ROUTES?.storeCategory?.route}/${category_id}/${storeId}?service_country=${country_id}&page_number=${pageNumber}`,
        method: API_ROUTES?.storeCategory?.method,
        needToken: false,
      });

      console.log("it is me again!!", response, category_id, storeId)

      if (response?.status === true) {
        dispatch({
          type: StoreTypes?.GET_STORE_PRODUCTS_BY_CATEGORY,
          payload: {
            productCategory: response?.result,
            data: response?.meta_data,
            categoryId: category_id,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };


// import * as StoreTypes from './storeTypes';
// import { httpRequest } from '../../https/http';
// import { toast } from 'react-toastify';
// import { API_ROUTES } from '../../../constants/config';


// export const getStores = ({ longitude, latitude, query, useQuery }) => async (dispatch) => {
//   try {
//     const result = await httpRequest({
//       // url: `${API_ROUTES?.getStores?.route}?longitude=${longitude}&latitude=${latitude}${useQuery ? 'storeName='+query :''}`,
//       url: `${API_ROUTES?.getStores?.route}?longitude=""&latitude=""`,
//       method: API_ROUTES?.getStores?.method,
//       needToken: false,
//     });

//     console.log(result);

//     if (result && result?.status == true) {
//       dispatch({
//         type: StoreTypes?.GET_STORES,
//         payload: result?.result,
//       });
//     }else {
//       toast.error(result.err_message)
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const toggleModal = () => (dispatch) => {
//   dispatch({
//     type: StoreTypes.TOGGLE_MODAL
//   });
// }

// export const getSuggestions = (query) => async (dispatch) => {
//   let result = await fetch(`${`/api/places/suggestions?query=${query}`}`);
//   result = await result.json()
//   // console.log(result)
  
//   dispatch({
//     type: StoreTypes.STORE_SUGGESTIONS,
//     payload: result
//   });
// };

// export const getAllProducts =
//   (storeId) =>
//   async (dispatch) => {
//     try {
//       dispatch(setIsLoading(true));
//       const response = await httpRequest({
//         url: `${API_ROUTES?.getStoreProductsById.route}/${storeId}`,
//         method: API_ROUTES.getStoreProductsById.method,
//         needToken: false,
//       });

//       if (response?.status === true) {
//         dispatch({
//           type: StoreTypes?.GET_STORE_PRODUCTS_BY_ID,
//           payload: {
//             products: response.result,
//             data: response?.meta_data,
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const getStoreProductsByCategory =
//   (country_id, category_id, PageNumber = 1, storeId) =>
//   async (dispatch) => {
//     try {
//       dispatch(setIsLoading(true));
//       const response = await httpRequest({
//         url: `${API_ROUTES?.categoryMarket?.route}/${category_id}/${storeId}`,
//         method: API_ROUTES?.categoryMarket?.method,
//         needToken: false,
//       });

//       if (response?.status === true) {
//         dispatch({
//           type: StoreTypes?.GET_STORE_PRODUCTS_BY_CATEGORY,
//           payload: {
//             productCategory: response?.result,
//             data: response?.meta_data,
//             categoryId: category_id,
//           },
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   export const getSearchProduct =
//   (text, country, page_number) => async (dispatch) => {
//     try {
//       dispatch(setIsLoading(true));
//       const response = await httpRequest({
//         url: `${
//           API_ROUTES?.searchProduct?.route + text
//         }&service_country=${country}&page_number=${page_number}`,
//         method: API_ROUTES?.searchProduct.method,
//       });

//       if (response?.status === true) {
//         dispatch({
//           type: StoreTypes?.SEARCH_PRODUCT,
//           payload: {
//             product: response.result,
//             data: response?.meta_data,
//           }
//         });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };