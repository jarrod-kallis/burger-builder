import React from 'react';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const BASE_PRICE = 4;

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {},
    ingredientPrices: {},
    totalPrice: BASE_PRICE, // Base price of burger
    allowedToPurchase: false, // Allowed to purchase the burger
    isPurchasing: false, // Has the user clicked the 'Place Order' button
    loading: true
  };

  componentDidMount() {
    axios
      .get('/ingredients.json')
      .then(ingredients => {
        axios
          .get('/ingredient-prices.json')
          .then(ingredientPrices =>
            this.setState({
              ingredients: ingredients.data,
              ingredientPrices: ingredientPrices.data,
              loading: false
            })
          )
          .catch(() =>
            this.setState({
              loading: false
            })
          );
      })
      .catch(() =>
        this.setState({
          loading: false
        })
      );
  }

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
    this.props.history.push({
      pathname: '/checkout',
      search: `?ingredients=${encodeURIComponent(
        JSON.stringify(this.state.ingredients)
      )}&price=${this.state.totalPrice.toFixed(2)}`
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
      this.state.totalPrice + this.state.ingredientPrices[ingredientType];

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
        this.state.totalPrice - this.state.ingredientPrices[ingredientType];

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

    const orderSummary = this.state.loading ? (
      <Spinner />
    ) : (
      <OrderSummary
        ingredients={this.state.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
        totalPrice={this.state.totalPrice}
      />
    );

    return (
      <Auxillary>
        <Modal
          show={this.state.isPurchasing}
          closeModal={this.cancelPurchaseHandler}
        >
          {orderSummary}
        </Modal>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <Auxillary>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls
              ingredients={this.state.ingredients}
              onAdd={this.addIngredientHandler}
              onRemove={this.removeIngredientHandler}
              onPlaceOrder={this.onPlaceOrderHandler}
              disabledRemoveButtonInfo={disabledRemoveButtonInfo}
              totalPrice={this.state.totalPrice}
              allowedToPurchase={this.state.allowedToPurchase}
            />
          </Auxillary>
        )}
      </Auxillary>
    );
  }
}

BurgerBuilder.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withErrorHandler(BurgerBuilder, axios);
