import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams(); // Get product ID from the URL
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    // Fetch the existing product details
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://your-api-endpoint.com/products/${id}`);
        if (response.ok) {
          const product = await response.json();
          setName(product.name);
          setDescription(product.description);
          setPrice(product.price);
          setExistingImage(product.image); // Existing product image
        } else {
          alert("Failed to fetch product details.");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !description || !price) {
      alert("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    if (image) {
      formData.append("image", image); // Append new image if uploaded
    }

    try {
      const response = await fetch(`https://your-api-endpoint.com/products/${id}`, {
        method: "PUT",
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully!");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while updating the product.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-5">Update Product</h1>
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

        {/* Product Image (Existing + Upload) */}
        <div>
          <label className="block font-medium">Product Image</label>
          {existingImage && (
            <img src={existingImage} alt="Existing Product" className="h-24 w-24 object-cover mb-2" />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
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
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
