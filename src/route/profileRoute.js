import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controller/profile.js";

const ProfileRoute = express.Router();

ProfileRoute.get('/:user', authMiddleWare, getProfile)
ProfileRoute.put('/update', authMiddleWare, updateProfile)

export default ProfileRoute
