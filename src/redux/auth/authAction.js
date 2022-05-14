import { API_ROUTES, authToken, refreshToken } from '../../../constants/config';
import { httpRequest } from '../../https/http';
import * as AuthTypes from './authTypes';

export const handleUserInput = (name, value) => ({
  type: AuthTypes.USER_INPUT,
  payload: {
    name: name,
    value: value,
  },
});

export const setIsLoading = (value) => ({
  type: AuthTypes.AUTH_LOADING,
  payload: value,
});

export const setUserCountry = (value) => ({
  type: AuthTypes.SELECTED_COUNTRY,
  payload: value,
});

export const logInUser = (user, router, path) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.login.route,
      method: API_ROUTES.login.method,
      needToken: false,
      isFormData: false,
      body: { ...user },
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: true,
      });

      JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

      JSON.stringify(
        localStorage.setItem(refreshToken, result?.result[0]?.refresh_token)
      );
      if (router?.query?.from !== undefined) {
        router.push(router?.query?.from);
      } else {
        router.push('/shop');
      }
    } else {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.LOGIN_FAILED,
        payload: result.error_message,
      });
      setTimeout(
        () =>
          dispatch({
            type: AuthTypes.LOGIN_FAILED,
            payload: '',
          }),
        4000
      );
    }
  } catch (error) {
    console.log(error);
  }
};

export const signUpUser = (user, router) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.signup.route,
      method: API_ROUTES.signup.method,
      needToken: false,
      isFormData: false,
      body: { ...user },
    });

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.SIGNUP_SUCCESS,
        payload: true,
      });

      JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

      JSON.stringify(
        localStorage.setItem(refreshToken, result?.result[0]?.refresh_token)
      );

      router.push('/shop');
    } else {
      dispatch({
        type: AuthTypes.SIGNUP_FAILED,
        payload: result.error_message,
      });
    }
    console.log(user);
  } catch (error) {
    console.log(error);
  }
};

export const logout = () => (dispatch) => {
  dispatch(setIsLoading(false));
  dispatch({
    type: AuthTypes.LOGIN_SUCCESS,
    payload: false,
  });
  dispatch({
    type: AuthTypes.SIGNUP_SUCCESS,
    payload: false,
  });
  localStorage.removeItem(authToken);
  localStorage.removeItem(refreshToken);
};

export const sendConfirmationMail = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.sendConfirmationMail?.route,
      method: API_ROUTES?.sendConfirmationMail?.method,
    });
    console.log(result);

    if (result?.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.FORGET_PASSWORD,
        payload: result?.success_message,
      });

      router.push('/reset-password');
    } else {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.FORGET_PASSWORD,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const emailConfirmation = (email, token) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.emailConfirmation?.route + email + token,
      method: API_ROUTES?.emailConfirmation?.method,
    });
    console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.EMAIL_CONFIRM,
        payload: result?.success_message,
      });

      // router.push('/password-reset-success');
    } else {
      dispatch({
        type: AuthTypes?.FORGET_PASSWORD,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
