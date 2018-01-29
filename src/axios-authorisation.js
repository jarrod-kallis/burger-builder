import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/'
});

export default axiosInstance;
