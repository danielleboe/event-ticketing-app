import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";

const Navbar = ({ user, onLogout }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavToggle = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleLogout = () => {
    onLogout();
    navigate("/login");
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    console.log(isLoggedIn ? "Logged In" : "Logged Out");
  }, [isLoggedIn]);

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">StagePass</Link>
      </div>
      
      <ul className={`nav-links ${isNavOpen ? "active" : ""}`}>
        <li>
          <Link to="/events/new">Add an Event</Link>
        </li>
        <li>
          <Link to="/search">Search</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/settings">Settings</Link>
        </li>

        {isLoggedIn ? (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        ) : (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
      </ul>

      <button
        className="nav-toggle"
        aria-label="Toggle navigation"
        onClick={handleNavToggle}
      >
        &#9776;
      </button>
    </nav>
  );
};

export default Navbar;
