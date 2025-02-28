import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import NavMedNavbar from './componets/Navbar'
import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import OrderPage from './pages/OrderPage'
import LoginPage from './pages/Login'
import Register from './pages/Register'
const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/navmed' : '';
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <Router basename={basename}>
      <NavMedNavbar cartCount={0} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage setCartCount={() => { }} />} />
          <Route path="/order" element={<OrderPage />} />
          <Route
            path="/login"
            element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App