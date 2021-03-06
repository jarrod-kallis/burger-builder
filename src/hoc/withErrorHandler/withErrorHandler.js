import React from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Auxillary from '../Auxillary/Auxillary';
import parseError from '../../utils/errors/parseError';

const withErrorHandler = (WrappedComponent, axiosInstance) =>
  class extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        error: null
      };

      this.requestInterceptor = null;
      this.responseInterceptor = null;
    }

    componentWillMount() {
      this.requestInterceptor = axiosInstance.interceptors.request.use(
        request => {
          this.closeErrorHandler();
          return request;
        }
      );

      this.responseInterceptor = axiosInstance.interceptors.response.use(
        response => response,
        error => {
          this.setState({
            error
          });

          throw error;
        }
      );
    }

    componentWillUnmount() {
      // console.log('[withErrorHandler] will unmount');
      axiosInstance.interceptors.request.eject(this.requestInterceptor);
      axiosInstance.interceptors.response.eject(this.responseInterceptor);
    }

    closeErrorHandler = () => {
      this.setState({ error: null });
    };

    render() {
      const { error } = this.state;

      return (
        <Auxillary>
          <Modal show={!!error} closeModal={this.closeErrorHandler}>
            <p>{error ? parseError(error) : null}</p>
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxillary>
      );
    }
  };

export default withErrorHandler;
