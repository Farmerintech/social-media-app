import mongoose from "mongoose"

const CommentSchema = mongoose.Schema({
    commentedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    postId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"post"
    },
    comment:{
        type:String,
        required:true
    }
},)

export const CommentModel = mongoose.model('comment', CommentSchema)