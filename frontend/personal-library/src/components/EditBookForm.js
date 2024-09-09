import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { updateBook } from '../api';

const EditBookForm = ({ show, onClose, book }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    if (book) {
      setTitle(book.title || '');
      setAuthor(book.author || '');
      setPublicationDate(book.publication_date || '');
      setIsbn(book.isbn || '');
    }
  }, [book]);

  const handleUpdate = async () => {
    if (!title || !author) {
      setError('Title and Author fields are required.');
      return;
    }

    try {
      await updateBook(book.id, { title, author, publication_date: publicationDate, isbn });
      onClose(); // Close modal after successful update
    } catch (err) {
      setError(`Failed to update book: ${err.message}`);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formPublicationDate">
            <Form.Label>Publication Date</Form.Label>
            <Form.Control
              type="date"
              value={publicationDate}
              onChange={(e) => setPublicationDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={isbn}
              onChange={(e) => setIsbn(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        <Button variant="primary" onClick={handleUpdate}>Update Book</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditBookForm;
