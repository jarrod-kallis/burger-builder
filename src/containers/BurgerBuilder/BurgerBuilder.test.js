import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { BurgerBuilder } from './BurgerBuilder';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

configure({ adapter: new Adapter() });

describe('<BurgerBuilder />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <BurgerBuilder
        ingredients={{ salad: 0 }}
        totalPrice={0}
        addIngredient={() => {}}
        removeIngredient={() => {}}
        history={{ push: () => {} }}
        reset={() => {}}
        fetchIngredients={() => {}}
        fetchIngredientPrices={() => {}}
        setRedirectUrl={() => {}}
      />
    );
  });

  it('should render <BuildControls /> element when receiving ingredients', () => {
    // wrapper.setProps({ ingredients: { salad: 0 } });
    wrapper.setState({ loading: false });
    // console.log(wrapper.debug());
    expect(wrapper.find(BuildControls)).toHaveLength(1);
  });
});
