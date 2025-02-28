import { useState } from 'react';
import ProductsPage from './Products';

function HomePage() {
  const [cartCount, setCartCount] = useState(0);

  return (
    <div>
      <div className="text-end mb-3">
        <span className="badge bg-primary">Cart: {cartCount}</span>
      </div>

      <div className="text-center mb-4">
        <h1 className="text-blue-600">Hello, Welcome to NavMed!</h1>
        <p>Your trusted online store for medical equipment.</p>
      </div>

      <ProductsPage setCartCount={setCartCount} />
    </div>
  );
}

export default HomePage;
