import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INGREDIENTS_RECEIVED,
  INGREDIENTS_RECEIVED_FAILED,
  INGREDIENT_PRICES_RECEIVED,
  INGREDIENT_PRICES_RECEIVED_FAILED,
  RESET_BURGER,
  FETCH_INGREDIENTS,
  FETCH_INGREDIENT_PRICES
} from './types';

const ingredientAdded = ingredientType => ({
  type: ADD_INGREDIENT,
  ingredientType
});

const ingredientRemoved = ingredientType => ({
  type: REMOVE_INGREDIENT,
  ingredientType
});

export const ingredientsReceived = ingredients => ({
  type: INGREDIENTS_RECEIVED,
  ingredients
});

export const ingredientsReceivedFailed = () => ({
  type: INGREDIENTS_RECEIVED_FAILED
});

export const ingredientPricesReceived = ingredientPrices => ({
  type: INGREDIENT_PRICES_RECEIVED,
  ingredientPrices
});

export const ingredientPricesReceivedFailed = () => ({
  type: INGREDIENT_PRICES_RECEIVED_FAILED
});

// export const addIngredient = ingredientType => dispatch => {
//   dispatch(ingredientAdded(ingredientType));
// };

// export const removeIngredient = ingredientType => dispatch => {
//   dispatch(ingredientRemoved(ingredientType));
// };

// Pattern for synchronous actions
export const addIngredient = ingredientType => ingredientAdded(ingredientType);

export const removeIngredient = ingredientType =>
  ingredientRemoved(ingredientType);

export const reset = () => ({ type: RESET_BURGER });

// Pattern for asynchronous actions
// export const fetchIngredients = () => dispatch =>
//   api.ingredients
//     .get()
//     .then(ingredients => dispatch(ingredientsReceived(ingredients)))
//     .catch(() => dispatch(ingredientsReceivedFailed()));

export const fetchIngredients = () => ({
  type: FETCH_INGREDIENTS
});

export const fetchIngredientPrices = () => ({
  type: FETCH_INGREDIENT_PRICES
});
