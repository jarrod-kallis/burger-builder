import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INGREDIENTS_RECEIVED,
  INGREDIENTS_RECEIVED_FAILED,
  INGREDIENT_PRICES_RECEIVED,
  INGREDIENT_PRICES_RECEIVED_FAILED,
  RESET_BURGER
} from './types';
import api from '../api';

const ingredientAdded = ingredientType => ({
  type: ADD_INGREDIENT,
  ingredientType
});

const ingredientRemoved = ingredientType => ({
  type: REMOVE_INGREDIENT,
  ingredientType
});

const ingredientsReceived = ingredients => ({
  type: INGREDIENTS_RECEIVED,
  ingredients
});

const ingredientsReceivedFailed = () => ({
  type: INGREDIENTS_RECEIVED_FAILED
});

const ingredientPricesReceived = ingredientPrices => ({
  type: INGREDIENT_PRICES_RECEIVED,
  ingredientPrices
});

const ingredientPricesReceivedFailed = () => ({
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
export const fetchIngredients = () => dispatch =>
  api.ingredients
    .get()
    .then(ingredients => dispatch(ingredientsReceived(ingredients)))
    .catch(() => dispatch(ingredientsReceivedFailed()));

export const fetchIngredientPrices = () => dispatch =>
  api.ingredients.prices
    .get()
    .then(ingredientPrices =>
      dispatch(ingredientPricesReceived(ingredientPrices))
    )
    .catch(() => dispatch(ingredientPricesReceivedFailed()));
