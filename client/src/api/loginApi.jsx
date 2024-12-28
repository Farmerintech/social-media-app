 import axios from "axios"
import { useState } from "react"
 export const loginApi = async (data, msg) => {
    const [msg, setMsg] = useState('')

    const headers = {
        "Content-type":"application/json",
    }
       axios.post('http://localhost:8000/api/v1/auth/login', data, {headers})
       .then(response =>{
        setMsg(response)
       })
    .catch (error => {
        console.log(error)
    })
 }

