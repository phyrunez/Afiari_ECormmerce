import * as AuthTypes from './authTypes';

const emptyUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
  dialCode: '',
  address: '',
};

const initialState = {
  isLogged_in: false,
  loading: false,
  country: '08d9c086-88ab-40d7-8029-e7df4efadc60',
  ...emptyUser,
  api_error: '',
  confirmation_message: '',
  forget_password: '',
  sent_mail: '',
  reset_password: '',
  userCountry: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.AUTH_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case AuthTypes.USER_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AuthTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLogged_in: action.payload,
      };
    case AuthTypes.LOGIN_FAILED:
      return {
        ...state,
        api_error: action.payload,
      };

    case AuthTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLogged_in: action.payload,
      };

    case AuthTypes.SIGNUP_FAILED:
      return {
        ...state,
        api_error: action.payload,
      };

    case AuthTypes.GET_CURRENT_USER:
      return {
        ...state,
        ...action.payload,
      };

    case AuthTypes.SELECTED_COUNTRY:
      return {
        ...state,
        userCountry: action.payload,
      };
    case AuthTypes.FORGET_PASSWORD:
      return {
        ...state,
        forget_password: action.payload,
      };
    case AuthTypes.RESET_PASSWORD:
      return {
        ...state,
        reset_password: action.payload,
      };
    case AuthTypes.EMAIL_CONFIRM:
      return {
        ...state,
        confirmation_message: action.payload,
      };
    case AuthTypes.SEND__EMAIL:
      return {
        ...state,
        sent_mail: action.payload,
      };
    case AuthTypes.UPDATE__PROFILE:
      const newUpdate = [...state, action.payload];
      return {
        newUpdate,
      };
    case AuthTypes.UPLOAD__PICTURE:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AuthTypes.SET__DAY:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AuthTypes.SET__MONTH:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case AuthTypes.SET__YEAR:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    default:
      return state;
  }
};

export default reducer;
