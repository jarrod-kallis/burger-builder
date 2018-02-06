import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {
  reset,
  addIngredient,
  removeIngredient,
  fetchIngredients,
  fetchIngredientPrices
} from '../../actions/burger';

class BurgerBuilder extends React.Component {
  state = {
    isPurchasing: false, // Has the user clicked the 'Place Order' button
    loading: true
  };

  componentDidMount() {
    Promise.all([
      this.props.reset(),
      this.props.fetchIngredients(),
      this.props.fetchIngredientPrices()
    ])
      .then(() => {
        this.setState({
          ...this.state,
          loading: false
        });
      })
      .catch(() => {
        this.setState({
          ...this.state,
          loading: false
        });
      });
  }

  onPlaceOrderHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({
        isPurchasing: true
      });
    } else {
      this.props.history.push('/signup');
    }
  };

  cancelPurchaseHandler = () => {
    this.setState({
      isPurchasing: false
    });
  };

  continuePurchaseHandler = () => {
    this.props.history.push({
      pathname: '/checkout'
      // search: `?ingredients=${encodeURIComponent(
      //   JSON.stringify(this.props.ingredients)
      // )}&price=${this.props.totalPrice.toFixed(2)}`
    });
  };

  updateAllowedToPurchase = ingredients => {
    const numberOfIngredients = Object.values(ingredients)
      .map(amount => amount)
      .reduce((sum, amount) => sum + amount, 0);

    return numberOfIngredients > 0;
  };

  render() {
    let disabledRemoveButtonInfo = {
      ...this.props.ingredients
    };

    disabledRemoveButtonInfo = Object.keys(disabledRemoveButtonInfo).reduce(
      (obj, key) => {
        disabledRemoveButtonInfo[key] = this.props.ingredients[key] < 1;
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
        ingredients={this.props.ingredients}
        cancelPurchase={this.cancelPurchaseHandler}
        continuePurchase={this.continuePurchaseHandler}
        totalPrice={this.props.totalPrice}
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
            <Burger ingredients={this.props.ingredients} />
            <BuildControls
              isAuthenticated={this.props.isAuthenticated}
              /* If any error occurrs then don't supply the ingredients (this is so we can still show a decent home page) */
              ingredients={this.props.error ? {} : this.props.ingredients}
              onAdd={this.props.addIngredient}
              onRemove={this.props.removeIngredient}
              onPlaceOrder={this.onPlaceOrderHandler}
              disabledRemoveButtonInfo={disabledRemoveButtonInfo}
              totalPrice={this.props.totalPrice}
              allowedToPurchase={this.updateAllowedToPurchase(
                this.props.ingredients
              )}
            />
          </Auxillary>
        )}
      </Auxillary>
    );
  }
}

BurgerBuilder.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  ingredients: PropTypes.shape().isRequired,
  totalPrice: PropTypes.number.isRequired,
  addIngredient: PropTypes.func.isRequired,
  removeIngredient: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired,
  reset: PropTypes.func.isRequired,
  fetchIngredients: PropTypes.func.isRequired,
  fetchIngredientPrices: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: !!state.user.user.idToken,
  ingredients: state.burger.ingredients,
  ingredientPrices: state.burger.ingredientPrices,
  totalPrice: state.burger.totalPrice,
  error: state.burger.error
});

const mapDispatchToProps = dispatch => ({
  addIngredient: ingredientType => dispatch(addIngredient(ingredientType)),
  removeIngredient: ingredientType =>
    dispatch(removeIngredient(ingredientType)),
  fetchIngredients: () => dispatch(fetchIngredients()), // (dispatch),
  fetchIngredientPrices: () => dispatch(fetchIngredientPrices()), // (dispatch)
  reset: () => dispatch(reset())
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
