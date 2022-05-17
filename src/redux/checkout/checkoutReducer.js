import * as CheckoutTypes from './checkoutTypes';

const emptyUserAddress = {
  country: '',
  state: '',
  city: '',
  street: '',
  contactPhoneNumber: '',
  dialCode: '',
  fullName: '',
  email: '',
};

const initialState = {
  loading: false,
  country: '08d9c086-88ab-40d7-8029-e7df4efadc60',
  selectedPayment: '',
  api_error: '',
  name: '',
  id: '',
  address: '',
  phoneNumber: '',
  payment_method: [],
  address_info: '',
  user_address: [],
  public_key: '',
  ...emptyUserAddress,
  init_payment: [],
  init_result: [],
  order_number: [],
  selectedAddress: {},
  verify_payment: '',
  place_order_message: '',
  place_order_status: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CheckoutTypes.IS_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case CheckoutTypes.USER_INPUT:
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };

    case CheckoutTypes.GET_PUBLIC_KEY:
      return {
        ...state,
        public_key: action.payload,
      };
    case CheckoutTypes.SELECTED_PAYMENT:
      return {
        ...state,
        selectedPayment: action.payload,
      };
    case CheckoutTypes.GET_PAYMENT_METHOD:
      return {
        ...state,
        payment_method: action.payload,
      };
    case CheckoutTypes.ADD_ADDRESS:
      return {
        ...state,
        address_info: action.payload,
      };
    case CheckoutTypes.GET_ADDRESS:
      return {
        ...state,
        user_address: action.payload,
      };
    case CheckoutTypes.SELECTED_ADDRESS:
      return {
        ...state,
        selectedAddress: {
          id: action?.payload?.id,
          name: action?.payload?.name,
          address: action?.payload?.address,
          phoneNumber: action?.payload?.phoneNumber,
        },
      };
    case CheckoutTypes?.INITIALIZE_PAYMENT:
      return {
        ...state,
        init_payment: action.payload,
      };
    case CheckoutTypes?.VERIFY_PAYMENT:
      return {
        ...state,
        verify_payment: action.payload,
      };
    case CheckoutTypes?.ORDER_NUMBER:
      return {
        ...state,
        order_number: action.payload,
      };
    case CheckoutTypes?.PLACE_ORDER:
      return {
        ...state,
        place_order_status: action.payload.status,
        place_order_message: action.payload.error,
      };

    default:
      return state;
  }
};
export default reducer;
