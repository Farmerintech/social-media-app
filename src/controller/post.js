import  PostModel  from "../model/postModel.js"
import UserModel from "../model/userModel.js";
import mongoose from "mongoose";
export const createPost  = async (req, res) => {
    try {
        const user = req.user.id;
        const {content} = req.body
        const newPost = await PostModel.create({
            createdBy:user,
            content
        });
        const initialPosts = await UserModel.findById(new mongoose.Types.ObjectId(user))
        await UserModel.findByIdAndUpdate(user, 
            {posts:initialPosts.posts.length > 0 ? [...initialPosts.posts, newPost]: [newPost]}, 
            {new:true})
        return res.status(201).json({message:"Post created successful", newPost})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})   
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const user = new mongoose.Types.ObjectId(req.user.id)
        const posts = await PostModel.find({createdBy:user}).populate("comments");
        if(posts.length===0){
            return res.status(403).json({message:"No post found"})
        }
        return res.status(200).json({message:"Post retrieved", posts})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})      
    }
}
export const getAPost = async (req, res) => {
    try {
        const postId = req.params.id
        const post = await PostModel.findById(postId);
        if(!post){
            return res.status(403).json({message:"post not found"})
        }
        return res.status(200).json({message:"Post retrieved", post})
    } catch (error) {
        return res.status(500).json({message:error})      
    }
}

export const UpdateAPost = async (req, res) => {
    try {
        const user = new mongoose.Types.ObjectId(req.user.id)
        const postId = new mongoose.Types.ObjectId(req.params.id)
        const post = await PostModel.findOne({_id:postId, createdBy:user});
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        const newPost = await PostModel.findByIdAndUpdate(postId, req.body, {new:true});
        return res.status(200).json({message:"Post updated", newPost})
    } catch (error) {
        return res.status(500).json({message:error})      
    }
}
export const DeletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.id
        const post = await PostModel.findById(postId);
        if(!post){
            return res.status(404).json({message:"post not found"})
        }
        const user = await UserModel.findById(userId);
        // const posts = await user.posts.filter(mypost => mypost.toString() !== postId);
        await UserModel.findByIdAndUpdate(userId, {$pull:{posts:postId}}, {new:true})
        await PostModel.findByIdAndDelete(postId);
        return res.status(200).json({message:"Post deleted"})
    } catch (error) {
        return res.status(500).json({message:error})      
    }
}
