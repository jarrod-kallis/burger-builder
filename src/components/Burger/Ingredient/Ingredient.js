import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Ingredient.css';

import { BREAD_BOTTOM, BREAD_TOP, MEAT, CHEESE, SALAD, BACON } from '../../../types';

const Ingredient = ({ type }) => {
  let ingredient = null;

  switch (type) {
    case (BREAD_BOTTOM):
      ingredient = <div className={cssClasses.BreadBottom} />
      break;
    case (BREAD_TOP):
      ingredient = (
        <div className={cssClasses.BreadTop}>
          <div className={cssClasses.Seeds1} />
          <div className={cssClasses.Seeds2} />
        </div>
      )
      break;
    case (MEAT):
      ingredient = <div className={cssClasses.Meat} />
      break;
    case (CHEESE):
      ingredient = <div className={cssClasses.Cheese} />
      break;
    case (SALAD):
      ingredient = <div className={cssClasses.Salad} />
      break;
    case (BACON):
      ingredient = <div className={cssClasses.Bacon} />
      break;
    default:
      ingredient = null;
  }

  return ingredient;
};

Ingredient.propTypes = {
  type: PropTypes.oneOf([
    BREAD_BOTTOM, BREAD_TOP, MEAT, CHEESE, SALAD, BACON
  ]).isRequired
};

export default Ingredient;
