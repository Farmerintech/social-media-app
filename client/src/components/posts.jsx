import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { MdAddComment } from "react-icons/md"
import { FaHeart } from "react-icons/fa"
import { BiChat, BiHeart } from "react-icons/bi"

import { Link } from "react-router"
import { LikePost } from "./likePost"
import { Modal } from "./modal"
import { formatMessageDate } from "./date"
// import { LikePost } from "./likePost"
 export const Post = ()=>{
    const [data, setData] = useState()
    const [res, setRes] = useState()

    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
    const [show, setShow] = useState()
    const showComm = () => {
        setShow(!show)
    }
    useEffect(()=>{
        axios.get(`/api/v1/posts`, {headers})
        .then(response =>{
            setData(response.data)
            // console.log(response.data)
            axios.get(`/api/v1/users`, {headers})
            .then(response =>{
            //    console.log(response.data)
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
               console.log(response.data)
            //    setMsg(response.data)
            setText(response.data.Message)
            window.navigator.vibrate(700)
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

    return (
        <section className="mb-20">
            {text !== "" && <Modal text={text}/>}
           {data && data?.posts.length > 0 &&
                data.posts.map(post =>( 
            <div className={`md p-5 mb-5 ${state.theme === "light" ? "bg-white text-black" :"bg-gray-800 text-white"} rounded-md`}>
            <Link to={`/post/add_comment/${post._id}`}>
            <div className="flex items-center justify-between">
            <div className="flex gap-5 ">
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{res && res.users.map((user => user._id ===post.createdBy ? <p>{user.username}</p>:""))}</h2>
                  <p className="text-purple-500 text-xs">{res && res.users.map((user => user._id ===post.createdBy ? <p>@{user.username}</p>:""))}</p>
                </div>
            </div>
            <p className={`text-xs`}> {formatMessageDate(post.createdAt)}</p>
            </div>
            <div>
            <p>{post.content}</p>
            
            </div>
            </Link>
            <div className="flex gap-6 mt-5">
            <div className="flex flex-row gap-2 items-center" onClick={()=>likePost(post._id, state.user.token)}> 
                {post.likes.includes(state.user.id) ? <FaHeart color="red"/> :<BiHeart />}
                <p>{post.likes.length}</p></div>
            <div className="flex flex-row gap-2" onClick={showComm}><BiChat/><p>{post.comments.length}</p></div>
            </div>
            <div className={`p-5 rounded-md ${state.theme === "light" ? "bg-stone-50 text-black" :"bg-gray-700 text-white"}`}>
            <p className="">Comments</p>
            { show && post.comments.map(mycomment =>(
          <div className="mb-5">
            <div className="flex gap-3">
            <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
             {res && res.users.map((user => user._id ===mycomment.commentedBy ? <p>{user.username}</p>:"")
             ) 
             }
        </div>
        <p>{mycomment.comment}</p>
        </div>
                ))
            }</div>
            </div>
        ))}
        </section>
    )

}

