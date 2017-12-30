import React from 'react';
import PropTypes from 'prop-types';

import Auxillary from '../../../hoc/Auxillary';
import SuccessButton from '../../UI/Button/SuccessButton';
import DangerButton from '../../UI/Button/DangerButton';

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
      <h3>
        Your Order: <strong>${props.totalPrice.toFixed(2)}</strong>
      </h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>Proceed to check out?</p>
      <DangerButton onClick={props.cancelPurchase}>Cancel</DangerButton>
      <SuccessButton onClick={props.continuePurchase}>Continue</SuccessButton>
    </Auxillary>
  );
};

OrderSummary.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired,
  totalPrice: PropTypes.number.isRequired
};

export default OrderSummary;
