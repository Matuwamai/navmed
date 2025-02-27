import db from "../db/index.js";

export const createProduct = async (req, res) => {
  try {
    const { name, image, price, description } = req.body;
    if (!name || !image || !price || !description) {
      return res.status(400).json({ message: "All fields are required!" });
    }
    const product = await db.product.create({
      data: { name, image, price, description },
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating product" });
  }
};
export const listProduct = async (req, res) => {
  try {
    const products = await db.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const getProductDetails = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await db.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const { name, image, price, description } = req.body;

    if (!name || !image || !price || !description) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProduct = await db.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await db.product.update({
      where: { id: Number(productId) },
      data: { 
        name, 
        image, 
        description, 
        price: Number(price)  // ✅ Convert price to number
      },
    });

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};


export const deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    
    console.log("Raw productId from request:", req.params); // Debugging step

    // Ensure productId is a valid number
    const id = Number(productId);
    if (isNaN(id)) {
      console.log("Invalid productId:", productId); // Debugging
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const product = await db.product.findUnique({
      where: { id },
    });

    if (!product) {
      console.log("Product not found:", id);
      return res.status(404).json({ message: "Product not found" });
    }

    await db.product.delete({
      where: { id },
    });

    console.log("Deleted product:", id);
    res.status(204).json();
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};
