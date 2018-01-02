import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axiosInstance) => class extends React.Component {
  state = {
    error: null
  }

  componentWillMount() {
    axiosInstance.interceptors.request.use(request => {
      this.closeErrorHandler();
      return request;
    });

    axiosInstance.interceptors.response.use(response => response,
      error =>
        this.setState({
          error
        }));
  }

  closeErrorHandler = () => {
    this.setState({ error: null })
  }

  render() {
    const { error } = this.state;

    return (
      <Auxillary>
        <Modal show={!!error} closeModal={this.closeErrorHandler}>
          <p>{error ? error.message : null}</p>
        </Modal>
        <WrappedComponent {...this.props} />
      </Auxillary>
    );
  }
}

export default withErrorHandler;
