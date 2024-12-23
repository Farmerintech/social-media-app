import { ChatModel } from "../model/chatModel.js"
import UserModel from "../model/userModel"

export const Chat = async (req, res) => {
    try {
    const receiver = await UserModel.findOne({username:req.params.user})
    const sender = await UserModel.findOne({username:req.user.username})
    const {message} = req.body
    if(!message){
        return res.status(404).json({message:""})
    }
    if(!receiver || ! sender ){
        return res.status(404).json({message:"Sender or receiver not specified"})
    }
    const newChat = await ChatModel.create({
        sender,
        receiver,
        message:newChat

    })
    return res.status(404).json({message:"New chat received"}, newChat);
    } catch (error) {
        
    }
}