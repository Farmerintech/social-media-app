import { ChatModel } from "../model/chatModel.js"
import UserModel from "../model/userModel.js"

export const PostChat = async (req, res) => {
    try {
    const receiver = await UserModel.findById(req.params.receiverId)
    const sender = await UserModel.findById(req.user.id)
    const {message} = req.body
    if(!message){
        return res.status(404).json({message:"No message i typed"})
    }
    if(!receiver || ! sender ){
        return res.status(404).json({message:"Sender or receiver not specified"})
    }
    const newChat = await ChatModel.create({
        sender,
        receiver,
        message
    })
    return res.status(201).json({message:"New chat received", newChat});
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error}); 
    }
}

export const getChats = async (req, res) =>{
    try {
        const UserA = req.query.userA
        const UserB= req.query.userB
        const chats = await ChatModel.find(
            {
                $or:[
                {
                    sender:UserA, 
                    receiver:UserB
                },
                {
                    sender:UserB, 
                    receiver:UserA
                }
                ]
            }
        )
        if(!chats){
            return res.status(404).json({Message:"No chat yet"})
        }
        return res.status(200).json({Message:"chats", chats})

    } catch (error) {
        console.log(error)
        return res.status(500).json({Message:error})  
    }
}