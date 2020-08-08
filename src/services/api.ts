import axios from 'axios';

const api = axios.create({
  /* Como estamos utilizando o expo, esse endereço é o mesmo endereço do aplicativo mobile on Expo Developer que abre toda vez que damos yarn start, e apenas trocamos a palavra exp por http e a porta por 3333(porta do nosso servidor back api) */
  baseURL: 'http://192.168.0.156:3333'
});

export default api;