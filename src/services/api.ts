import axios from 'axios';

export const api = axios.create({
  // baseURL: 'http://192.168.0.196:3333'

  baseURL: 'http://sacamais.com.br',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const options = {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}