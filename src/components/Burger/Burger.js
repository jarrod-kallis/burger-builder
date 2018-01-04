import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './Burger.css';

import { BREAD_TOP, BREAD_BOTTOM } from '../../types';
import Ingredient from './Ingredient/Ingredient';

const Burger = ({ ingredients, overrideClassName }) => {
  let ingredientComponents = Object.keys(ingredients)
    .map(ingredientKey => {
      const amount = ingredients[ingredientKey];

      // My way
      // const ingredientArray = [];
      // for (let i = 0; i < amount; i++) {
      //   ingredientArray.push(<Ingredient key={Math.random()} type={ingredientKey} />);
      // }
      // return ingredientArray;

      // Tutorial way
      return [...Array(amount)].map(() => (
        <Ingredient key={Math.random()} type={ingredientKey} />
      ));
    })
    .reduce(
      (previousArray, ingredientComponentArray) =>
        // concat: Combines 2 or more arrays
        previousArray.concat(ingredientComponentArray),
      []
    );

  if (ingredientComponents.length === 0) {
    ingredientComponents = <p>Please add ingredients!</p>;
  }

  return (
    <div
      className={
        overrideClassName
          ? `${overrideClassName} ${cssClasses.Burger}`
          : cssClasses.Burger
      }
    >
      <Ingredient type={BREAD_TOP} />
      {ingredientComponents}
      <Ingredient type={BREAD_BOTTOM} />
    </div>
  );
};

Burger.defaultProps = {
  overrideClassName: null
};

Burger.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  overrideClassName: PropTypes.string
};

export default Burger;
