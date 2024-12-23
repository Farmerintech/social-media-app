import UserModel from "../model/userModel.js";
import mongoose from "mongoose";

export const FollowandUnfollow = async (req, res) => {
   try {
    const user = await UserModel.findOne({username:req.user.username});
    const followedUser = await UserModel.findOne({username:req.params.username})
    if(!followedUser){
        return res.status(404).json({Message:"Username does not match any existing user"})
    }
    const loggedinUser = await UserModel.findOne(
        {
            username:user.username

        })
       const  alreadyFollowed = loggedinUser.following.includes(followedUser._id)
    // if not already followed, then follow
    if(!alreadyFollowed){
        await UserModel.findByIdAndUpdate(followedUser._id, 
            {followers:user.followers.length > 0 ? [...user.followers, user._id]: user._id}, 
            {new:true}  );
        await UserModel.findByIdAndUpdate(user._id, 
            {following: user.following.length > 0 ? [ ...user.following, followedUser._id]: followedUser._id}, 
            {new:true} )
        return res.status(200).json({Message:"Followed successfully.."})
    }
    // if  already followed, then unfollow
    if(alreadyFollowed){
        await UserModel.findByIdAndUpdate(followedUser._id, {$pull: {followers:user._id}}, {new:true} );
        await UserModel.findByIdAndUpdate(user._id, {$pull: {following:followedUser._id}}, {new:true} )
        return res.status(200).json({Message:"Unfollowed successfully.."})
    }
    
   } catch (error) {
    console.log(error)
    return res.status(500).json({Message:error})
   }
}