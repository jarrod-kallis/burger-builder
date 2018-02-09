import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Items from './Items';
import Item from './Item/Item';

// Connect enzyme
configure({ adapter: new Adapter() });

describe('<Navigation.Items />', () => {
  let wrapper;
  beforeEach(() => {
    // 'shallow' renders the component and it's immediate content, but the children content isn't deeply rendered
    wrapper = shallow(<Items />);
  });

  it('should render 2 <Navigation.Items.Item /> elements if user isn\'t authenticated', () => {
    expect(wrapper.find(Item)).toHaveLength(2);
  });

  it('should render 3 <Navigation.Items.Item /> elements if user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });
    expect(wrapper.find(Item)).toHaveLength(3);
  });

  it('should render the logout <Navigation.Items.Item /> element if user is authenticated', () => {
    wrapper.setProps({ isAuthenticated: true });

    const items = wrapper
      .find(Item)
      .map(item => item)
      .filter(
        item =>
          item.props().link === '/logout' && item.props().children === 'Logout'
      );
    // .map(item => item.children())
    // .filter(child => child.text() === 'Logout');

    expect(items).toHaveLength(1);
  });
});
