import React from 'react';

import axios from '../../axios-orders';
import Order from '../../components/Order/Order';
import Spinner from '../../components/UI/Spinner/Spinner';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends React.Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    axios
      .get('/orders.json')
      .then(response => {
        console.log(response.data);

        const orders = Object.keys(response.data).map(orderKey => ({
          id: orderKey,
          ...response.data[orderKey]
        }));

        this.setState({
          orders,
          loading: false
        });
      })
      .catch(() => this.setState({ loading: false }));
  }

  render() {
    return (
      <Auxillary>
        {this.state.loading ? (
          <Spinner />
        ) : (
          <div>
            {this.state.orders.map(order => (
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

export default withErrorHandler(Orders, axios);
