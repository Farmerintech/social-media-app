import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile_picture:{
        type:String,
        required:false
    },
    bio:{
        type:String,
        required:false
    },
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ],
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    following:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ]
}, {timestamps:true})

 const UserModel = mongoose.model('user', UserSchema);
 export default UserModel