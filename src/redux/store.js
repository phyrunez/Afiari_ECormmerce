// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from '../slice/ProductSlice';
// import authReducer from '../slice/auth/AuthSlice';
// import cartReducer from '../slice/CartSlice';

// export const store = configureStore({
//   reducer: {
//     countries: productReducer,
//     auth: authReducer,
//     cart: cartReducer,
//   },
// });

import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';

import RootReducer from './RootReducer';

// const loggerMiddleware = createLogger();

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(RootReducer, preloadedState, composedEnhancers);

  return store;
}
