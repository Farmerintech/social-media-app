import express from "express"
import cors from "cors"
import { connectDB } from "./src/config/db.js";
import AuthRoute from "./src/route/authRoute.js";
import ProfileRoute from "./src/route/profileRoute.js";
import postRoute from "./src/route/postRoute.js";
import commentRoute from "./src/route/commentRoute.js";
import FollowRoute from "./src/route/followRoute.js";
import UserRoute from "./src/route/userRoute.js";

const app = express();
const PORT = process.env.PORT || 8000
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())
connectDB()



app.use('/api/v1/auth', AuthRoute)
app.use ('/api/v1/profile', ProfileRoute)
app.use ('/api/v1/posts', postRoute)
app.use('/api/v1/posts', commentRoute)
app.use("/api/v1/follow", FollowRoute)
app.use("/api/v1/users", UserRoute)
app.use(express.static('client'))

app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`)
})
