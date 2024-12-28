import { useContext, useEffect, useState } from "react"
import { AddPost } from "./Addpost"
import { Search } from "./search"
import axios from "axios"
import { UserContext } from "./context/usersReducer"
import { Users } from "./user"
import { Footer } from "./footer"
import { Post } from "./posts"

export const Main = () =>{
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
    
    useEffect(()=>{
        axios.get(`/api/v1/profile/${state.user.username}`, {headers})
        .then(response =>{
            setData(response.data.user)
            // console.log(data.followers.length)
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
     if(!state.user || state.user.username === ''){
    }
    }, [data]);
   

    return (
        <main className="flex flex-col gap-5 lg:w-[50%] md:w-[40%] p-5 md:pt-5 relative lg:left-[22%] md:left-[32%]">
            <Search/>
            <section className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} flex w-[full] px-10 py-3 items-center gap-5 `}>

            {data && data.followers.length ?
                data.followers.map(follower =>(
                <Users user={follower.username}/>
            ))
            :<p className="text-center">You have no followers Yet</p>}
            </section>
            <AddPost/>
            <Post/>
        </main>
    )
}