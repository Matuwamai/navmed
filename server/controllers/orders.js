import db from "../db/index.js";

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;

    const orderProducts = await Promise.all(
      products.map(async (product) => {
        const productData = await db.product.findUnique({
          where: {
            id: product.productId,
          },
          select: {
            id: true,
            price: true,
          },
        });
        return {
          productId: productData.id,
          quantity: product.qty,
          price: productData.price,
        };
      })
    );

    const order = await db.order.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        orderItems: {
          create: orderProducts.map((product) => ({
            product: {
              connect: {
                id: product.productId,
              },
            },
            quantity: product.quantity,
            price: product.price,
            totalAmount: product.price * product.quantity,
          })),
        },
        totalAmount: orderProducts.reduce(
          (acc, product) => acc + product.price * product.quantity,
          0
        ),
      },
    });

    res.status(201).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating " });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await db.order.findMany({
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            contact: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;
    const orders = await db.order.findMany({
      where: {
        userId: parseInt(userId),
      },
      include: {
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getOrderDetails = async (req, res) => {
  try {
    const { orderId, userId } = req.params;
    const order = await db.order.findUnique({
      where: {
        id: Number(orderId),
        userId: Number(userId),
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            contact: true,
          },
        },
        orderItems: {
          include: {
            product: {
              select: {
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching order details" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const existingOrder = await db.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!existingOrder) {
      res.status(404).json({ message: "Order not found" });
    }

    const order = await db.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    const updatedOrder = db.order.update({
      where: {
        id: Number(orderId),
      },
      data: {
        status,
      },
    });

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: "Error updating order status" });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await db.order.findUnique({
      where: {
        id: Number(orderId),
      },
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    await db.orderItem.deleteMany({
      where: {
        orderId: Number(orderId),
      },
    });

    await db.order.delete({
      where: {
        id: Number(orderId),
      },
    });
    res.status(204).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order" });
  }
};
