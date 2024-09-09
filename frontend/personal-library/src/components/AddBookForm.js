import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Modal, Button, Form, Spinner, Alert } from 'react-bootstrap';
import { createBook } from '../api';

const AddBookForm = ({ show, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publicationDate, setPublicationDate] = useState('');
  const [isbn, setIsbn] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (setter) => (e) => setter(e.target.value);

  const handleAdd = async () => {
    if (!title || !author) {
      setError('Title and Author are required');
      return;
    }
    setLoading(true);
    setError(null); // Clear any existing error before making the API call
    try {
      const response = await createBook({ title, author, publication_date: publicationDate, isbn });
    //   console.log('Book added successfully:', response); // Debugging the response

      // Clear form fields and notify parent component if response is successful
      setTitle('');
      setAuthor('');
      setPublicationDate('');
      setIsbn('');
      if (typeof onAdd === 'function') {
        onAdd(); // Notify the parent component to refresh the book list
      }
      onClose(); // Close the modal after adding the book
    //   alert('Book added successfully!'); // Add user feedback
    } catch (err) {
      // Log the actual error for debugging
      console.error('Error adding book:', err);
      // Display a more general error message
      setError('Error adding book. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>} {/* Improved error display */}
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={handleChange(setTitle)}
              placeholder="Enter book title"
              disabled={loading}
              required
            />
          </Form.Group>
          <Form.Group controlId="formAuthor">
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              value={author}
              onChange={handleChange(setAuthor)}
              placeholder="Enter author's name"
              disabled={loading}
              required
            />
          </Form.Group>
          <Form.Group controlId="formPublicationDate">
            <Form.Label>Publication Date</Form.Label>
            <Form.Control
              type="date"
              value={publicationDate}
              onChange={handleChange(setPublicationDate)}
              disabled={loading}
            />
          </Form.Group>
          <Form.Group controlId="formIsbn">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={isbn}
              onChange={handleChange(setIsbn)}
              placeholder="Enter ISBN number"
              disabled={loading}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={loading}>Close</Button>
        <Button variant="primary" onClick={handleAdd} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : 'Add Book'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

// Define prop types
AddBookForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAdd: PropTypes.func // Optional
};

// Set default prop values
AddBookForm.defaultProps = {
  onAdd: () => {} // Default no-op function
};

export default AddBookForm;
