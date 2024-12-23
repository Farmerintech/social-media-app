import UserModel from "../model/userModel.js";
import mongoose from "mongoose";
import PostModel from "../model/postModel.js";
export const LikeAndUnlike = async (req, res) => {
   try {
    const user = await UserModel.findOne({username:req.user.username});
    const likedPost = await PostModel.findOne({_id:req.params.id})
    if(!likedPost){
        return res.status(404).json({Message:"Post not found"})
    }

       const  alreadyLiked= likedPost.likes.includes(user._id)
    // if not already liked, then like
    if(!alreadyLiked){
        //await UserModel.findByIdAndUpdate(followedUser._id, {followers:user._id}, {new:true}  );
        await PostModel.findByIdAndUpdate(likedPost._id, {likes:user._id}, {new:true} )
        return res.status(200).json({Message:"Followed successfully.."})
    }
    // if  already liked, then unlike
    if(alreadyFollowed){
        //await UserModel.findByIdAndUpdate(followedUser._id, {$pull: {followers:user._id}}, {new:true} );
        await PostModel.findByIdAndUpdate(likedPost._id, {$pull: {likes:user._id}}, {new:true} )
        return res.status(200).json({Message:"Unfollowed successfully.."})
    }
    
   } catch (error) {
    return res.status(500).json({Message:error})
   }
}