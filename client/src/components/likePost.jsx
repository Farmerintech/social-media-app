import axios from "axios"
import { Modal } from "./modal"

export const LikePost = (postId, token) =>{
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
    }
            axios.post(`/api/v1/like/${postId}`, 
                {}, // Empty body since no data is needed
            {headers})
            .then(response =>{
               console.log(response.data)
            //    setMsg(response.data)
            // setText(response.data.Message)
            
           setInterval(()=>{
                setText('')
            }, 1000)
            })
            .catch (error => {
            //  msg = (error.response.data.message)
            console.log(error)
            })

    }