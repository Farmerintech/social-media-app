import mongoose from "mongoose";

const ChatSchema = mongoose.Schema({
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    receiver:{
         type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    message:{
        type:String,
        required:true
    },
    isRead:false
}, {timestamps})
export const ChatModel = ('Chat', ChatSchema)