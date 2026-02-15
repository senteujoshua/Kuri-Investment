import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3><span style={{ color: 'var(--color-orange)' }}>KURI</span> INVESTMENTS</h3>
            <p>
              Your trusted supplier of premium quarry aggregates and construction materials
              in Kenya. Serving the construction industry with quality stone, ballast, and
              hardcore from our quarry in Kigango, Nyeri.
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
              <li><Link to="/products">3/4 Crushed Stone (20mm)</Link></li>
              <li><Link to="/products">3/8 Crushed Stone (10mm)</Link></li>
              <li><Link to="/products">Ballast</Link></li>
              <li><Link to="/products">Hardcore</Link></li>
              <li><Link to="/products">Quarry Dust</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact</h4>
            <ul>
              <li><a href="tel:+254717377226">+254 717 377 226</a></li>
              <li><a href="mailto:info@kuriinvestments.co.ke">info@kuriinvestments.co.ke</a></li>
              <li>Kigango, Nyeri, Kenya</li>
              <li>Mon-Sat: 8:00 AM - 6:00 PM</li>
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
