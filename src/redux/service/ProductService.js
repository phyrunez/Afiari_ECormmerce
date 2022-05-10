// import axios from 'axios';
// import { BASE_URL, API_ROUTES } from '../../constants/config';

// const getServiceableCountries = async () => {
//   // const response = await axios.get(
//   //   BASE_URL + API_ROUTES.serviceableCountries.route
//   // );
//   // return response.data.result;
// };

// //get all product in general market
// const getProducts = async (pageNumber) => {
//   const country = JSON.parse(localStorage.getItem('selectedCountry'));

//   const response = await axios.get(
//     BASE_URL +
//       API_ROUTES.allGeneralMarket.route +
//       country.id +
//       `&page_number= ${pageNumber}`
//   );

//   localStorage.setItem('meta_data', JSON.stringify(response.data.meta_data));

//   return response.data;
// };

// //get a single product in general market
// const getProduct = async (id) => {
//   const country = JSON.parse(localStorage.getItem('selectedCountry'));
//   const response = await axios.get(
//     BASE_URL +
//       API_ROUTES.singleProduct.route +
//       id +
//       `?service_country=${country.id}`
//   );

//   if (response.data.result) {
//     localStorage.setItem('product', JSON.stringify(response.data.result));
//   }

//   return response.data.result;
// };

// const getProductCategories = async () => {
//   const response = await axios.get(BASE_URL + API_ROUTES.allCategories.route);

//   return response.data.result;
// };

// const productService = {
//   getServiceableCountries,
//   getProducts,
//   getProduct,
//   getProductCategories,
// };

// export default productService;
