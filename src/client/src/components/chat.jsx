import {MdOutlineNotifications, MdSearch} from "react-icons/md"
import avater from "../assets/avatar.jpg"
import { Footer } from "./footer"
import { useContext, useState, useEffect,  } from "react"
import { UserContext } from "./context/usersReducer"
import axios from "axios"
import { Link, useNavigate } from "react-router"
import { Users } from "./user"
export const Chat = () =>{
    const {state, dispatch} = useContext(UserContext)
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const navigate = useNavigate()
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }

    useEffect(()=>{
        axios.get(`/api/v1/profile/${state.user.username}`, {headers})
        .then(response =>{
            setData(response.data.user)
            // console.log(data.post)
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
    //  if(!state.user || state.user.username === ''){
    //     navigate('/login')
    // }
    }, [data]);

     return(
        <>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} w-[100%] p-5 md:w-[25%] fixed right-0 min-h-screen`}>
            <div className="flex justify-around items-center mb-5">
                <div className="hidden md:block relative">
                   <Link to='/notifications'>
                     <span className="absolute bg-purple-800 w-[5px] h-[5px] rounded-full left-[100] top-[100]"></span>
                    <MdOutlineNotifications size={20}/>
                </Link> 
                </div>
                <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} shadow-md w-[100%] md:w-[220px] p-2 text-xs rounded-md`}>
                            <p></p>
                            <div className="flex items-center gap-5 ">
                                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                                <div>
                                  <h2>{state.user.username}</h2>
                                  <p className="text-purple-500">@{state.user.username}</p>
                                </div>
                            </div>
                            </div>
            </div>
            <section className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} h-[300px] rounded-md min-h-screen`}>
               <div className="flex justify-between items-center p-5">
                <h3 className="font-bold">Messages</h3>
                <MdSearch/>
                
               </div>
               <section className={` `}>
            
            {data && data.followers.length ?
                data.followers.map(follower =>(
            <section className={`p-5`}>
            <Link to ={`/dm/${follower.username}`}><div className=" flex gap-2 w-[100%] items-center ">
               <img src={avater} alt="user" className="w-[30px] 
               h-[30px] rounded "/>
               <p className="text-xs">{follower.username}</p>
            </div></Link>
        </section>            ))
            :<p className="text-center">You have no followers Yet</p>}
            </section>

            </section>
            <section className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"}  h-[150px] mt-5`}>
               <div className="flex justify-between items-center p-5">
                <h3 className="font-bold">Community</h3>
               
               </div>
            </section>
        </section>
        <Footer/>
        </>
    )
}