import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavMedNavbar from './componets/Navbar'
import HomePage from './pages/Home'
import ProductsPage from './pages/Products'
import OrderPage from './pages/OrderPage'

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/navmed' : '';
  return (
    <Router basename={basename}>
      <NavMedNavbar cartCount={0} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage setCartCount={() => {}} />} />
          <Route path="/order" element={<OrderPage />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App