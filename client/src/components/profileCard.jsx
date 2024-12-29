import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { useNavigate } from "react-router"

export const ProfileCard = () =>{
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
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
        //  setMsg(error.response.data.message)
         console.log(error)
     })
    //  if(!state.user || state.user.username === ''){
    //     navigate('/login')
    // }
    }, [data]);
    return(
        <>
       { data && 
       <section className={`${state.theme === "light" ? "bg-white text-black" :"bg-gray-800 text-white"} shadow-md w-[100%] md:w-[220px] h-[auto] p-2 text-xs rounded-md`}>
            <p>{msg}</p>
            <div className="flex gap-5 ">
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2 className="text-lg font-bld">Hi, {state.user.username}</h2>
                  <p className="text-purple-500">@{state.user.username}</p>
                </div>
            </div>
           <div className="flex gap-5 items-center justify-center mt-5">
            <div className="text-center">
                <p>{data.posts.length}</p>
                <p>posts</p>
            </div>
            <div className="text-center">
                <p>{data.followers.length}</p>
                <p>Followers</p>
            </div>
            <div className="text-center">
                <p>{data.following.length}</p>
                <p>Following</p>
            </div>
            </div>
        </section>}
        </>
    )
}