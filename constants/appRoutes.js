export const appRoutes = {
  LOGIN: '/login',
  HOME: '/',
  FOODMARKET: '/FoodMarket',
  PRODUCT: '/FoodMarket/[productId]',
  REGISTER: '/sign-up',
  FORGOT: '/forget-password',
  RESET: '/reset-password',
  CART: '/cart',
  PROFILE: '/profile',
  PAYMENTCOMPLETE: '/payment-complete',
  THANKYOU: '/thank-you',
  PRIVACYPOLICY: '/privacy_policy',
  TERMSANDCONDITION: '/terms_and_condition',
  PAYSTACK: '/paystack',
  FORGET_PASSWORD: '/forget-password',
  MAIL_CONFIRMATION: '/mail-confirmation',
  PASSWORD_RESET_SUCCESS: '/password-reset-success'
};

export const unRestrictedAPIRoutes = [
  'Product/reviews/can-user-post-review',
];
