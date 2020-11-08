import axios from 'axios';


const api = axios.create({
	baseURL: 'https://primeproperties.com.br/api/'
});

export const api_test = axios.create({
	baseURL: 'http://localhost:3004'
});

export const wp_api = axios.create({
	baseURL: 'https://primeproperties.com.br/blogdash/wp-json/wp/v2/'
});

export default api;
