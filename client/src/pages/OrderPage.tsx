import axios from 'axios';
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

  const handlePlaceOrder = async () => {
    try {
      // Ensure cart has items
      if (cartItems.length === 0) {
        alert('Your cart is empty. Please add products to your cart.');
        return;
      }
  
      // Prepare order details
      const orderDetails = {
        products: cartItems.map((item) => ({
          productId: item.id,
          quantity: 1, // You can adjust this if you have a quantity system in place
          price: item.price,
        })),
        userId: 'userIdPlaceholder', // Replace with actual user ID if available (e.g., from the logged-in user)
        totalAmount: cartItems.reduce((acc, item) => acc + item.price, 0),
      };
  
      // Send order details to the backend
      const response = await axios.post('http://localhost:5000/api/orders/create', orderDetails); // Replace with your API endpoint
      if (response.status === 200) {
        alert('Order placed successfully!');
        
        // Clear the cart
        localStorage.removeItem('cart');
        setCartItems([]);
      } else {
        alert('Failed to place order. Please try again later.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again.');
    }
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
