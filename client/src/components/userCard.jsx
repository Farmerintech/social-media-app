import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { Link, useNavigate } from "react-router"
import { Search } from "../components/search"
import { DashMenu } from "../components/dash-menu"
import { BiChat, BiHeart } from "react-icons/bi"
import { Footer } from "./footer"
import { MdMessage } from "react-icons/md"

export const UserCard = ({username}) =>{
    const [data, setData] = useState()
    const [res, setRes] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    const navigate = useNavigate({username})
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }

    useEffect(()=>{
        axios.get(`/api/v1/profile/${username}`, {headers})
        .then(response =>{
            setData(response.data.user)
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
    //  if(!state.user || username === ''){
    //     navigate('/login')
    // }
    }, [data]);
    useEffect(()=>{
        axios.get(`/api/v1/posts/user/${username}`, {headers})
        .then(response =>{
            setRes(response.data)
            // console.log(response.data)
        })
            .catch (error => {
            setMsg(error.response.data.message)
            console.log(error)
            })
        
    }, [res])

    const [form, setForm] = useState(
        {   username:state.user.username,
            email:"",
            bio:""
        }
    )
  

    return(
        <>
       { data && 
           <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full]  hidden md:flex justify-between min-h-screen`}>
                <DashMenu/>
                <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] p-5 pt-5 relative lg:left-[25%] md:left-[35%]">
                     <Search/>
            <p>{msg}</p>
            <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" } p-5`}>
             <div className="flex justify-between">
             <div className={`md p-2 mb-2 flex gap-5`}>
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{username}</h2>
                  <p className="text-xs text-purple-800">@{username}</p>
                </div>
                
            </div>
            {state.user.username === username ?
            <div>
                <p><Link to ="/edit_profile">Edit profile</Link></p>
            </div>:""
        }
            </div>
            <div >
                <Link to={`/dm/${data.username}`}><MdMessage/></Link>
            </div>
            <div>
            <p>{data.bio}</p>
            </div>
           <div className="flex gap-5 mt-5">
            <div>
                <p>{data.posts.length}</p>
                <p>posts</p>
            </div>
            <div>
                <p>{data.followers.length}</p>
                <p>Followers</p>
            </div><div>
                <p>{data.following.length}</p>
                <p>Following</p>
            </div>
            </div>
            </div>
          
            <p>Posts:</p>
            {res && res.posts.length > 0 &&
            res.posts.map(post =>( 
        <div className={`md p-2 mb-2 ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} rounded-md`}>
        <Link to={`/post/add_comment/${post._id}`}>
        <div className="flex gap-5 ">
            <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
            <div>
              {/* <h2>{res && res.users.map((user => user._id ===post.createdBy ? <p>{user.username}</p>:""))}</h2>
              <p className="text-purple-500">{res && res.users.map((user => user._id ===post.createdBy ? <p>@{user.username}</p>:""))}</p> */}
            </div>
        </div>
        <div>
        <p>{post.content}</p>
        
        </div>

        </Link>
         <div className="flex gap-6 mt-5">
                    <div className="flex flex-row gap-2"> <BiHeart/><p>{post.likes.length}</p></div>
                    <div className="flex flex-row gap-2"><BiChat/><p>{post.comments.length}</p></div>
                    </div>
        </div>
            ))
          }
        </main>
       
        </section>
}
{
    data && 
         <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
                <Search/>
           <p>{msg}</p>
            <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" } mb-5 mt-5 p-5`}>
            <div className="flex justify-between">
             <div className={`md p-2 mb-2 flex gap-5`}>
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{username}</h2>
                  <p className="text-xs text-purple-800">@{username}</p>
                </div>
                
            </div>
            {state.user.username === username ?
            <div>
                <p><Link to ="/edit_profile">Edit profile</Link></p>
            </div>:""
        }
            </div>
            <div >
                <Link to={`/dm/${data.username}`}><MdMessage/></Link>
            </div>  
            <div>
            <p>{data.bio}</p>
            </div>
           <div className="flex gap-5 mt-5">
            <div className="flex flex-col items-center">
                <p>{data.posts.length}</p>
                <p>posts</p>
            </div>
            <div className="flex flex-col items-center">
                <p>{data.followers.length}</p>
                <p>Followers</p>
            </div>
            <div className="flex flex-col items-center">
                <p>{data.following.length}</p>
                <p>Following</p>
            </div>
            </div>
            </div>
            <p>Posts:</p>
            {res && res.posts.length > 0 &&
            res.posts.map(post =>( 
        <div className={`md p-2 mb-2 ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} rounded-md`}>
        <Link to={`/post/add_comment/${post._id}`}>
        <div className="flex gap-5 ">
            <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
            <div>
              {/* <h2>{res && res.users.map((user => user._id ===post.createdBy ? <p>{user.username}</p>:""))}</h2>
              <p className="text-purple-500">{res && res.users.map((user => user._id ===post.createdBy ? <p>@{user.username}</p>:""))}</p> */}
            </div>
        </div>
        <div>
        <p>{post.content}</p>
        
        </div>

        </Link>
         <div className="flex gap-6 mt-5">
                    <div className="flex flex-row gap-2"> <BiHeart/><p>{post.likes.length}</p></div>
                    <div className="flex flex-row gap-2"><BiChat/><p>{post.comments.length}</p></div>
                    </div>
        </div>
            ))
          }  
        </section>
}
<Footer/>
        </>
    )
}