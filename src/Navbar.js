import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import NavIcon2 from './assets/icon.jpg';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check local storage for the token on component mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token); // Update isLoggedIn based on token existence
  }, []);

  const handleLogout = () => {
    // Remove the token from local storage to log the user out
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-icons">
        <img src={NavIcon2} alt="Icon 2" />
      </div>
      <div className="navbar-links">
        <Link to="/" className="nav-item">
          Home
        </Link>
        <Link to="/Overview" className="nav-item">
          Overview
        </Link>
        <div className="dropdown">
          <div className='dropdown-menu'> Forums
            <div className="dropdown-content">
              <Link to="/Forum" className="dropdown-item">
                Forum
              </Link>
              <Link to="/Share" className="dropdown-item">
                Share Your Experience
              </Link>
            </div>
          </div>
        </div>
        {isLoggedIn && ( // Render the "Profile" link only if the user is logged in
          <Link to="/Profile" className="nav-item">
            Profile
          </Link>
        )}
        {isLoggedIn ? ( // Render different content based on login status
          <button className="login-button" onClick={handleLogout}>
            Log out
          </button>
        ) : (
          <Link to="/Login" className="login-button">
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
