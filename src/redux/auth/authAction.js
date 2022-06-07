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

export const uploadPicture = (name, value) => ({
  type: AuthTypes.UPLOAD__PICTURE,
  payload: {
    name: name,
    value: value,
  },
});

export const setUserDayOfBirth = (name, value) => ({
  type: AuthTypes.SET__DAY,
  payload: {
    name: name,
    value: value,
  },
});

export const setUserMonthOfBirth = (name, value) => ({
  type: AuthTypes.SET__MONTH,
  payload: {
    name: name,
    value: value,
  },
});
export const setUserYearOfBirth = (name, value) => ({
  type: AuthTypes.SET__YEAR,
  payload: {
    name: name,
    value: value,
  },
});

export const logInUser = (user, router, query) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    const result = await httpRequest({
      url: API_ROUTES.login.route,
      method: API_ROUTES.login.method,
      needToken: false,
      isFormData: false,
      body: { ...user },
    });

    localStorage.setItem('loginResult', JSON.stringify(result));

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.LOGIN_SUCCESS,
        payload: true,
      });

      JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

      JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

      JSON.stringify(
        localStorage.setItem(refreshToken, result?.result[0]?.refresh_token)
      );
    } else {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.LOGIN_FAILED,
        payload: result.error_message,
      });
    }
  } catch (error) {
    const result = {
      status: false,
      error_message: 'Server error! Reload to continue.',
      success_message: null
    };
    dispatch(setIsLoading(false));
    localStorage.setItem('loginResult', JSON.stringify(result));
    dispatch({
      type: AuthTypes.LOGIN_FAILED,
      payload: result,
    });
  }
};

// export const logInUser = (user, router, query) => async (dispatch) => {
//   try {
//     dispatch(setIsLoading(true));

//     const result = await httpRequest({
//       url: API_ROUTES.login.route,
//       method: API_ROUTES.login.method,
//       needToken: false,
//       isFormData: false,
//       body: { ...user },
//     });

//     if (result.status === true) {
//       dispatch(setIsLoading(false));
//       dispatch({
//         type: AuthTypes.LOGIN_SUCCESS,
//         payload: true,
//       });

//       JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

//       JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

//       JSON.stringify(
//         localStorage.setItem(refreshToken, result?.result[0]?.refresh_token)
//       );

//       if (router?.query?.from !== undefined) {
//         router.push(router?.query?.from);
//       } else {
//         router.push('/FoodMarket');
//       }
//     } else {
//       dispatch(setIsLoading(false));
//       dispatch({
//         type: AuthTypes.LOGIN_FAILED,
//         payload: result.error_message,
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };

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

    localStorage.setItem('signupMessage', JSON.stringify(result));

    console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.SIGNUP_SUCCESS,
        payload: result,
      });

      JSON.stringify(localStorage.setItem(authToken, result?.result[0]?.token));

      JSON.stringify(
        localStorage.setItem(refreshToken, result?.result[0]?.refresh_token)
      );
    } else {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes.SIGNUP_FAILED,
        payload: result,
      });
    }

    console.log(user);
  } catch (error) {
    console.log(error);
    const result = {
      status: false,
      error_message: 'Server error! Reload to continue.',
      success_message: null
    };
    dispatch(setIsLoading(false));
    localStorage.setItem('signupMessage', JSON.stringify(result));
    dispatch({
      type: AuthTypes.SIGNUP_FAILED,
      payload: result,
    });
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
        type: AuthTypes?.SEND__EMAIL,
        payload: result?.success_message,
      });

      router.push('/reset-password');
    } else {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.SEND__EMAIL,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const verifyPasswordReset = (email, token) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.verifyPasswordReset?.route + email + token,
      method: API_ROUTES?.verifyPasswordReset?.method,
    });
    // console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.EMAIL_CONFIRM,
        payload: result?.success_message,
      });

      // router.push('/password-reset-success');
    } else {
      dispatch({
        type: AuthTypes?.EMAIL_CONFIRM,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const resetPassword = (userData) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.resetPassword?.route,
      method: API_ROUTES?.resetPassword?.method,

      body: {
        ...userData,
      },
    });
    // console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.RESET_PASSWORD,
        payload: result?.success_message,
      });

      // router.push('/password-reset-success');
    } else {
      dispatch({
        type: AuthTypes?.RESET_PASSWORD,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const forgetPassword = (email) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.forgetPassword?.route,
      method: API_ROUTES?.forgetPassword?.method,
      body: {
        email: email,
      },
    });
    console.log(result);

    if (result.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.FORGET_PASSWORD,
        payload: result,
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

export const getExistingMails = () => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.existingEmails?.route,
      method: API_ROUTES?.existingEmails?.method,
    });
    console.log(result);

    if (result?.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.GET_EMAILS,
        payload: result,
      });

      // router.push('/password-reset-success');
    } else {
      dispatch({
        type: AuthTypes?.GET_EMAILS,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (data) => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const result = await httpRequest({
      url: API_ROUTES?.updateProfile?.route,
      method: API_ROUTES?.updateProfile?.method,
      body: {
        ...data,
      },
    });
    console.log(result);

    if (result?.status === true) {
      dispatch(setIsLoading(false));
      dispatch({
        type: AuthTypes?.UPDATE__PROFILE,
        payload: result,
      });

      // router.push('/password-reset-success');
    } else {
      dispatch({
        type: AuthTypes?.UPDATE__PROFILE,
        payload: result?.error_message,
      });
    }
  } catch (error) {
    console.log(error);
  }
};
