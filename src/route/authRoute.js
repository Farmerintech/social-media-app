import express from "express"
import {  Login, Register, updatePassword } from "../controller/auth.js";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { LoginShema, passwordSchema, RegistSchema, validMiddleware } from "../middleware/validate.js";

const AuthRoute = express.Router();

AuthRoute.post('/register', validMiddleware(RegistSchema), Register)
.post('/login', validMiddleware(LoginShema), Login)
.patch('/update_password', authMiddleWare, validMiddleware(passwordSchema), updatePassword)

export default AuthRoute

