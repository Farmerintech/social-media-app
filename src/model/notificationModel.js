import mongoose from "mongoose";

const NotifySchema = mongoose.Schema({
    userId:{
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
export const NotifyModel = mongoose.model('chat', NotifySchema)