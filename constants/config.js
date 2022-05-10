const BASE_URL = 'https://afiariwebapi.centralus.cloudapp.azure.com:444/api';

const MAP_API_KEY = 'unknown';

const API_ROUTES = {
  login: {
    route: 'Auth/signin',
    method: 'POST',
  },
  userInfo: {
    route: 'Account/get/my-profile',
    method: 'GET',
  },
  signup: {
    route: 'Auth/signup',
    method: 'POST',
  },

  forgot: {
    route: 'auth/forgot-password',
    method: 'POST',
  },
  reset: {
    route: 'auth/reset-forgotten-password',
    method: 'POST',
  },

  refreshToken: {
    route: 'Auth/refresh/access-token',
    method: 'POST',
  },
  confirmation: {
    route: 'auth/confirm-registration',
    method: 'POST',
  },
  resendConfirmation: {
    route: 'auth/resend-confirmation-code',
    method: 'POST',
  },
  addNewAddress: {
    route: 'Customer/my/address/add',
    method: 'POST',
  },
  getAddress: {
    route: 'Customer/my/address',
    method: 'GET',
  },
  serviceableCountries: {
    route: 'Lookup/serviceable-countries',
    method: 'GET',
  },
  getPaymentOptions: {
    route: 'Lookup/payment-options',
    method: 'GET',
  },
  allCategories: {
    route: 'Lookup/product-categories',
    method: 'GET',
  },
  allGeneralMarket: {
    route: 'Product/general-market?service_country=',
    method: 'GET',
  },
  categoryMarket: {
    route: 'Product/category',
    method: 'GET',
  },
  singleProduct: {
    route: 'Product/',
    method: 'GET',
  },
  addToCart: {
    route: 'Shopping/cart/add?service_country=',
    method: 'POST',
  },
  addMultipleCart: {
    route: 'Shopping/cart/add-multiple?service_country=',
    method: 'POST',
  },
  getCart: {
    route: 'Shopping/cart/get',
    method: 'GET',
  },
  deleteCart: {
    route: 'Shopping/delete-from-cart/',
    method: 'DELETE',
  },
  updateCart: {
    route: 'Shopping/cart/update/',
    method: 'PUT',
  },
  checkout: {
    route: 'Shopping/my/checkout?service_country=',
    method: 'POST',
  },
  getPublicKey: {
    route: 'Transaction/paystack/public-key',
    method: 'GET',
  },
  initializePayment: {
    route: 'Transaction/paystack/initialize-payment',
    method: 'POST',
  },
};

const authToken = 'Afiari_access';
const refreshToken = 'Afiari_refresh';

export { BASE_URL, API_ROUTES, MAP_API_KEY, authToken, refreshToken };
