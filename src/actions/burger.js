import { ADD_INGREDIENT, REMOVE_INGREDIENT } from './types';

const ingredientAdded = ingredientType => ({
  type: ADD_INGREDIENT,
  ingredientType
});

const ingredientRemoved = ingredientType => ({
  type: REMOVE_INGREDIENT,
  ingredientType
});

export const addIngredient = ingredientType => dispatch => {
  dispatch(ingredientAdded(ingredientType));
};

export const removeIngredient = ingredientType => dispatch => {
  dispatch(ingredientRemoved(ingredientType));
};
