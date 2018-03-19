import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import { placeOrder } from '../../actions/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Checkout extends React.Component {
  cancelPurchaseHandler = () => {
    this.props.history.goBack();
  };

  continuePurchaseHandler = () => {
    this.props.history.replace({
      pathname: `${this.props.match.url}/contact-details`,
      search: this.props.location.search
    });
  };

  buildOrderObject = contactDetails => {
    const result = Object.entries(contactDetails).reduce((prev, [key]) => {
      if (contactDetails[key].elementType) {
        return {
          ...prev,
          [key]: contactDetails[key].value
        };
      }

      return {
        [key]: this.buildOrderObject(contactDetails[key])
      };
    }, {});

    return result;
  };

  placeOrderHandler = contactDetails => {
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice
    };

    const orderWithCustomerDetails = {
      ...order,
      ...this.buildOrderObject(contactDetails)
    };

    this.props.placeOrder(orderWithCustomerDetails);
  };

  render() {
    const { ingredients, currentOrder } = this.props;

    const checkoutSummary =
      _.isEmpty(ingredients) === false ? (
        <Auxillary>
          <CheckoutSummary
            ingredients={ingredients}
            cancelPurchase={this.cancelPurchaseHandler}
            continuePurchase={this.continuePurchaseHandler}
          />
          <Route
            path={`${this.props.match.url}/contact-details`}
            render={() => (
              <ContactDetails
                onOrderClicked={this.placeOrderHandler}
                currentOrder={currentOrder}
              />
            )}
          />
        </Auxillary>
      ) : (
        <Redirect to="/" />
      );

    return <div>{this.props.loading ? <Spinner /> : checkoutSummary}</div>;
  }
}

Checkout.defaultProps = {
  currentOrder: null,
  loading: false
};

Checkout.propTypes = {
  ingredients: PropTypes.shape().isRequired,
  totalPrice: PropTypes.number.isRequired,
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired,
  placeOrder: PropTypes.func.isRequired,
  currentOrder: PropTypes.shape(),
  loading: PropTypes.bool
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  currentOrder: state.order.currentOrder,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  placeOrder: order => dispatch(placeOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Checkout, axios)
);
