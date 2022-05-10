import {
  API_ROUTES,
  authToken,
  BASE_URL,
  refreshToken,
} from '../../constants/config';
import store from '../../src/redux/store';
import * as AuthTypes from '../redux/auth/authTypes';

export const httpRequest = async (params) => {
  try {
    const { method, body, url, needToken = true, isFormData = false } = params;

    if (!url) throw new Error('Url not set');

    if (typeof url !== 'string') throw new Error('Url must be a string');

    const token = localStorage.getItem(authToken);
    const headers = getHeaders(token, needToken);

    const options = {
      method: method || 'GET',
      redirect: 'follow',
      headers: headers,
    };

    if (body) options.body = isFormData ? body : JSON.stringify(body);

    const res = await fetch(`${BASE_URL}/${url}`, options);

    if (res.status === 401) {
      const currentRefreshToken = localStorage.getItem(refreshToken);
      if (refreshToken) {
        const result = await httpRequest({
          url: API_ROUTES.refreshToken.route,
          method: API_ROUTES.refreshToken.method,
          body: { refreshToken: currentRefreshToken },
          needToken: false,
        });

        if (result.status === true) {
          localStorage.setItem(authToken, result.result[0].token);
          localStorage.setItem(refreshToken, result.result[0].refresh_token);
          const hitResponse = await httpRequest({
            url,
            method,
            body,
            needToken,
          });

          if (hitResponse.status === true) {
            return hitResponse;
          } else {
            store.dispatch({
              type: AuthTypes.LOGIN_SUCCESS,
              payload: false,
            });

            localStorage.removeItem(authToken);
            localStorage.removeItem(refreshToken);

            window.location.href = '/login';
          }
        } else {
          store.dispatch({
            type: AuthTypes.LOGIN_SUCCESS,
            payload: false,
          });

          localStorage.removeItem(authToken);
          localStorage.removeItem(refreshToken);

          window.location.href = '/login';
        }

        // console.log(result);
      }
    }

    // console.log(res);

    const response = await res.text();

    const result = JSON.parse(response);

    return result;
  } catch (error) {}
};

const getHeaders = (token, needToken) => {
  let headers = needToken ? { Authorization: `Bearer ${token}` } : null;

  return { ...headers, 'content-type': 'application/json' };
};
