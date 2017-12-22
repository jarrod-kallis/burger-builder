import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import { SALAD, CHEESE, BACON, MEAT } from '../../types';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      [SALAD]: 0,
      [BACON]: 0,
      [CHEESE]: 0,
      [MEAT]: 0
    }
  };

  addIngredientHandler = (ingredientType) => {
    const ingredients = {
      ...this.state.ingredients,
      [ingredientType]: this.state.ingredients[ingredientType] + 1
    };

    this.setState({
      ingredients
    });
  }

  render() {
    return (
      <Auxillary>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls onAddIngredient={this.addIngredientHandler}/>
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
