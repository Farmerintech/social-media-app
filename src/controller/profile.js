import UserModel from "../model/userModel.js"

export const updateProfile = async(req, res) => {
    try {
        const username = req.user?.username
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const _id = user._id
        await UserModel.findByIdAndUpdate(_id, req.body, {new:true});
        return res.status(201).json({message:"Profile updated successfully.."})
    } catch (error) {
        return res.status(500).json({message:error});         
    }
}

export const getProfile = async (req, res) => {
    try {
        const username = req.params.user
        const user = await UserModel.findOne({username}).populate("posts").populate("followers");
        if(!user){
            return res.status(404).json({message:"User not found"})
        } 
        const bio = user.bio;
        const email = user.email
        const posts = user.posts
        const followers = user.followers
        const following = user.following
        return res.status(200).json({message:"User profile retrieved", user})
    } catch (error) {
        return res.status(500).json({message:error});         
    }
}
