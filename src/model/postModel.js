import mongoose from "mongoose";

const PostSchema = mongoose.Schema({
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    content:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'comment'
        }
    ]
}, {timestamps:true})
const PostModel = mongoose.model('post', PostSchema);
export default PostModel