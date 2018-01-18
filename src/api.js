import axios from './axios-orders';

export default {
  ingredients: {
    get: () =>
      axios
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
        axios.get('/ingredient-prices.json').then(response => response.data)
    }
  },
  order: {
    place: order =>
      axios.post('/orders.json', order).then(response => response.data.name)
  }
};
