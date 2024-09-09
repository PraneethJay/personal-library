import React from 'react';
import axios from 'axios';

function DeleteBook({ bookId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/books/${bookId}/`);
      alert('Book deleted successfully');
      onDelete(); // Notify parent component to refresh the book list
    } catch (error) {
      console.error(error);
      alert('Delete failed');
    }
  };

  return (
    <div>
      <button onClick={handleDelete}>Delete Book</button>
    </div>
  );
}

export default DeleteBook;
