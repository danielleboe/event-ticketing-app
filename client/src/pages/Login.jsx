import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { CREATE_USER, LOGIN_USER } from "../utils/mutations";
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loginError, setLoginError] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [registerError, setRegisterError] = useState(false);
  const [createUser] = useMutation(CREATE_USER);
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({
        variables: { email, password },
      });

      console.log("Login response:", data); // Debug log
      if (data && data.loginUser && data.loginUser.user) {
        sessionStorage.setItem("authToken", data.loginUser.token);
        sessionStorage.setItem("userId", data.loginUser.user._id);
        console.log("Auth Token:", sessionStorage.getItem("authToken"));
        onLogin(data.loginUser.user);
        console.log(`loginUser.user`, data.loginUser.user);
        console.log(`Navigating to home page...`); // Debug log
        navigate("/");
      } else {
        console.log("Unexpected response structure:", data);
        setLoginError(true);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginError(true);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createUser({
        variables: { username, email, password },
      });
      // Handle successful registration (e.g., save token, redirect to profile)
      if (data && data.createUser) {
        // Optionally store token and user info in sessionStorage
        sessionStorage.setItem("authToken", data.createUser.token);
        sessionStorage.setItem("userId", data.createUser.user._id);

        onLogin(data.createUser.user); // Pass user info to parent component
        console.log(`onLogin`,data.createUser.user );
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      setRegisterError(true); // Set registration error state
    }
  };

  return (
    <div className="login-container">
      {isRegistering ? (
        <form onSubmit={handleRegister} className="login-form">
          <label htmlFor="register-username">
            <b>Username</b>
          </label>
          <input
            type="text"
            id="register-username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <label htmlFor="register-email">
            <b>Email</b>
          </label>
          <input
            type="email"
            id="register-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label htmlFor="register-password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="register-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="password"
          />
          <button type="submit" className="login-button">
            Register
          </button>
          {registerError && (
            <p className="error-message">
              Registration failed. Please try again.
            </p>
          )}
          <p>
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(false)}
              className="toggle-button"
            >
              Log In
            </button>
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="login-form">
          <label htmlFor="login-email">
            <b>Email</b>
          </label>
          <input
            type="email"
            id="login-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
          />
          <label htmlFor="login-password">
            <b>Password</b>
          </label>
          <input
            type="password"
            id="login-password"
            value={password}
            autoComplete="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">
            Log In
          </button>
          {loginError && (
            <p className="error-message">Login failed. Please try again.</p>
          )}
          <p>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setIsRegistering(true)}
              className="toggle-button"
            >
              Register
            </button>
          </p>
        </form>
      )}
    </div>
  );
};

export default Login;
