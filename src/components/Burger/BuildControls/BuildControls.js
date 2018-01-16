import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './BuildControls.css';

import BuildControl from './BuildControl/BuildControl';
import { toTitleCase } from '../../../utils/stringUtils';

class BuildControls extends React.Component {
  constructor(props) {
    super(props);

    const controls = Object.keys(this.props.ingredients).map(ingredientKey => ({
      type: ingredientKey,
      label: toTitleCase(ingredientKey)
    }));

    this.state = {
      controls
    };
  }

  render() {
    const {
      onAdd,
      onRemove,
      disabledRemoveButtonInfo,
      totalPrice,
      allowedToPurchase,
      onPlaceOrder
    } = this.props;

    return (
      <div className={cssClasses.BuildControls}>
        <p className={cssClasses.Price}>
          Current Price: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        {this.state.controls.map(control => (
          <BuildControl
            key={control.type}
            label={control.label}
            type={control.type}
            onAdd={() => onAdd(control.type)}
            onRemove={() => onRemove(control.type)}
            disabledRemoveButtonInfo={disabledRemoveButtonInfo[control.type]}
          />
        ))}
        <button
          className={cssClasses.OrderButton}
          disabled={!allowedToPurchase}
          onClick={onPlaceOrder}
        >
          Place Order
        </button>
      </div>
    );
  }
}

BuildControls.defaultProps = {
  ingredients: {}
};

BuildControls.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
  disabledRemoveButtonInfo: PropTypes.shape({}).isRequired,
  totalPrice: PropTypes.number.isRequired,
  allowedToPurchase: PropTypes.bool.isRequired,
  ingredients: PropTypes.shape({
    type: PropTypes.string,
    label: PropTypes.string
  })
};

export default BuildControls;
