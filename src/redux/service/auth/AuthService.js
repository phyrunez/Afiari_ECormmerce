// import axios from 'axios';
// import { BASE_URL, API_ROUTES } from '../../../constants/config';

// //login user
// const login = async (userData) => {
//   const response = await axios.post(
//     BASE_URL + API_ROUTES.login.route,
//     userData
//   );

//   if (response.data.result) {
//     localStorage.setItem('user', JSON.stringify(response.data.result));
//   }
//   return response.data;
// };

// export const register = async (userData) => {
//   const response = await axios.post(
//     BASE_URL + API_ROUTES.signup.route,
//     userData
//   );

//   console.log(response.data);

//   if (response.data.result) {
//     localStorage.setItem('user', JSON.stringify(response.data.result));
//   }

//   return response.data;
// };

// const refreshToken = async () => {
//   const user = JSON.parse(localStorage.getItem('user'));

//   const rtoken = user.map((e) => e.refresh_token);

//   console.log(rtoken);

//   const response = await axios.post(BASE_URL + API_ROUTES.refreshToken.route, {
//     refreshToken: JSON.stringify(rtoken),
//   });

//   const newUser = localStorage.setItem(
//     'user',
//     JSON.stringify(response.data.result)
//   );

//   console.log(newUser);

//   return response.data.result;
// };

// //Logout user
// const logout = () => localStorage.removeItem('user');

// const authService = {
//   login,
//   register,
//   logout,
//   refreshToken,
// };

// export default authService;
