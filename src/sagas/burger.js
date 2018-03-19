import { put } from 'redux-saga/effects';

import api from '../api';
import {
  ingredientsReceived,
  ingredientsReceivedFailed,
  ingredientPricesReceived,
  ingredientPricesReceivedFailed
} from '../actions/burger';

export function* fetchIngredientsSaga() {
  try {
    const ingredients = yield api.ingredients.get();

    yield put(ingredientsReceived(ingredients));
  } catch (error) {
    yield put(ingredientsReceivedFailed());
  }
}

export function* fetchIngredientPricesSaga() {
  try {
    const ingredientPrices = yield api.ingredients.prices.get();

    yield put(ingredientPricesReceived(ingredientPrices));
  } catch (error) {
    yield put(ingredientPricesReceivedFailed());
  }
}
