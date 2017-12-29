import React from 'react';
import PropTypes from 'prop-types';

import Auxillary from '../../../hoc/Auxillary';

const OrderSummary = props => {
  const ingredientSummary = Object.keys(props.ingredients).map(
    ingredientKey => (
      <li key={ingredientKey}>
        {/* toTitleCase() */}
        <span style={{ textTransform: 'capitalize' }}>
          {ingredientKey}
        </span>: {props.ingredients[ingredientKey]}
      </li>
    )
  );
  return (
    <Auxillary>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Proceed to check out?</p>
    </Auxillary>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.shape().isRequired
};

export default OrderSummary;
