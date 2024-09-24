import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Import styles for the footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Section 1: Links */}
        <div className="footer-section links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            {/* <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li> */}
          </ul>
        </div>

        {/* Section 3: Copyright */}
        <div className="footer-section copyright">
          <p>&copy; {new Date().getFullYear()} StagePass. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
