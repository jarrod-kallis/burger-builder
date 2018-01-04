import React from 'react';

import cssClasses from './Items.css';

import Item from './Item/Item';

const Items = () => (
  <ul className={cssClasses.Items}>
    <Item link="/" exact>
      Burger Builder
    </Item>
    <Item link="/orders">Orders</Item>
  </ul>
);

export default Items;
