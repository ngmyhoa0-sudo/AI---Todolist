import axios from "axios";

const API_URL = "http://localhost:8000";

export const getTodos = () =>
  axios.get(`${API_URL}/todos`);

export const createTodo = (todo) =>
  axios.post(`${API_URL}/todos`, todo);

export const updateTodo = (id, todo) =>
  axios.put(`${API_URL}/todos/${id}`, todo);

export const deleteTodo = (id) =>
  axios.delete(`${API_URL}/todos/${id}`);
