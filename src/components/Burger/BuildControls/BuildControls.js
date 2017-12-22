import React from 'react';

import cssClasses from './BuildControls.css';

import { SALAD, BACON, CHEESE, MEAT } from '../../../types';
import BuildControl from './BuildControl/BuildControl';
import { toTitleCase } from '../../../utils/stringUtils';

const controls = [
  { label: toTitleCase(SALAD), type: SALAD },
  { label: toTitleCase(BACON), type: BACON },
  { label: toTitleCase(CHEESE), type: CHEESE },
  { label: toTitleCase(MEAT), type: MEAT }
]

const BuildControls = ({onAddIngredient}) => (
  <div className={cssClasses.BuildControls}>
    {controls.map(control => <BuildControl key={control.type} label={control.label} onAddIngredient={onAddIngredient}/>)}
  </div>
);

export default BuildControls;
