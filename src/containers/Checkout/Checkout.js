import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import axios from '../../axios-orders';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactDetails from './ContactDetails/ContactDetails';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';

class Checkout extends React.Component {
  constructor(props) {
    super(props);

    const params = new URLSearchParams(this.props.location.search);
    const ingredients = JSON.parse(params.get('ingredients'));
    const price = +params.get('price');

    this.state = {
      ingredients,
      price,
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

  placeOrderHandler = contactDetails => {
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.price
      // customer: {
      //   name: contactDetails.name,
      //   address: contactDetails.address,
      //   email: contactDetails.email
      // },
      // deliveryMethod: 'fastest'
    };

    const customerDetailsOrder = Object.keys(contactDetails).reduce(
      (prevObj, key) => ({
        ...prevObj,
        customer: {
          ...prevObj.customer,
          [key]: contactDetails[key].value
        }
      }),
      order
    );

    this.setState({
      loading: true
    });

    axios
      .post('/orders.json', customerDetailsOrder)
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
    const params = new URLSearchParams(this.props.location.search);
    const ingredients = JSON.parse(params.get('ingredients'));

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
                <ContactDetails onOrderClicked={this.placeOrderHandler} />
              )}
            />
          </Auxillary>
        )}
      </div>
    );
  }
}

Checkout.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired
  }).isRequired,
  history: PropTypes.shape({
    goBack: PropTypes.func.isRequired,
    replace: PropTypes.func.isRequired
  }).isRequired,
  match: PropTypes.shape({
    url: PropTypes.string.isRequired
  }).isRequired
};

export default Checkout;
