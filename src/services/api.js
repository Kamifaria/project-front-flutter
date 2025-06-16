import axios from 'axios';

const brazilianAPI = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
const europeanAPI = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

export const getBrazilianProducts = () => axios.get(brazilianAPI);
export const getEuropeanProducts = () => axios.get(europeanAPI);
