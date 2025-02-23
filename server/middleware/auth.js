import jwt from "jsonwebtoken";
import db from "../db/index.js";
import { Role } from "@prisma/client";

export const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "Authorization headers missing" });
  }
  if (!req.headers.authorization.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Invalid token scheme" });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    const decodedUser = jwt.verify(token, process.env.JWT_SECRET);

    const user = await db.user.findUnique({
      where: {
        id: decodedUser.id,
      },
    });

    if (user) {
      req.user = user;
      next();
    }
  } catch (error) {
    const errorMessage = error?.message;
    if (errorMessage === "jwt expired") {
      return res.status(401).json({ message: "Expired token" });
    }
    res.status(401).json({ message: "Invalid token" });
  }
};

export const isAdmin = async (req, res, next) => {
  if (req.user.role !== Role.ADMIN) {
    return res.status(401).json({ message: "Not authorized as an admin" });
  }
  next();
};
