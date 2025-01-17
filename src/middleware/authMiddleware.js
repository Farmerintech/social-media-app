import jwt  from "jsonwebtoken";

export const authMiddleWare = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if(!token){
            return res.status(401).json({message:"You are not authorized"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        if(!decoded || decoded == null){
            return res.status(401).json({message:"You are not authorized"})
        }
            req.user = decoded
            next()    
    } catch (error) {
        return res.status(500).json({message:error})
    }
}