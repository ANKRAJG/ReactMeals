import axios from 'axios';

const API =  axios.create({
    baseURL: 'https://react-meals-9cfa2-default-rtdb.firebaseio.com'
});

export default API;