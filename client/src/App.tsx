import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavMedNavbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'

const App: React.FC = () => {
  const basename = process.env.NODE_ENV === 'production' ? '/navmed' : '';
  return (
    <Router basename={basename}>
      <NavMedNavbar cartCount={0} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage setCartCount={() => {}} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
