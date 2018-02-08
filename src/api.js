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
        }),
    refreshToken: user =>
      axiosAuthorisation
        .post(
          `https://securetoken.googleapis.com/v1/token?key=${FIREBASE_API_KEY}`,
          {
            grant_type: 'refresh_token',
            refresh_token: user.refreshToken
          }
        )
        .then(response => response.data)
        .then(updatedUser => ({
          ...user,
          idToken: updatedUser.id_token,
          expiresIn: updatedUser.expires_in,
          refreshToken: updatedUser.refresh_token
        }))
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
    place: (order, token) =>
      axiosOrders
        .post(`/orders.json?auth=${token}`, order)
        .then(response => response.data.name)
  },
  orders: {
    get: token =>
      axiosOrders
        .get(`/orders.json?auth=${token}`)
        .then(response => response.data)
  }
};
