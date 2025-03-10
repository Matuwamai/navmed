import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";

const ViewOrderDetails = () => {
    const [order, setOrder] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
   

    const { id, userId } = useParams<{ id: string; userId: string }>();

    const fetchOrderDetails = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/api/orders/${id}/users/${userId}`);

            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setOrder(data);
            setError(""); 
        } catch (err: any) {
            console.error("Error fetching order details:", err);
            setError(`Failed to load order: ${err.message}`);
        } finally {
            setLoading(false);
        }
    }, [id, userId]);

    useEffect(() => {
        fetchOrderDetails();
    }, [fetchOrderDetails]);

    const handleUpdateStatus = async (newStatus: string) => {
        if (!id) return;

        if (!window.confirm(`Are you sure you want to update the order status to "${newStatus}"?`)) {
            return;
        }

        await fetch(`http://localhost:5000/api/orders/${id}/edit`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
        });

        window.location.reload(); 
    };

    const handleDeleteOrder = async () => {
        if (!id) return;

        if (!window.confirm("Are you sure you want to delete this order?")) {
            return;
        }

        await fetch(`http://localhost:5000/api/orders/${id}/delete`, {
            method: "DELETE",
        });

        window.location.href = "/orders"; 
    };


    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold mb-4">Order Details</h1>
            <p><strong>User:</strong> {order?.user?.fullName || "N/A"}</p>
            <p><strong>Contact:</strong> {order?.user?.contact || "N/A"}</p>
            <p><strong>Status:</strong> {order?.status || "Pending"}</p>
            <p><strong>Created At:</strong> {order?.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</p>

            <h2 className="text-xl font-bold mt-4">Products</h2>
            {order?.orderItems?.length > 0 ? (
                <ul>
                    {order.orderItems.map((item: any, index: number) => (
                        <li key={index}>
                            {item.product?.name || "Unknown Product"} - Ksh {item.price} x {item.quantity}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No products in this order.</p>
            )}

            <button
                onClick={() => handleUpdateStatus("CONFIRMED")}
                className="px-4 py-2 mx-2 rounded text-white bg-green-600 hover:bg-green-800 transition"
            >
                Confirm Order
            </button>

            <button
                onClick={handleDeleteOrder}
                className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-800 transition"
            >
                Delete Order
            </button>

        </div>
    );
};

export default ViewOrderDetails;
