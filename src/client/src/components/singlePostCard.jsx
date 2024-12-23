import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import avater from "../assets/avatar.jpg"
import { BiChat, BiHeart } from "react-icons/bi"

export const SinglePostCard = ({postId}) => {
    const {state, dispatch} = useContext(UserContext)

  
        const [data, setData] = useState({
        })
        const [res, setRes] = useState()
        const [user_Id, setUserId] = useState()
        const [msg, setMsg] = useState()
        let userId

    useEffect(()=>{
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        axios.get(`http://localhost:8000/api/v1/posts/${postId}`, {headers})
        .then(response =>{
            setData(response.data)
            console.log(response.data.post)
           
                 axios.get(`http://localhost:8000/api/v1/users`, {headers})
                 .then(response =>{
                    console.log(response.data)
                    setRes(response.data)
                 })
                 .catch (error => {
                 setMsg(error.response.data.message)
                 console.log(error)
                 })
                
                             
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
     if(!state.user || state.user.username === ''){
    }
    }, [data]);
 
      console.log(data)
     


    
    return(
        <section className={` ${state.theme === "light" ? "bg-white " :"bg-gray-800 text-white"} md:p-10 p-3`}>
            {data.post && 
            <>
            
            <div className="flex gap-5 ">
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{state.user.username}</h2>
                  <p className="text-purple-500">@{state.user.username}</p>
                </div>
            </div>
            <div>
            <p>{data.post.content}</p>
            
            </div>
            <div className="flex gap-6 mt-5">
            <div className="flex flex-row gap-2"> <BiHeart/><p>{data.post.likes.length}</p></div>
            <div className="flex flex-row gap-2"><BiChat/><p>{data.post.comments.length}</p></div>
            </div>
            <div className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5`}>
                <h4 className=" mb-5">Comments</h4>
                {data.post.comments && data.post.comments.map(comment =>(
          <div>
             <div className="flex gap-3">
            <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
             {res && res.users.map((user => user._id ===comment.commentedBy ? <p>{user.username}</p>:"")
             ) 
             }
        </div>
        <p className="px-5">{comment.comment}</p>
          </div>
                ))}
            </div>
            </>
            }
        </section>
    )
}