import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { get as getOrders } from '../../actions/order';

class Orders extends React.Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.props
      .getOrders()
      .then(() => this.setState({ loading: false }))
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    const ordersArray = Object.keys(this.props.orders).map(orderKey => ({
      id: orderKey,
      ...this.props.orders[orderKey]
    }));

    return (
      <Auxillary>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            {ordersArray.map(order => (
              <Order
                key={order.id}
                ingredients={order.ingredients}
                price={order.price}
                deliveryMethod={order.deliveryMethod}
              />
            ))}
          </div>
        )}
      </Auxillary>
    );
  }
}

Orders.defaultProps = {
  orders: {}
};

Orders.propTypes = {
  orders: PropTypes.shape({
    ingredients: PropTypes.shape(),
    price: PropTypes.number,
    deliveryMethod: PropTypes.string
  }),
  getOrders: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  orders: state.order.orders
});

export default connect(mapStateToProps, { getOrders })(
  withErrorHandler(Orders, axios)
);
