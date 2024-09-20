import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER, CREATE_USER } from '../utils/mutations';
import '../styles/nav.css';

const AuthModal = ({ handleOpenLoginModal }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const [createUser, { error: createError }] = useMutation(CREATE_USER);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });
      // Handle successful login (e.g., save token, redirect to profile)
      localStorage.setItem('token', data.loginUser.token);
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: { username, email, password },
      });
      // Handle successful signup (e.g., save token, redirect to profile)
      localStorage.setItem('token', data.createUser.token);
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

      {/* Signup Modal */}
      <div className="modal">
        <form onSubmit={handleSignup} className="modal-content">
          <div className="container">
            <label htmlFor="signup-username"><b>Username</b></label>
            <input
              type="text"
              className="modal-input"
              placeholder="Enter Username"
              name="username"
              id="signup-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="signup-email"><b>Email</b></label>
            <input    
          type="email"
          className="modal-input"
          placeholder="Enter Email"
          name="email"
          id="signup-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
/>
          <label htmlFor="signup-password"><b>Password</b></label>
          <input
            type="password"
            className="modal-input"
            placeholder="Enter Password"
            name="password"
            id="signup-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="modal-button">Sign Up</button>
      </div>
    </form >
</div >
</>
);
};

export default AuthModal;