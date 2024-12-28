import { useContext, useEffect, useState } from "react"
import { Chat } from "../components/chat"
import { DashMenu } from "../components/dash-menu"
import { Main } from "../components/main"
import { useNavigate } from "react-router"
import { UserContext } from "../components/context/usersReducer"
import axios from "axios"
import { Users } from "../components/user"
import { Footer } from "../components/footer"
import { jwtDecode } from "jwt-decode";
export const Dashboard = () =>{
    
    useEffect(()=>{
      const token = state.user.token
      if(!token || token===''){
        navigate('/login')
        return
      }
      try {
        const decode = jwtDecode(token)
        console.log(decode)
        const currentTime = Date.now()/1000
        if(decode.exp < currentTime){
            navigate('/login')
        }
      } catch (error) {
       console.log(error) 
      }
    }, [])
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)

    const navigate = useNavigate()
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
   
   useEffect(()=>{
    
   })
    useEffect(()=>{
        axios.get(`/api/v1/profile/${state.user.username}`, {headers})
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