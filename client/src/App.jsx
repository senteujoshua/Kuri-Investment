import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Products from './pages/Products';
import Order from './pages/Order';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import AdminOrders from './pages/admin/Orders';
import Customers from './pages/admin/Customers';
import AdminProducts from './pages/admin/Products';
import Reports from './pages/admin/Reports';

function App() {
  return (
    <div className="app">
      <Routes>
        {/* Admin routes - no navbar/footer */}
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/customers" element={<Customers />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/reports" element={<Reports />} />

        {/* Public routes */}
        <Route
          path="*"
          element={
            <>
              <Navbar />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                </Routes>
              </main>
              <Footer />
              <FloatingButtons />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
