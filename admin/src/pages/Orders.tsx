import React, { useEffect, useState } from "react";

interface Order {
  id: number;
  name: string;
  user: string;
  contact: string;
  totalAmount: number;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    // Fetch orders from API (Replace with your actual API endpoint)
    fetch("https://your-api-endpoint.com/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleViewDetails = (id: number) => {
    // Handle view details logic (Redirect or open modal)
    console.log(`Viewing details for order ID: ${id}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Order Name</th>
              <th className="p-3">User</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-gray-200">
                <td className="p-3">{order.id}</td>
                <td className="p-3">{order.name}</td>
                <td className="p-3">{order.user}</td>
                <td className="p-3">{order.contact}</td>
                <td className="p-3">${order.totalAmount.toFixed(2)}</td>
                <td className="p-3 text-center">
                  <button 
                    onClick={() => handleViewDetails(order.id)}
                    className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-900 transition"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center p-3">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
