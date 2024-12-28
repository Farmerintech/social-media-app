import mongoose from "mongoose"
import { NotifyModel } from "../model/notificationModel.js"
import UserModel from "../model/userModel.js";

export const getNotification = async (req, res) =>{
    try {
        const receiverId= new mongoose.Types.ObjectId(req.user.id)
        const receiver = UserModel.findById(req.params.id);
        if(!receiver){
            return res.status(404).json({message:"No such user exist"})
        }
        const notification = await NotifyModel.find({receiver:receiverId});
        if(!notification){
            return res.status(404).json({message:"You do not have any notification yet"})
        }
        return res.status(201).json({message:"Notification retrieved", notification});
    } catch (error) {
        return res.status(404).json({message:error})
    }
}