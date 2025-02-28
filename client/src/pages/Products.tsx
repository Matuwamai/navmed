import { useState, useEffect } from 'react';
import axios from 'axios';

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  price: number;
  image: string;
  description: string;
}

interface ProductsPageProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

function ProductsPage({ setCartCount }: ProductsPageProps) {
  const [products, setProducts] = useState<Product[]>([]);  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Fetch products from server
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');  // Replace with your API endpoint
        setProducts(response.data);  // Assuming the response is an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when clicking on a product card
  };

  const handleAddToCart = (e: React.MouseEvent, product?: Product) => {
    e.stopPropagation();
    
    if (product) {
      // Get the current cart from localStorage
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      // Add the new product to the cart
      cart.push(product);

      // Update the localStorage with the new cart
      localStorage.setItem('cart', JSON.stringify(cart));

      // Update the cart count in the state
      setCartCount(cart.length);
    }

    if (product) setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Optional: Scroll to top when adding to cart
  };

  return (
    <div className="container my-4">
      {selectedProduct && (
        <div className="row mb-4 p-3 border rounded bg-light">
          <div className="col-md-4">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h3>{selectedProduct.name}</h3>
            <p className="text-muted">{selectedProduct.description}</p>
            <p className="text-danger">
              <s>Ksh {selectedProduct.oldPrice}</s>
            </p>
            <p className="text-success fw-bold">Ksh {selectedProduct.price}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => handleAddToCart(e, selectedProduct)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      )}

      <div className="row">
        {products.map((product) => (
          <div
            key={product.id}
            className="col-6 col-md-4 mb-3"
            onClick={() => handleProductClick(product)}
          >
            <div className="card h-100 shadow-sm" style={{ cursor: 'pointer' }}>
              <img
                src={product.image}
                alt={product.name}
                className="card-img-top"
              />
              <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="text-danger">
                  <s>Ksh {product.oldPrice}</s>
                </p>
                <p className="text-success fw-bold">Ksh {product.price}</p>
                <button
                  className="btn btn-sm btn-outline-primary"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
