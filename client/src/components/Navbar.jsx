import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { getItemCount } = useCart();
  const count = getItemCount();

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">
          <span className="logo-accent">KURI</span> INVESTMENTS
        </Link>

        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '\u2715' : '\u2630'}
        </button>

        <ul className={`navbar-links ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen(false)}>
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/products" className={isActive('/products')}>Products</Link></li>
          <li><Link to="/about" className={isActive('/about')}>About</Link></li>
          <li><Link to="/contact" className={isActive('/contact')}>Contact</Link></li>
          <li>
            <Link to="/order" className={isActive('/order')}>
              Order {count > 0 && `(${count})`}
            </Link>
          </li>
        </ul>

        <div className="navbar-cta">
          <Link to="/order" className="btn btn-primary btn-sm">
            {count > 0 ? `Order (${count})` : 'Get Quote'}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
