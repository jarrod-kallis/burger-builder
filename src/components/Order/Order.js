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
          padding: '5px'
        }}
      >
        {props.ingredients[ingredientKey]} x {toTitleCase(ingredientKey)}
      </span>
    ));

  return (
    <div className={cssClasses.Order}>
      <p style={{ display: 'inline-block' }}>
        <b>Ingredients:</b> {ingredients}
      </p>
      <Burger
        overrideClassName={cssClasses.Burger}
        ingredients={props.ingredients}
      />
      <p>
        <strong>Price: ${props.price}</strong>
      </p>
    </div>
  );
};

Order.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  price: PropTypes.number.isRequired
};

export default Order;
