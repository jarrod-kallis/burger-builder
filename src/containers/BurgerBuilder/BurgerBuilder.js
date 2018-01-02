import React from 'react';

import axios from '../../axios-orders';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import { SALAD, CHEESE, BACON, MEAT } from '../../types';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const BASE_PRICE = 4;

const INGREDIENT_PRICES = {
  [SALAD]: 0.5,
  [BACON]: 0.7,
  [CHEESE]: 0.4,
  [MEAT]: 1.3
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      [SALAD]: 0,
      [BACON]: 0,
      [CHEESE]: 0,
      [MEAT]: 0
    },
    totalPrice: BASE_PRICE, // Base price of burger
    allowedToPurchase: false, // Allowed to purchase the burger
    isPurchasing: false, // Has the user clicked the 'Place Order' button
    loading: false
  };

  onPlaceOrderHandler = () => {
    this.setState({
      isPurchasing: true
    });
  };

  cancelPurchaseHandler = () => {
    this.setState({
      isPurchasing: false
    });
  };

  continuePurchaseHandler = () => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Jarrod Kallis',
        address: {
          street: '1 Test Street',
          zipCode: '1234',
          country: 'South Africa'
        },
        email: 'me@work.com',
      },
      deliveryMethod: 'fastest'
    };

    this.setState({
      loading: true
    });

    axios.post('/orders.json', order)
      .then(response => {
        console.log(response);
        this.setState({
          loading: false,
          isPurchasing: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loading: false,
          isPurchasing: false
        });
      });
  };

  updateAllowedToPurchase = () => {
    const numberOfIngredients = Object.values(this.state.ingredients)
      .map(amount => amount)
      .reduce((sum, amount) => sum + amount, 0);

    this.setState({
      allowedToPurchase: numberOfIngredients > 0
    });
  };

  addIngredientHandler = ingredientType => {
    const ingredients = {
      ...this.state.ingredients,
      [ingredientType]: this.state.ingredients[ingredientType] + 1
    };

    const totalPrice =
      this.state.totalPrice + INGREDIENT_PRICES[ingredientType];

    this.setState(
      {
        ingredients,
        totalPrice
      },
      () => {
        // this.totalPrice()
        this.updateAllowedToPurchase();
      }
    );
  };

  removeIngredientHandler = ingredientType => {
    if (this.state.ingredients[ingredientType] >= 1) {
      const ingredients = {
        ...this.state.ingredients,
        [ingredientType]: this.state.ingredients[ingredientType] - 1
      };

      const totalPrice =
        this.state.totalPrice - INGREDIENT_PRICES[ingredientType];

      this.setState(
        {
          ingredients,
          totalPrice
        },
        () => {
          // this.totalPrice()
          this.updateAllowedToPurchase();
        }
      );
    }
  };

  // My way to work out the total price
  // totalPrice = () => {
  //   const totalPrice = Object.keys(this.state.ingredients).reduce(
  //     (accumulativePrice, ingredientKey) => {
  //       const amount = this.state.ingredients[ingredientKey];
  //       const price = INGREDIENT_PRICES[ingredientKey];

  //       return accumulativePrice + amount * price;
  //     },
  //     BASE_PRICE
  //   );

  //   this.setState({
  //     totalPrice
  //   });
  // };

  render() {
    let disabledRemoveButtonInfo = {
      ...this.state.ingredients
    };

    disabledRemoveButtonInfo = Object.keys(disabledRemoveButtonInfo).reduce(
      (obj, key) => {
        disabledRemoveButtonInfo[key] = this.state.ingredients[key] < 1;
        return Object.assign(obj, disabledRemoveButtonInfo);
      },
      {}
    );

    // for (const key in disabledRemoveButtonInfo) {
    //   disabledRemoveButtonInfo[key] = this.state.ingredients[key] < 1;
    // }

    const orderSummary = this.state.loading ?
      <Spinner /> :
      <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
        totalPrice={this.state.totalPrice}
      />;

    return (
      <Auxillary>
        <Modal
          show={this.state.isPurchasing}
          closeModal={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          onAdd={this.addIngredientHandler}
          onRemove={this.removeIngredientHandler}
          onPlaceOrder={this.onPlaceOrderHandler}
          disabledRemoveButtonInfo={disabledRemoveButtonInfo}
          totalPrice={this.state.totalPrice}
          allowedToPurchase={this.state.allowedToPurchase}
        />
      </Auxillary>
    );
  }
}

export default BurgerBuilder;
