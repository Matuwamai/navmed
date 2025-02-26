import React, { useEffect, useState } from "react";

interface Product {
  id: number;
  image: string;
  name: string;
  description: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from API (Replace with your actual API endpoint)
    fetch(" http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleDelete = (id: number) => {
    // Handle delete logic (API call)
    console.log(`Deleting product with ID: ${id}`);
  };

  const handleUpdate = (id: number) => {
    // Handle update logic (Redirect or open update modal)
    console.log(`Updating product with ID: ${id}`);
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
          <thead>
            <tr className="bg-blue-600 text-white text-left">
              <th className="p-3">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Description</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200">
                <td className="p-3">{product.id}</td>
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.description}</td>
                <td className="p-3 text-center space-x-2">
                  <button 
                    onClick={() => handleUpdate(product.id)}
                    className="bg-green-600 text-white px-3 py-2 rounded-md hover:bg-green-800 transition"
                  >
                    Update
                  </button>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center p-3">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Products;
