import { CommentModel } from "../model/commentModel.js";
import  PostModel  from "../model/postModel.js"
import mongoose from "mongoose";



export const AddComment  = async (req, res) => {
    try {
        const user = req.user.id;
        const postId = req.params.id
        const {comment} = req.body
        const post = await PostModel.findById(postId)
        if(!post){
            return res.status(404).json({message:"Post does not exist"})
        }
        const newComment = await CommentModel.create({
            commentedBy:user,
            postId:post._id,
            comment
        });
        await PostModel.findByIdAndUpdate(post._id, 
            {
                comments:post.comments.length >= 0 ? [...post.comments, newComment]:[newComment]
            }, 
            {new:true}
        )
        return res.status(201).json({message:"Comment created successful", newComment})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})   
    }

}
export const EditComment = async (req, res) => {
    try {
        const commentId = new mongoose.Types.ObjectId(req.params.commentId)
        const commentedBy = new mongoose.Types.ObjectId(req.user.id)
        const postId = new mongoose.Types.ObjectId(req.params.postId)
        const comment = await CommentModel.findOne({_id:commentId, commentedBy, postId})
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }
        const newComment = req.body.comment
        console.log(comment._id)
        await CommentModel.findByIdAndUpdate(req.params.commentId, {comment:newComment}, {new:true})
        return res.status(200).json({message:"Comment Updated Successfully..."})
    } catch (error) {
        return res.status(500).json({message:error})   
    }
}

export const DeleteComment = async (res, req) => {
    try {
        const commentId = new mongoose.Types.ObjectId(req.params.id)
        const commentedBy = new mongoose.Types.ObjectId(req.user.id)
        const postId = new mongoose.Types.ObjectId(req.params.postId)
        const comment = await CommentModel.findOne({_id:commentId, commentedBy, postId})
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }
        await CommentModel.findByIdAndDelete(comment._id);
        await PostModel.findByIdAndUpdate(postId, {$pull:{comments:commentId}}, {new:true})
        return res.status(200).json({message:"Comment Deleted Successfully..."})
    } catch (error) {
        return res.status(500).json({message:error})   
    }
}