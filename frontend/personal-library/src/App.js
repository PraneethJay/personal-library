import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import BookList from './components/BookList';
import Login from './components/Login';
import Signup from './components/Signup';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));

  return (
    <Router>
      {isLoggedIn && <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />}
      <Routes>
        <Route path="/books" element={<BookList setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
};

export default App;
