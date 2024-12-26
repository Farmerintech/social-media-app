import { MdChevronLeft, MdSend } from "react-icons/md"
import avater from "../assets/avatar.jpg"
import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import { Search } from "./search"
import { Link, useParams } from "react-router"
import { DashMenu } from "./dash-menu"
import { Footer } from "./footer"
import {io} from "socket.io-client"
import axios from "axios"
export const ChatBox =({userB}) =>{

    const [chat, setChat] = useState({
        message:""
    })
    const [msg, setMsg] = useState()

    const {state} = useContext(UserContext)
    const handleForm = (event)=>{
        setChat({
            ...chat,
            [event.target.name]:event.target.value
        })  
    }
    // const receiver = useParams(receiver)

    const handleSubmit = (event) =>{
        event.preventDefault()
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        axios.post(`http://localhost:8000/api/v1/chats/${userB}`, chat, {headers})
        .then(response =>{
            // setMsg(response.data)
            console.log(response.data)
            setChat({
                message:''
            })
           })
        .catch (error => {
            // setMsg(error.response.data.message)
            console.log(error)
        })
    }
    useEffect(() => {
        // const socket = io("http://localhost:8000/api/v1/chat"); // Replace with your server URL
        // socket.on('connect', () => {
        //     console.log('Connected to server:', socket.id);
        // });

        // socket.on('disconnect', () => {
        //     console.log('Disconnected from server');
        // });

        // return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        // };
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        const userA= state.user.id;
        axios.get(`http://localhost:8000/api/v1/chats?userA=${userA}&userB=${userB}`, {headers})
        .then(response =>{
            setMsg(response.data)
            console.log(response.data)
           })
        .catch (error => {
            // setMsg(error.response.data.message)
            console.log(error)
        })
    }, [msg]);

    
    return(
        <>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full] hidden md:flex justify-between min-h-screen`}>
        <DashMenu/>
        <main className="flex flex-col gap-5  xl:w-[70%] lg:w-[50%] md:w-[50%] pt-5 relative lg:left-[22%] md:left-[35%]">
        <main className="">
            <div>
                <p>Message</p>
            </div>
            <div className="mb-10 pb-10">
                <ul className="mt-10 mb-10 min-h-screen pb-10">
                {msg && msg.chats.map(msg=>(
                   <li
                   className={`
                     ${
                       state.theme === "light"
                         ? msg.sender === state.user.id
                           ? "relative -right-[60%] top-10 bg-white mt-5"
                           : "relative left-[0%] top-10 bg-gray-200 mt-5"
                         : msg.sender === state.user.id
                         ? "relative -right-[60%] top-10 bg-gray-800 mt-5"
                         : "relative left-[0%] top-10 bg-gray-500 mt-5"
                     }
                     px-2 rounded py-1 w-[40%] mb-2
                   `}
                 >
                   {msg.message}
                 </li>
                 
                                                  
                ))}
               </ul>
            </div>
        </main>
        <div className={`flex gap-2 xl:w-[70%] lg:w-[70%] md:w-[50%] items-center ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-3 fixed bottom-0`}>
               <div className="w-[20%] ">
               <img src ={avater} className="w-[30px] h-[30px] rounded-full"/>
               </div>
                <form className="flex gap-5 justify-between items-center w-[100%]" onSubmit={handleSubmit}>
                    <div className="py-5 flex-1">
                    <input 
                      name="message"
                      value={chat.message}
                      onChange={handleForm}
                       className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-800 text-white" } 
                       shadow appearance-none border-none rounded w-[100%] py-3 px-2
                       leading-tight focus:outline-none focus:shadow-outline`}
                       id="chat" type="text" placeholder="Type here..."/> 
                    </div>
                    <div>
                      <button className="bg-purple-500 hover:bg-purple-700 
                         text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="submit">
                          <MdSend/>
                      </button>
                    </div>
                </form>
        </div>
        </main>
          
        </section>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} md:hidden justify-between min-h-screen`}>
        <main className="">
            <Link to='/'>
               <MdChevronLeft size={25}/>
            </Link>
            <div className="">
                <p>Message</p>
            </div>
            <div className="mb-10">
                <ul className="mb-20  min-h-screen pb-20 ml-5 mr-5 ">
                {msg && msg.chats.map(msg=>(
                        <li
                        className={`
                          ${
                            state.theme === "light"
                              ? msg.sender === state.user.id
                                ? "relative -right-[60%] top-10 bg-white mt-5"
                                : "relative left-[0%] top-10 bg-gray-200 mt-5"
                              : msg.sender === state.user.id
                              ? "relative -right-[60%] top-10 bg-gray-800 mt-5"
                              : "relative left-[0%] top-10 bg-gray-500 mt-5"
                          }
                          px-2 rounded py-1 w-[40%] mb-5
                        `}
                      >
                        {msg.message}
                      </li>                  
                ))}
               </ul>
            </div>
        </main>
        <div className={`flex gap-2 w-[100%] justify-between items-center ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} p-3 fixed bottom-0`}>
               <div className="w-[20%] ">
               <img src ={avater} className="w-[30px] h-[30px] rounded-full"/>
               </div>
                <form className="flex gap-2 justify-between items-center w-[100%]" onSubmit={handleSubmit}>
                    <div className="py-5 flex-1">
                    <input 
                      name="message"
                      value={chat.message}
                      onChange={handleForm}
                       className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } 
                       shadow appearance-none border-none rounded w-[100%] py-2 px-2
                       leading-tight focus:outline-none focus:shadow-outline`}
                       id="chat" type="text" placeholder="Type here..."/> 
                    </div>
                    <div>
                      <button className="bg-purple-500 hover:bg-purple-700 
                         text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                          type="submit">
                          <MdSend/>
                      </button>
                    </div>
                </form>
        </div>
     </section>

        </>
    )
}