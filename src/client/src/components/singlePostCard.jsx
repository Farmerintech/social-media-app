import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import avater from "../assets/avatar.jpg"
import { BiChat, BiHeart } from "react-icons/bi"
import { MdDelete, MdEdit } from "react-icons/md"
import { Link, useNavigate } from "react-router"
import { FaHeart } from "react-icons/fa"

export const SinglePostCard = ({postId}) => {
    const {state, dispatch} = useContext(UserContext)

  
        const [data, setData] = useState({
        })
        const [res, setRes] = useState()
        const [user_Id, setUserId] = useState()
        const [msg, setMsg] = useState()

    useEffect(()=>{
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        axios.get(`/api/v1/posts/${postId}`, {headers})
        .then(response =>{
            setData(response.data)
            // console.log(response.data.post)
           
                 axios.get(`/api/v1/users`, {headers})
                 .then(response =>{
                    // console.log(response.data)
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
     
      const [text, setText] = useState('')
      const likePost = (postId, token)=>{
         const headers = {
             "Content-type":"application/json",
             "Authorization":`Bearer ${token}`
         }
                 axios.post(`/api/v1/like/${postId}`, 
                     {}, // Empty body since no data is needed
                 {headers})
                 .then(response =>{
                    // console.log(response.data)
                 //    setMsg(response.data)
                 setText(response.data.Message)
                setInterval(()=>{
                     setText('')
                 }, 1000)
                 })
                 .catch (error => {
                 //  msg = (error.response.data.message)
                 console.log(error)
                 })
         // let res = LikePost(postId, token)
        
     
     }
     const navigate = useNavigate()
const DeletePost = ()=>{
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
            axios.delete(`/api/v1/posts/${postId}`, 
            {headers})
            .then(response =>{
             alert('post deleted');
             navigate('/')
            setText(response.data.Message)
            })
            .catch (error => {
            //  msg = (error.response.data.message)
            console.log(error)
            })
}
    
    return(
        <section className={` ${state.theme === "light" ? "bg-white " :"bg-gray-800 text-white"} md:p-10 p-3`}>
            {data.post && 
            <>
            <div className="flex justify-between items-center">
            <div className="flex gap-5 ">
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                {res && res.users.map((user => user._id ===data.post.createdBy ? 
                <div>         
                  <h2>{user.username}</h2>
                  <p className="text-purple-500">@{user.username}</p>
                </div>
                 :""))}
            </div>
            <div>
                {data.post.createdBy === state.user.id ? 
                <div className="flex items-center gap-2">
                     <Link to={`/edit_post/${data.post._id}`}><MdEdit/></Link>
                     <div onClick={DeletePost}><MdDelete/></div>
                </div>
               :""
            }
            </div>
            </div>
            <div>
            <p>{data.post.content}</p>
            
            </div>
            <div className="flex gap-6 mt-5">
                <div className="flex flex-row gap-2 items-center" onClick={()=>likePost(data.post._id, state.user.token)}> 
                {data.post.likes.includes(state.user.id) ? <FaHeart color="red"/> :<BiHeart />}
                <p>{data.post.likes.length}</p></div>            
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