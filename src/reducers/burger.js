import { ADD_INGREDIENT, REMOVE_INGREDIENT } from '../actions/types';

const BASE_PRICE = 4;

const initialState = {
  ingredients: {
    salad: 0,
    bacon: 0,
    cheese: 0,
    meat: 0
  },
  ingredientPrices: {
    salad: 0.3,
    bacon: 0.7,
    cheese: 0.5,
    meat: 1.4
  },
  totalPrice: BASE_PRICE // Base price of burger
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] + 1
        },
        totalPrice:
          state.totalPrice + state.ingredientPrices[action.ingredientType]
      };
    case REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientType]: state.ingredients[action.ingredientType] - 1
        },
        totalPrice:
          state.totalPrice - state.ingredientPrices[action.ingredientType]
      };
    default:
      return state;
  }
};
