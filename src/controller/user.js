import mongoose from "mongoose"
import UserModel from "../model/userModel.js"

export const getAUser = async (req, res) =>{
    try{
        const userId = new mongoose.Types.ObjectId(req.params.id)
        const user = await UserModel.findById(req.params.id)
        if(!user){
            return res.status(404).json({message:"User not found"}) 
        }
        return res.status(200).json({message:"User", user})
    } catch(error ){
        console.log(error)
        return res.status(500).json({message:error}) 
    }
    
}

export const getUsers = async (req, res) =>{
    try{
        const userId = new mongoose.Types.ObjectId(req.params.id)
        const users = await UserModel.find()
        if(!users){
            return res.status(404).json({message:"User not found"}) 
        }
        return res.status(200).json({message:"Users", users})
    } catch(error ){
        console.log(error)
        return res.status(500).json({message:error}) 
    }
    
}