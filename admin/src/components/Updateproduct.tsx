import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [image, setImage] = useState(""); // Now stores image URL instead of a file
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (response.ok) {
          const product = await response.json();
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setExistingImage(product.image); // Load existing image URL
          setImage(product.image); // Pre-fill input with existing image URL
        } else {
          alert("Failed to fetch product details.");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !price || !image) {
      alert("Please fill in all fields.");
      return;
    }

    const updatedProduct = { name, image, description, price };

    try {
      const response = await fetch(`http://localhost:5000/api/products/${id}/edit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct), // Send JSON instead of FormData
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/products");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Failed to update product.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5 text-blue-600">Update Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name */}
        <div>
          <label className="block font-medium">Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Product Image (Existing + URL Input) */}
        <div>
          <label className="block font-medium">Product Image URL</label>
          {existingImage && (
            <img src={existingImage} alt="Existing Product" className="h-24 w-24 object-cover mb-2 rounded-md shadow-sm" />
          )}
          <input
            type="text"
            placeholder="Enter image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Product Price */}
        <div>
          <label className="block font-medium">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition">
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
