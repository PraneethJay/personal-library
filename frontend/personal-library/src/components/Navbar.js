import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isBooksPage = location.pathname === '/books';

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {isLoggedIn && !isBooksPage && (
              <li className="nav-item">
                <Link className="nav-link" to="/books">Books</Link>
              </li>
            )}
          </ul>
          <ul className="navbar-nav ms-auto">
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleSignOut} aria-label="Sign Out">Sign Out</button>
              </li>
            ) : (
              !isBooksPage && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
