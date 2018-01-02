import axios from 'axios';

export default axios.create({
    baseURL: 'https://burger-builder-api.firebaseio.com/'
});
