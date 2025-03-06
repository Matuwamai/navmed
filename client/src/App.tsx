import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./componets/Authcontext";
import NavMedNavbar from "./componets/Navbar";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./componets/Footer";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); 
  return (
    <Router >
      <NavMedNavbar cartCount={0} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage /> } />
          <Route
            path="/products"
            element={<ProductsPage setCartCount={() => { }} /> }/>
          <Route path="/order" element={isAuthenticated ? <OrderPage /> : <LoginPage />} />
          <Route path="/login" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
