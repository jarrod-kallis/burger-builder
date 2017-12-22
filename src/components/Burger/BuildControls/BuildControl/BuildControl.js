import React from 'react';
import PropTypes from 'prop-types';

import cssClasses from './BuildControl.css';

const BuildControl = (props) => (
  <div className={cssClasses.BuildControl}>
    <div className={cssClasses.Label}>{props.label}</div>
    <button className={cssClasses.Less} onClick={}>Less</button>
    <button className={cssClasses.More}>More</button>
  </div>
);

BuildControl.propTypes = {
  label: PropTypes.string.isRequired
};

export default BuildControl;
