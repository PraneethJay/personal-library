import React, { useState, useEffect } from 'react';
import { getBooks, deleteBook } from '../api';
import AddBookForm from './AddBookForm';
import EditBookForm from './EditBookForm';
import ConfirmationModal from './ConfirmationModal'; // Import the ConfirmationModal
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Dashboard.css'; // Import the Dashboard CSS

// Import the default image
import defaultImage from '../assets/book2.jpg'; // Adjust the path as necessary

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [showEditBookForm, setShowEditBookForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [bookToDelete, setBookToDelete] = useState(null); // State to keep track of the book to delete

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchBooks(search);
  }, [search]);

  const fetchBooks = async (query = '') => {
    try {
      setLoading(true);
      const data = await getBooks(query);
      setBooks(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setBookToDelete(id);
    setShowConfirmModal(true); // Show confirmation modal
  };

  const handleConfirmDelete = async () => {
    if (bookToDelete) {
      try {
        await deleteBook(bookToDelete);
        fetchBooks(search); // Refresh the book list
      } catch (err) {
        console.error(`Error deleting book: ${err}`); // Log the error
      }
      setBookToDelete(null); // Clear book to delete
    }
    setShowConfirmModal(false); // Hide confirmation modal
  };

  const handleCancelDelete = () => {
    setBookToDelete(null); // Clear book to delete
    setShowConfirmModal(false); // Hide confirmation modal
  };

  const handleSearch = () => {
    fetchBooks(search);
  };

  const handleAddBook = () => {
    setShowAddBookForm(true);
  };

  const handleAddBookClose = () => {
    setShowAddBookForm(false);
    fetchBooks(search); // Refresh the book list when closing the form
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setShowEditBookForm(true);
  };

  const handleEditBookClose = () => {
    setShowEditBookForm(false);
    setSelectedBook(null);
    fetchBooks(search); // Refresh the book list when closing the form
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/'); // Redirect to login page
  };

  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Dashboard</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/books">Books</a></li>
          <li><a href="#" onClick={handleSignOut}>Sign Out</a></li>
        </ul>
      </div>
      <div className="main-content">
        <h2>Book List</h2>
        <div className="button-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
        <div className="total-books">
            <p>Total Books: {books.length}</p>
            <button className="btn btn-primary" onClick={handleAddBook}>Add Book</button>
        </div>
        <AddBookForm show={showAddBookForm} onClose={handleAddBookClose} />
        <EditBookForm show={showEditBookForm} book={selectedBook} onClose={handleEditBookClose} />
        <ConfirmationModal
          show={showConfirmModal}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          message="Are you sure you want to delete this book?"
        />
        <div className="book-list">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error.message}</p>
          ) : (
            <>
              {books.map((book) => (
                <div className="book-card" key={book.id}>
                  <p><strong></strong> 
                    <img 
                    //   src={book.cover_image || defaultImage} 
                      src={defaultImage} 
                      alt={`${book.title} cover`} 
                      style={{ width: '100px', height: 'auto' }} 
                    />
                  </p>
                  <h4>{book.title}</h4>
                  <p><strong>Author:</strong> {book.author}</p>
                  <p><strong>Publication Date:</strong> {book.publication_date || 'N/A'}</p>
                  <p><strong>ISBN:</strong> {book.isbn || 'N/A'}</p>
                  
                  <div className="actions">
                    <button className="btn-edit" onClick={() => handleEditBook(book)}>Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(book.id)}>Delete</button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookList;
