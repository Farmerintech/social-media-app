import express from "express"
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { createPost, DeletePost, getAllPosts, getAllPostsBySpecificUser, getAPost, UpdateAPost } from "../controller/post.js";
import { postSchema, validMiddleware } from "../middleware/validate.js";

const postRoute = express.Router();

postRoute.post('/',validMiddleware(postSchema), authMiddleWare, createPost)
postRoute.get('/', authMiddleWare, getAllPosts)
postRoute.get('/user/:user', authMiddleWare, getAllPostsBySpecificUser)
postRoute.get('/:id', authMiddleWare, getAPost)
postRoute.put('/:id', authMiddleWare, UpdateAPost)
postRoute.delete('/:id', authMiddleWare, DeletePost)
export default postRoute
