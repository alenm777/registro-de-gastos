import axios from "axios";

const API_URL = "http://127.0.0.1:5000/api/transactions";

export const getTransactions = token => {
  return axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};