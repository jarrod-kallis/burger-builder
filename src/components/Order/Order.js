import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Order.css';

import Burger from '../Burger/Burger';
import { toTitleCase } from '../../utils/stringUtils';

const Order = props => {
  const ingredients = Object.keys(props.ingredients)
    .filter(ingredientKey => props.ingredients[ingredientKey] > 0)
    .map(ingredientKey => (
      <span
        key={ingredientKey}
        style={{
          // textTransform: 'capitalize',
          display: 'inline-block',
          margin: '5px 8px',
          border: '1px solid #ccc',
          padding: '5px',
          width: '90px'
        }}
      >
        {props.ingredients[ingredientKey]} x {toTitleCase(ingredientKey)}
      </span>
    ));

  return (
    <div className={cssClasses.Order}>
      <p style={{ display: 'inline-block', margin: '0 auto' }}>
        <b>Ingredients:</b> {ingredients}
      </p>
      <Burger
        overrideClassName={cssClasses.Burger}
        ingredients={props.ingredients}
      />
      <p style={{ margin: 0 }}>
        <strong>Price: ${props.price.toFixed(2)}</strong>
      </p>
      <p style={{ margin: '10px 0' }}>
        <strong>Delivery Method: {toTitleCase(props.deliveryMethod)}</strong>
      </p>
    </div>
  );
};

Order.defaultProps = {
  deliveryMethod: ''
};

Order.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  price: PropTypes.number.isRequired,
  deliveryMethod: PropTypes.string
};

export default Order;
