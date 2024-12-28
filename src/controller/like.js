import UserModel from "../model/userModel.js";
import mongoose from "mongoose";
import PostModel from "../model/postModel.js";
import { NotifyModel } from "../model/notificationModel.js";
export const LikeAndUnlike = async (req, res) => {
   try {
    const user = await UserModel.findOne({username:req.user.username});
    const likedPost = await PostModel.findOne({_id:req.params.postId})
    if(!likedPost){
        return res.status(404).json({Message:"Post not found"})
    }

       const  alreadyLiked= likedPost.likes.includes(user._id)
    // if not already liked, then like
    if(!alreadyLiked){
        //await UserModel.findByIdAndUpdate(followedUser._id, {followers:user._id}, {new:true}  );
        await PostModel.findByIdAndUpdate(likedPost._id, 
            {likes:likedPost.likes.length > 0 ? [...likedPost.likes, user._id]: user._id}, {new:true} )
          await NotifyModel.create(
                        {
                            userId:req.user.id,
                            receiver:likedPost.createdBy,
                            message:`${req.user.username} liked your post`,
                            payload:likedPost._id,
                            type:'like'
                        }
                    )
    return res.status(200).json({Message:"Post liked successfully.."})
    }

    // if  already liked, then unlike
    if(alreadyLiked){
        //await UserModel.findByIdAndUpdate(followedUser._id, {$pull: {followers:user._id}}, {new:true} );
        await PostModel.findByIdAndUpdate(likedPost._id, {$pull: {likes:user._id}}, {new:true} )
        return res.status(200).json({Message:"post unliked successfully.."})
    }
    
   } catch (error) {
    console.log(error)
    return res.status(500).json({Message:error})
   }
}