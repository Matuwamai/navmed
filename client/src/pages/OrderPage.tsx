import { useEffect, useState } from 'react';

interface Product {
  id: number;
  name: string;
  oldPrice: number;
  price: number;
  image: string;
  description: string;
}

function OrderPage() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    // Retrieve the cart from localStorage
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveFromCart = (id: number) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const handlePlaceOrder = () => {
    // Logic to place the order
    alert('Order placed!');
    localStorage.removeItem('cart'); // Clear cart after placing order
    setCartItems([]);
  };

  return (
    <div className="container my-4">
      <h2>Your Cart</h2>
      <div className="row">
        {cartItems.map((item) => (
          <div key={item.id} className="col-12 mb-3">
            <div className="card p-3 shadow-sm">
              <div className="d-flex">
                <img src={item.image} alt={item.name} className="img-fluid" style={{ width: '100px', height: '100px' }} />
                <div className="ms-3">
                  <h5>{item.name}</h5>
                  <p className="text-muted">{item.description}</p>
                  <p className="text-danger">
                    <s>Ksh {item.oldPrice}</s>
                  </p>
                  <p className="text-success fw-bold">Ksh {item.price}</p>
                  <button onClick={() => handleRemoveFromCart(item.id)} className="btn btn-sm btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="d-flex justify-content-between">
          <button className="btn btn-danger" onClick={handlePlaceOrder}>
            Place Order
          </button>
          <span className="fw-bold">Total: Ksh {cartItems.reduce((acc, item) => acc + item.price, 0)}</span>
        </div>
      )}
    </div>
  );
}

export default OrderPage;
