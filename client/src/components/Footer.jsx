import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3><span style={{ color: 'var(--color-orange)' }}>KURI</span> INVESTMENTS</h3>
            <p>
              Your trusted supplier of premium quarry aggregates and construction materials.
              Serving the construction industry with quality stone, sand, and gravel since 2009.
            </p>
          </div>

          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/order">Place Order</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/products">Crushed Stone</Link></li>
              <li><Link to="/products">Building Sand</Link></li>
              <li><Link to="/products">River Gravel</Link></li>
              <li><Link to="/products">Road Base</Link></li>
              <li><Link to="/products">Gabion Stone</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+263771234567">+263 77 123 4567</a></li>
              <li><a href="mailto:info@kuriinvestments.com">info@kuriinvestments.com</a></li>
              <li>Harare, Zimbabwe</li>
              <li>Mon-Fri: 6AM - 5PM</li>
              <li>Sat: 6AM - 1PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Kuri Investments. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
