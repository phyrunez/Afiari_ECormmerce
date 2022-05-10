import axios from 'axios';

import { BASE_URL, API_ROUTES } from '../../constants/config';

const addCart = async (id) => {
  const country = JSON.parse(localStorage.getItem('selectedCountry'));
  const user = JSON.parse(localStorage.getItem('user'));

  const userToken = user.map((e) => e.token).toString();

  const response = await axios.post(
    BASE_URL + API_ROUTES.addToCart.route + country.id,
    {
      productId: `${id}`,
      //   productQuantity: 0,
    },
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  console.log(userToken);
};

const cartService = {
  addCart,
};

export default cartService;
