import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3002/api/v1/',
    // baseURL: 'https://api.suramericacargo.com/api/v1/'
});

export default instance;
