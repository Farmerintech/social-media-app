import express from "express";
import { authMiddleWare } from "../middleware/authMiddleware.js";
import { AddComment, EditComment } from "../controller/comment.js";

const commentRoute = express.Router()

commentRoute.post('/:id/comment', authMiddleWare, AddComment)
.patch('/:postId/comment/:commentId', authMiddleWare, EditComment)

export default commentRoute