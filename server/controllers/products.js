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

    const existingProduct = await db.product.findUnique({
      where: {
        id: Number(productId),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    const product = await db.product.update({
      where: {
        id: Number(productId),
      },
      data: {
        name,
        image,
        description,
        price,
      },
    });

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Error updating product" });
  }
};

export const deleteProduct = async (req, res) => {
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

    await db.product.delete({
      where: {
        id: Number(productId),
      },
    });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ message: "Error delete product" });
  }
};
