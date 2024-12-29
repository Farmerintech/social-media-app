import jwt from "jsonwebtoken"
import UserModel from "../model/userModel.js"
import bcrypt from "bcrypt"
export const Register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const existingUsername = await UserModel.findOne({username})
        if(existingUsername){
            return res.status(400).json({message:'Username exists, try another username'});

        }
        const existingEmail = await UserModel.findOne({email})
        if(existingEmail){
            return res.status(400).json({message:'Email already in use'});
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPasswod = await bcrypt.hash(password, saltRounds);
        const newUser = await UserModel.create({
            username,
            email,
            password:hashedPasswod
        })
        return res.status(201).json({message:'Registration successful...'});
    } catch (error) {
        return res.status(400).json({message:error});   
    }
}

export const Login = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await UserModel.findOne({username})
        if(!user){
            return res.status(404).json({message:"Username or email does not exist"})
        }
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(!matchedPassword){
            return res.status(404).json({message:"Incorrect password"}) 
        }
        const id= user._id
        const email = user.email

        const token = jwt.sign(
            {
                id:user._id,
                email:user.email,
                username:user.username
            },
            process.env.SECRET_KEY,
            {expiresIn:process.env.LIFE_TIME}
        )
        return res.status(200).json({message:"Login successful", user:{id, email, username, token}})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error});       
    }
}

export const updatePassword = async(req, res) => {
    try {
        const username= req.user.username
        const {oldPassword, newPassword} = req.body
        const user = await UserModel.findOne({username});
        if(!user){
            return res.status(404).json({message:"User not found"})
        }
        const _id = user._id
        const matchedPassword = await bcrypt.compare(oldPassword, user.password)
        if(!matchedPassword){
            return res.status(400).json({message:"Your initial password is incorrect"})
        }
        const saltRounds = await bcrypt.genSalt(10)
        const hashedPasswod = await bcrypt.hash(newPassword, saltRounds)
        await UserModel.findByIdAndUpdate(_id, {password:hashedPasswod}, {new:true})
        return res.status(201).json({message:"Password updated successfully.."})

    } catch (error) {
        return res.status(400).json({message:error});             
    }
}
