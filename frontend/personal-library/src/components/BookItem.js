import React from 'react';
import { Button } from 'react-bootstrap';

const BookItem = ({ book, onDelete, onEdit }) => {
  return (
    <li className="list-group-item">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h5>{book.title}</h5>
          <p>{book.author}</p>
        </div>
        <div>
          <Button variant="info" className="me-2" onClick={() => onEdit(book)}>Edit</Button>
          <Button variant="danger" onClick={() => onDelete(book.id)}>Delete</Button>
        </div>
      </div>
    </li>
  );
};

export default BookItem;
