import axios from './axios-orders';

export default {
  ingredients: {
    get: () => axios.get('/ingredients.json').then(response => response.data),
    prices: {
      get: () =>
        axios.get('/ingredient-prices.json').then(response => response.data)
    }
  }
};
