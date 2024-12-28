import mongoose from "mongoose";

const NotifySchema =  mongoose.Schema({
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
    payload:{
        type:mongoose.Schema.Types.ObjectId,
    },
    type:{
        type:String,  
    }
}, {timestamps: true})
export const NotifyModel = mongoose.model('notification', NotifySchema)