import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import axios from "axios"

export const Follow = (username) =>{
    const [resp, setResp] = useState()
    const {state} = useContext(UserContext)
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
        axios.post(`http://localhost:8000/api/v1/follow/${username}`, {headers})
        .then(response =>{
           console.log(response.data)
           setResp(response.data)
        })
        .catch (error => {
        setMsg(error.response.data.message)
        console.log(error)
        })
}