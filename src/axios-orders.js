import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://burger-builder-api.firebaseio.com/'
});

export default axiosInstance;
