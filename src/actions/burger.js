import {
  ADD_INGREDIENT,
  REMOVE_INGREDIENT,
  INGREDIENTS_RECEIVED,
  INGREDIENTS_RECEIVED_FAILED,
  INGREDIENT_PRICES_RECEIVED
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

const ingredientsReceivedFailed = error => ({
  type: INGREDIENTS_RECEIVED_FAILED,
  error
});

const ingredientPricesReceived = ingredientPrices => ({
  type: INGREDIENT_PRICES_RECEIVED,
  ingredientPrices
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

// Pattern for asynchronous actions
export const fetchIngredients = () => dispatch =>
  api.ingredients
    .get()
    .then(ingredients => dispatch(ingredientsReceived(ingredients)))
    .catch(error => dispatch(ingredientsReceivedFailed(error.message)));

export const fetchIngredientPrices = () => dispatch =>
  api.ingredients.prices
    .get()
    .then(ingredientPrices =>
      dispatch(ingredientPricesReceived(ingredientPrices))
    );
