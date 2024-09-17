import React, { useState } from 'react';
import '../styles/nav.css'; // Importing styles specific to the Navigation component

const authModal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);

  const handleOpenLoginModal = () => setLoginModalOpen(true);
  const handleCloseLoginModal = () => setLoginModalOpen(false);
  
  const handleOpenSignupModal = () => setSignupModalOpen(true);
  const handleCloseSignupModal = () => setSignupModalOpen(false);

  return (
    <>
      {/* Log in modal start */}
      {isLoginModalOpen && (
        <div id="login-modal" className="modal">
          <form className="modal-content animate" id="login-form">
            <div className="imgcontainer">
              <span onClick={handleCloseLoginModal} className="close" title="Close Modal">&times;</span>
            </div>
            <div className="modal-container">
              <span className="modal-headline">
                <h1>Sign In</h1>
              </span>
              <label htmlFor="username"><b>Username</b></label>
              <input
                type="text"
                className="modal-input"
                placeholder="Enter Username"
                name="username"
                id="username"
                autoComplete="username"
                required
              />
              <label htmlFor="password"><b>Password</b></label>
              <input
                type="password"
                id="password"
                name="password"
                className="modal-input"
                placeholder="Enter Password"
                autoComplete="current-password"
                required
              />
              <button type="submit" className="modal-button">Login</button>
            </div>

            <div className="nav-element nav-button">
              <button
                type="button"
                onClick={handleOpenSignupModal}
                className="signup-button"
              >
                Sign Up
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Log in modal end */}

      {/* Sign up modal start */}
      {isSignupModalOpen && (
        <div id="signup-modal" className="modal">
          <form className="modal-content animate" id="signup-form">
            <div className="imgcontainer">
              <span onClick={handleCloseSignupModal} className="close" title="Close Modal">&times;</span>
            </div>

            <div className="modal-container">
              <span className="modal-headline">
                <h1>Sign Up</h1>
              </span>
              <label htmlFor="signup-username"><b>Username</b></label>
              <input
                type="text"
                className="modal-input"
                placeholder="Enter Username"
                name="username"
                id="signup-username"
                autoComplete="username"
                required
              />
              <label htmlFor="signup-email"><b>Email</b></label>
              <input
                type="email"
                className="modal-input"
                placeholder="Enter Email"
                name="email"
                id="signup-email"
                autoComplete="email"
                required
              />
              <label htmlFor="signup-password"><b>Password</b></label>
              <input
                type="password"
                className="modal-input"
                placeholder="Enter Password"
                name="password"
                id="signup-password"
                required
              />
              <button type="submit" className="modal-button">Sign Up</button>
            </div>

            <div className="nav-element nav-button">
              <button
                type="button"
                onClick={handleOpenLoginModal}
                className="login-button"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Sign up modal end */}
    </>
  );
};

export default authModal;
