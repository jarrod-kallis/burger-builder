import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INGREDIENTS_RECEIVED,
  INGREDIENT_PRICES_RECEIVED,
  INGREDIENTS_RECEIVED_FAILED,
  INGREDIENT_PRICES_RECEIVED_FAILED
} from '../actions/types';

const BASE_PRICE = 4;

const initialState = {
  ingredients: {},
  ingredientPrices: null,
  totalPrice: BASE_PRICE, // Base price of burger
  error: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INGREDIENTS_RECEIVED:
      return {
        ...state,
        ingredients: action.ingredients
      };
    case INGREDIENTS_RECEIVED_FAILED:
      return {
        ...state,
        error: true
      };
    case INGREDIENT_PRICES_RECEIVED:
      return {
        ...state,
        ingredientPrices: action.ingredientPrices
      };
    case INGREDIENT_PRICES_RECEIVED_FAILED:
      return {
        ...state,
        error: true
      };
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
