import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';

const withErrorHandler = (WrappedComponent, axiosInstance) => class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null
    }

    this.requestInterceptor = null;
    this.responseInterceptor = null;
  }

  componentWillMount() {
    this.requestInterceptor = axiosInstance.interceptors.request.use(request => {
      this.closeErrorHandler();
      return request;
    });

    this.responseInterceptor = axiosInstance.interceptors.response.use(response => response,
      error =>
        this.setState({
          error
        }));
  }

  componentWillUnmount() {
    console.log('[withErrorHandler] will unmount', this.requestInterceptor, this.responseInterceptor);
    axiosInstance.interceptors.request.eject(this.requestInterceptor);
    axiosInstance.interceptors.response.eject(this.responseInterceptor);
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
