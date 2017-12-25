import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './BuildControls.css';

import { SALAD, BACON, CHEESE, MEAT } from '../../../types';
import BuildControl from './BuildControl/BuildControl';
import { toTitleCase } from '../../../utils/stringUtils';

const controls = [
  { label: toTitleCase(SALAD), type: SALAD },
  { label: toTitleCase(BACON), type: BACON },
  { label: toTitleCase(CHEESE), type: CHEESE },
  { label: toTitleCase(MEAT), type: MEAT }
];

const BuildControls = ({
  onAdd,
  onRemove,
  disabledRemoveButtonInfo,
  totalPrice
}) => (
  <div className={cssClasses.BuildControls}>
    <p className={cssClasses.Price}>
      Current Price: <strong>{totalPrice.toFixed(2)}</strong>
    </p>
    {controls.map(control => (
      <BuildControl
        key={control.type}
        label={control.label}
        type={control.type}
        onAdd={onAdd}
        onRemove={onRemove}
        disabledRemoveButtonInfo={disabledRemoveButtonInfo[control.type]}
      />
    ))}
  </div>
);

BuildControls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabledRemoveButtonInfo: PropTypes.shape({}).isRequired,
  totalPrice: PropTypes.bool.isRequired
};

export default BuildControls;
