import React from 'react';

import cssClasses from './Items.css';

import Item from './Item/Item';

const Items = () => (
  <ul className={cssClasses.Items}>
    <Item link="/" active>
      Burger Builder
    </Item>
    <Item link="/">Checkout</Item>
  </ul>
);

export default Items;
