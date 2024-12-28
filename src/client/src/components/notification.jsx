import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import axios from "axios"
import { Link } from "react-router"
import { Footer } from "./footer"
import { Search } from "./search"
import { DashMenu } from "./dash-menu"

export const Notifications = () =>{
    const [data, setData] = useState()
    const [res, setRes] = useState()

    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
    const [show, setShow] = useState()
  
    useEffect(()=>{
        axios.get(`/api/v1/notifications`, {headers})
        .then(response =>{
            setData(response.data)
            // console.log(response.data)
            .catch (error => {
            setMsg(error.response.data.message)
            console.log(error)
            })
        })
     .catch (error => {
         setMsg(error.response.data.message)
        //  console.log(error)
     })
     if(!state.user || state.user.username === ''){
    }
    }, [data]);
    return(
        <>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full] hidden md:flex justify-between min-h-screen`}>
        <DashMenu/>
        <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] pt-5 relative lg:left-[22%] md:left-[35%]">
           <Search/>
             <ul className="flex flex-col gap-5">
                {data && data.notification.map(msg=>(
                <Link to={msg.type==="comment" || msg.type==="like" ? `/post/add_comment/${msg.payload}`: '/'}>
                    <li className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-800 text-white"} p-5 rounded-md`}>
                        <p>{msg.message}</p>
                    </li>
                </Link>
                ))}
            </ul>
        </main>
        </section>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
                <Search/>
                <div className="flex flex-col gap-5 mt-10">
                {data && data.notification.map(msg=>(
                <Link to={msg.type==="comment" || msg.type==="like" ? `/post/add_comment/${msg.payload}`: '/'}>
                    <div className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 rounded-md`}>
                        <p>{msg.message}</p>
                    </div>
                </Link>
                ))}
            </div>
        </section>
        <Footer/>
        </>
        
    )
}