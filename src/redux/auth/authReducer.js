import * as AuthTypes from './authTypes';

const emptyUser = {
  email: '',
  firstName: '',
  lastName: '',
  password: '',
};

const initialState = {
  isLogged_in: false,
  loading: false,
  country: '08d9c086-88ab-40d7-8029-e7df4efadc60',
  ...emptyUser,
  api_error: '',
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
        country: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
