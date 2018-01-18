import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import { placeOrder } from '../../actions/order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

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

    this.setState({
      loading: true
    });

    this.props
      .placeOrder(orderWithCustomerDetails)
      .then(() => {
        this.setState({
          loading: false
        });

        this.props.history.replace('/');
      })
      .catch(() => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    const { ingredients, currentOrder } = this.props;

    return (
      <div>
        {this.state.loading ? (
          <Spinner />
        ) : (
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
        )}
      </div>
    );
  }
}

Checkout.defaultProps = {
  // customer: null,
  currentOrder: null
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
  currentOrder: PropTypes.shape()
  // customer: PropTypes.shape()
};

const mapStateToProps = state => ({
  ingredients: state.burger.ingredients,
  totalPrice: state.burger.totalPrice,
  currentOrder: state.order.currentOrder
  // customer: state.order.currentOrder.customer
});

const mapDispatchToProps = dispatch => ({
  placeOrder: order => dispatch(placeOrder(order))
});

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(Checkout, axios)
);
