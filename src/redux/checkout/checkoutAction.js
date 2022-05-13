import { API_ROUTES, authToken, refreshToken } from '../../../constants/config';
import { httpRequest } from '../../https/http';
import * as CheckoutTypes from './checkoutTypes';

export const handleUserInput = (name, value) => ({
  type: CheckoutTypes.USER_INPUT,
  payload: {
    name: name,
    value: value,
  },
});

export const setIsLoading = (value) => ({
  type: CheckoutTypes.IS_LOADING,
  payload: value,
});

export const handleSelectedPaymentMethod = (value) => async (dispatch) => {
  dispatch({
    type: CheckoutTypes.SELECTED_PAYMENT,
    payload: value,
  });
  console.log(value);
};

// address?.id,
// address.contact_name,
// address.street,
// address.phone_number

export const handleSelectedAddress = (address) => async (dispatch) => {
  dispatch({
    type: CheckoutTypes.SELECTED_ADDRESS,
    payload: {
      id: address?.id,
      name: address.contact_name,
      address: address.street,
      phoneNumber: address.phone_number,
    },
  });
};

export const publicKey = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.getPublicKey.route,
      method: API_ROUTES.getPublicKey.method,
      needToken: false,
      isFormData: false,
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CheckoutTypes.GET_PUBLIC_KEY,
        payload: result?.result?.[0]?.public_key,
      });
    } else {
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getPaymentOptions = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.getPaymentOptions.route,
      method: API_ROUTES.getPaymentOptions.method,
      needToken: false,
      isFormData: false,
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CheckoutTypes.GET_PAYMENT_METHOD,
        payload: result.result,
      });
    } else {
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const addAddress = (address) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.addNewAddress.route,
      method: API_ROUTES.addNewAddress.method,
      needToken: true,
      isFormData: false,
      body: { ...address },
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CheckoutTypes.ADD_ADDRESS,
        payload: result.success_message,
      });
    } else {
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES?.getAddress?.route,
      method: API_ROUTES?.getAddress?.method,
      needToken: true,
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CheckoutTypes?.GET_ADDRESS,
        payload: result.result,
      });
    } else {
      dispatch(setIsLoading(false));
    }
  } catch (error) {
    console.log(error);
  }
};

export const initializePayment =
  (orderNumber, verify, masterID, ref, data) => async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const response = await httpRequest({
        url: API_ROUTES?.initializePayment?.route,
        method: API_ROUTES?.initializePayment?.method,
        needToken: true,
        body: { orderNumber: orderNumber },
      });

      if (response?.status === true) {
        dispatch({
          type: CheckoutTypes?.INITIALIZE_PAYMENT,
          payload: {
            init_payment: response?.result,
            init_result: response?.status,
          },
        });

        dispatch(setIsLoading(true));

        const res = await httpRequest({
          url: API_ROUTES?.verifyPayment?.route + ref,
          method: API_ROUTES?.verifyPayment?.method,
          needToken: true,
        });

        console.log(res);
        console.log(ref);

        if (res?.status === true) {
          dispatch({
            type: CheckoutTypes?.VERIFY_PAYMENT,
            payload: res?.status,
          });

          dispatch(setIsLoading(true));
          const resp = await httpRequest({
            url: API_ROUTES?.verifyPayment?.route + ref,
            method: API_ROUTES?.verifyPayment?.method,
            needToken: true,
          });

          console.log(resp);
          console.log(ref);

          if (resp?.status === true) {
            dispatch({
              type: CheckoutTypes?.VERIFY_PAYMENT,
              payload: response?.status,
            });

            dispatch(setIsLoading(true));
            const response = await httpRequest({
              url: API_ROUTES?.placeOrder?.route,
              method: API_ROUTES?.placeOrder?.method,
              needToken: true,
              body: {
                paymentType: data.paymentType,
                shippingAddress: data.shippingAddress,
                masterRecordId: data.masterRecordId,
              },
            });

            console.log(response);
            console.log(data);

            if (response?.status === true) {
              dispatch({
                type: CheckoutTypes?.PLACE_ORDER,
                payload: response?.result?.success_message,
              });
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

export const getOrderNumber = (country_id) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES?.checkout?.route + country_id,
      method: API_ROUTES?.checkout?.method,
      needToken: true,
      isFormData: false,
    });

    console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: CheckoutTypes?.ORDER_NUMBER,
        payload: result?.result,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyPayment = (ref) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.verifyPayment?.route + ref,
      method: API_ROUTES?.verifyPayment?.method,
      needToken: true,
    });

    console.log(response);
    console.log(ref);

    if (response?.status === true) {
      dispatch({
        type: CheckoutTypes?.VERIFY_PAYMENT,
        payload: response?.status,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
export const placeOrder = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const response = await httpRequest({
      url: API_ROUTES?.placeOrder?.route,
      method: API_ROUTES?.placeOrder?.method,
      needToken: true,
      body: {
        paymentType: data.paymentType,
        shippingAddress: data.shippingAddress,
        masterRecordId: data.masterRecordId,
      },
    });

    console.log(response);
    console.log(data);

    if (response?.status === true) {
      dispatch({
        type: CheckoutTypes?.PLACE_ORDER,
        payload: response?.result?.success_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
