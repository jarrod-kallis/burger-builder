import axiosOrders from './axios-orders';
import axiosAuthorisation from './axios-authorisation';
import { FIREBASE_API_KEY } from './types';

export default {
  user: {
    signUp: credentials =>
      axiosAuthorisation
        .post(`/signupNewUser?key=${FIREBASE_API_KEY}`, {
          ...credentials,
          returnSecureToken: true
        })
        .then(response => response.data)
        .catch(error => {
          throw error.response.data.error.message;
        }),
    login: credentials =>
      axiosAuthorisation
        .post(`/verifyPassword?key=${FIREBASE_API_KEY}`, {
          ...credentials,
          returnSecureToken: true
        })
        .then(response => response.data)
        .catch(error => {
          throw error.response.data.error.message;
        })
  },
  ingredients: {
    get: () =>
      axiosOrders
        .get('/ingredients.json')
        .then(response => response.data)
        .then(ingredients => {
          // Sort the ingredients by their display order
          const sortedIngredients = Object.keys(ingredients)
            .sort(
              (a, b) =>
                ingredients[a].displayOrder - ingredients[b].displayOrder
            )
            .reduce(
              (prevObj, ingredient) =>
                Object.assign(prevObj, {
                  [ingredient]: ingredients[ingredient].quantity
                }),
              {}
            );
          return sortedIngredients;
        }),
    prices: {
      get: () =>
        axiosOrders
          .get('/ingredient-prices.json')
          .then(response => response.data)
    }
  },
  order: {
    place: order =>
      axiosOrders
        .post('/orders.json', order)
        .then(response => response.data.name)
  },
  orders: {
    get: () => axiosOrders.get('/orders.json').then(response => response.data)
  }
};
