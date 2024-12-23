import { useContext, useEffect, useState } from "react"
import { Chat } from "../components/chat"
import { DashMenu } from "../components/dash-menu"
import { Main } from "../components/main"
import { useNavigate } from "react-router"
import { UserContext } from "../components/context/usersReducer"
import axios from "axios"
import { Users } from "../components/user"
import { Footer } from "../components/footer"

export const Dashboard = () =>{
  
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    setTimeout(()=>{
        state.user={
            
        }
    }, 360000)
    const navigate = useNavigate()
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
    if(!state.user || state.user.token === null){
        navigate('/login')
    }  
   useEffect(()=>{
    
   })
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/v1/profile/${state.user.username}`, {headers})
        .then(response =>{
            setData(response.data.user)
            // console.log(data)
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
    
    }, [data]);
   

    return(
        <>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full] hidden md:flex justify-between min-h-screen`}>
            <DashMenu/>
            <Main/> 
            <Chat/>
        </section>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full]  md:hidden justify-between min-h-screen`}>
            <Main/>
            <Footer/>                   
        </section>
        </>
    )
}