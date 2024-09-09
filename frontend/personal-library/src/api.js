import axios from 'axios';

const apiUrl = 'http://127.0.0.1:8000/api/books/';

const getBooks = async (query = '') => {
  const response = await axios.get(`${apiUrl}?title=${query}`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const updateBook = async (id, data) => {
  const response = await axios.put(`${apiUrl}${id}/`, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

const deleteBook = async (id) => {
  await axios.delete(`${apiUrl}${id}/`, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
};

const createBook = async (data) => {
  const response = await axios.post(apiUrl, data, {
    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
  });
  return response.data;
};

export { getBooks, updateBook, deleteBook, createBook };
