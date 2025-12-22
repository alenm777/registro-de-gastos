import api from "./api";

export const getTransactions = () => {
  return api.get("/transactions");
};

export const createTransaction = data => {
  return api.post("/transactions", data);
};

export const deleteTransaction = id => {
  return api.delete(`/transactions/${id}`);
};