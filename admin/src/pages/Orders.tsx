import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Order {
  id: number;
  userId: number; // Adjusted to match API response
  totalAmount: number;
  createdAt: string;
  status: string;
}

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched orders:", data);
        setOrders(data); // Ensure the data matches the expected structure
      })
      .catch((err) => console.error("Error fetching orders:", err));
  }, []);

  const handleViewDetails = (id: number, userId: number) => {
    navigate(`/orders/${id}/users/${userId}`); 
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Orders List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">User ID</th>
              <th className="p-3">Total Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Created At</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200">
                  <td className="p-3">{order.id}</td>
                  <td className="p-3">{order.userId}</td>
                  <td className="p-3">Ksh {order.totalAmount.toFixed(2)}</td>
                  <td className="p-3">{order.status}</td>
                  <td className="p-3">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleViewDetails(order.id, order.userId)}
                      className="bg-gray-700 text-white px-3 py-2 rounded-md hover:bg-gray-900 transition"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            ) : (
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
