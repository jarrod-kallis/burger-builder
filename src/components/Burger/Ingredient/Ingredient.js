import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Ingredient.css';

import { BREAD_BOTTOM, BREAD_TOP } from '../../../types';
import { toTitleCase } from '../../../utils/stringUtils';

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
    default:
      ingredient = <div className={cssClasses[toTitleCase(type)]} />;
  }

  return ingredient;
};

Ingredient.propTypes = {
  type: PropTypes.oneOfType([
    PropTypes.string.isRequired
  ]).isRequired
};

export default Ingredient;
