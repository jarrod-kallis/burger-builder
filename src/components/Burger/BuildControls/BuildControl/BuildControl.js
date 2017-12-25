import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './BuildControl.css';

const BuildControl = props => (
  <div className={cssClasses.BuildControl}>
    <div className={cssClasses.Label}>{props.label}</div>
    <button
      className={cssClasses.Less}
      onClick={() => props.onRemove(props.type)}
      disabled={props.disabledRemoveButtonInfo}
    >
      Less
    </button>
    <button className={cssClasses.More} onClick={() => props.onAdd(props.type)}>
      More
    </button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  onAdd: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  disabledRemoveButtonInfo: PropTypes.bool.isRequired
};

export default BuildControl;
