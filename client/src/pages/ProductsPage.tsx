import { useState } from 'react';
import BloodPressureMonitor from '../assets/bloodpressure.jpg';
import Stethoscope from '../assets/Stethoscope.jpg';
import Thermometer from '../assets/Thermometer.jpg';
import NurseWatch from '../assets/NurseWatch.jpg';
import NurseUniform from '../assets/NurseUniform.webp';

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  newPrice: number;
  image: string;
  description: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Blood Pressure Monitor',
    oldPrice: 15000,
    newPrice: 12000,
    image: BloodPressureMonitor,
    description: 'Accurate blood pressure monitoring device for home and professional use.',
  },
  {
    id: 2,
    name: 'Stethoscope',
    oldPrice: 5000,
    newPrice: 3500,
    image: Stethoscope,
    description: 'High-quality stethoscope with clear sound for medical professionals.',
  },
  {
    id: 3,
    name: 'Thermometer',
    oldPrice: 2000,
    newPrice: 1500,
    image: Thermometer,
    description: 'Digital thermometer with fast readings and accurate temperature results.',
  },
  {
    id: 4,
    name: 'Nurse Watch',
    oldPrice: 2000,
    newPrice: 1500,
    image: NurseWatch,
    description: 'Durable nurse watch designed for healthcare professionals.',
  },
  {
    id: 5,
    name: 'Nurse Uniform',
    oldPrice: 3000,
    newPrice: 2500,
    image: NurseUniform,
    description: 'Comfortable and professional nurse uniform for hospital and clinic settings.',
  },
];

interface ProductsPageProps {
  setCartCount: React.Dispatch<React.SetStateAction<number>>;
}

function ProductsPage({ setCartCount }: ProductsPageProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top when clicking on a product card
  };

  const handleAddToCart = (e: React.MouseEvent, product?: Product) => {
    e.stopPropagation();
    setCartCount((prev) => prev + 1);
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
            <p className="text-success fw-bold">Ksh {selectedProduct.newPrice}</p>
            <button
              className="btn btn-primary"
              onClick={(e) => handleAddToCart(e)}
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
                <p className="text-success fw-bold">Ksh {product.newPrice}</p>
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
