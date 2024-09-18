import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import './authModal.css';

const AuthModal = ({ handleOpenLoginModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { error }] = useMutation(LOGIN_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      // Handle successful login (e.g., save token, redirect to profile)
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Login Modal */}
      <div className="modal">
        <form onSubmit={handleLogin} className="modal-content">
          <div className="container">
            <label htmlFor="login-email"><b>Email</b></label>
            <input
              type="email"
              className="modal-input"
              placeholder="Enter Email"
              name="email"
              id="login-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="login-password"><b>Password</b></label>
            <input
              type="password"
              className="modal-input"
              placeholder="Enter Password"
              name="password"
              id="login-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="modal-button">Log In</button>
          </div>
        </form>
      </div>
      {/* Login Modal End */}
    </>
  );
};

export default AuthModal;