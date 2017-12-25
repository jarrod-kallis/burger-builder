import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import { SALAD, CHEESE, BACON, MEAT } from '../../types';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const BASE_PRICE = 4;

const INGREDIENT_PRICES = {
  [SALAD]: 0.5,
  [BACON]: 0.7,
  [CHEESE]: 0.4,
  [MEAT]: 1.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      [SALAD]: 0,
      [BACON]: 0,
      [CHEESE]: 0,
      [MEAT]: 0
    },
    totalPrice: BASE_PRICE // Base price of burger
  };

  addIngredientHandler = ingredientType => {
    const ingredients = {
      ...this.state.ingredients,
      [ingredientType]: this.state.ingredients[ingredientType] + 1
    };

    const totalPrice =
      this.state.totalPrice + INGREDIENT_PRICES[ingredientType];

    this.setState(
      {
        ingredients,
        totalPrice
      }
      // () => this.totalPrice()
    );
  };

  removeIngredientHandler = ingredientType => {
    if (this.state.ingredients[ingredientType] >= 1) {
      const ingredients = {
        ...this.state.ingredients,
        [ingredientType]: this.state.ingredients[ingredientType] - 1
      };

      const totalPrice =
        this.state.totalPrice - INGREDIENT_PRICES[ingredientType];

      this.setState(
        {
          ingredients,
          totalPrice
        }
        // () => this.totalPrice()
      );
    }
  };

  // My way to work out the total price
  // totalPrice = () => {
  //   const totalPrice = Object.keys(this.state.ingredients).reduce(
  //     (accumulativePrice, ingredientKey) => {
  //       const amount = this.state.ingredients[ingredientKey];
  //       const price = INGREDIENT_PRICES[ingredientKey];

  //       return accumulativePrice + amount * price;
  //     },
  //     BASE_PRICE
  //   );

  //   this.setState({
  //     totalPrice
  //   });
  // };

  render() {
    let disabledRemoveButtonInfo = {
      ...this.state.ingredients
    };

    disabledRemoveButtonInfo = Object.keys(disabledRemoveButtonInfo).reduce(
      (obj, key) => {
        disabledRemoveButtonInfo[key] = this.state.ingredients[key] < 1;
        return Object.assign(obj, disabledRemoveButtonInfo);
      },
      {}
    );

    // for (const key in disabledRemoveButtonInfo) {
    //   disabledRemoveButtonInfo[key] = this.state.ingredients[key] < 1;
    // }

    return (
      <Auxillary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAdd={this.addIngredientHandler}
          onRemove={this.removeIngredientHandler}
          disabledRemoveButtonInfo={disabledRemoveButtonInfo}
          totalPrice={this.state.totalPrice}
        />
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
