import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './CheckoutSummary.css';

import Burger from '../../Burger/Burger';
import DangerButton from '../../UI/Button/DangerButton';
import SuccessButton from '../../UI/Button/SuccessButton';

const CheckoutSummary = props => (
  <div className={cssClasses.CheckoutSummary}>
    <h1>Hope it tastes as good as this looks!</h1>
    <div style={{ width: '100%', margin: 'auto' }}>
      <Burger ingredients={props.ingredients} />
    </div>
    <DangerButton onClick={props.cancelPurchase}>Cancel</DangerButton>
    <SuccessButton onClick={props.continuePurchase}>Continue</SuccessButton>
  </div>
);

CheckoutSummary.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  cancelPurchase: PropTypes.func.isRequired,
  continuePurchase: PropTypes.func.isRequired
};

export default CheckoutSummary;
