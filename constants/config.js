const BASE_URL = 'https://afiariwebapi.centralus.cloudapp.azure.com:444/api';

const ETERNAL_URL =
  'https://www.googleapis.com/calendar/v3/users/me/calendarList';

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
  existingEmails: {
    route: 'Account/existing-emails',
    method: 'GET',
  },
  updateProfile: {
    route: 'Account/update-profile',
    method: 'PUT',
  },
  signup: {
    route: 'Auth/signup',
    method: 'POST',
  },

  forgetPassword: {
    route: 'Account/forgot-password',
    method: 'POST',
  },

  verifyPasswordReset: {
    route: 'Account/verify/password-reset/',
    method: 'GET',
  },
  resetPassword: {
    route: 'Account/reset-password',
    method: 'POST',
  },
  refreshToken: {
    route: 'Auth/refresh/access-token',
    method: 'POST',
  },
  sendConfirmationMail: {
    route: 'Auth/verification/email-confirmation/send-mail',
    method: 'GET',
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
  shopping_history: {
    route: 'Customer/shopping/history/get',
    method: 'GET',
  },
  updateAddress: {
    route: 'Customer/my/address/update',
    method: 'PUT',
  },

  getPublicKey: {
    route: 'Transaction/paystack/public-key',
    method: 'GET',
  },
  initializePayment: {
    route: 'Transaction/paystack/initialize-payment',
    method: 'POST',
  },
  verifyPayment: {
    route: 'Transaction/paystack/verify-payment/',
    method: 'GET',
  },
  cancelPayment: {
    route: 'Transaction/paystack/cancel-payment/',
    method: 'GET',
  },
  placeOrder: {
    route: 'Orders/place-order',
    method: 'POST',
  },
  testimony: {
    route: 'Testimony/save',
    method: 'POST',
  },
  getTestimony: {
    route: 'Testimony',
    method: 'GET',
  },
  getDialCode: {
    route: 'Lookup/dial-code',
    method: 'GET',
  },
  searchProduct: {
    route: 'Product/search?search_text=',
    method: 'GET',
  },
  shouldReview: {
    route: 'Product/reviews/can-user-post-review?productId=',
    method: 'GET',
  },
  getStores: {
    route: 'Store/search/stores/in-location',
    method: 'GET'
  }
};

const authToken = 'Afiari_access';
const refreshToken = 'Afiari_refresh';

export { BASE_URL, API_ROUTES, MAP_API_KEY, authToken, refreshToken };
