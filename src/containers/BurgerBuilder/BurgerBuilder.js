import React from 'react';

import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import { SALAD, CHEESE, BACON, MEAT } from '../../types';

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      [SALAD]: 0,
      [BACON]: 0,
      [CHEESE]: 0,
      [MEAT]: 0
    }
  };

  render() {
    return (
      <Auxillary>
        <Burger ingredients={this.state.ingredients} />
        <div>Build Controls</div>
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
