import express from "express";
import { login, register, listUsers } from "../controllers/users.js";

const userRouter = express.Router();

userRouter.post("/register", register),
userRouter.post("/login", login);
userRouter.get("/users-lists", listUsers);


export default userRouter;