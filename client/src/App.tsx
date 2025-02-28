import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./componets/Authcontext";// Import the useAuth hook to access AuthContext
import NavMedNavbar from "./componets/Navbar";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import OrderPage from "./pages/OrderPage";
import LoginPage from "./pages/Login";
import Register from "./pages/Register";

const App: React.FC = () => {
  const { isAuthenticated } = useAuth(); // Use AuthContext to get isAuthenticated

  const basename = process.env.NODE_ENV === "production" ? "/navmed" : "";

  return (
    <Router basename={basename}>
      <NavMedNavbar cartCount={0} />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
          <Route
            path="/products"
            element={isAuthenticated ? <ProductsPage setCartCount={() => { }} /> : <LoginPage />}
          />
          <Route path="/order" element={isAuthenticated ? <OrderPage /> : <LoginPage />} />
          <Route path="/login" element={isAuthenticated ? <HomePage /> : <LoginPage />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
