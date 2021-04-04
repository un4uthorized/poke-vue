import axios from 'axios';

const req = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
});

export default req;
