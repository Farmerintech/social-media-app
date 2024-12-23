import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { Search } from "../components/search"
import { DashMenu } from "../components/dash-menu"
import { Footer } from "../components/footer"
export const EditProfile = ({}) =>{
    
   
    const [msg, setMsg] = useState()
    const {state} = useContext(UserContext)
    
const [isLoading, setIsLoading] = useState(false)
    const [form, setForm] = useState({
        username:state.user.username,
        email:"",
        bio:""
    })
    const handleForm = (event) =>{
       
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = (event) => {
      setIsLoading(true)
        event.preventDefault()
        
        if(!form.email || form.bio === ''){
            setMsg("empty fieds cannot be updated")
            setIsLoading(false)
            return
        }
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        console.log(form)
    axios.put('http://localhost:8000/api/v1/profile/update', form, {headers})
           .then(response =>{
            setMsg(response.data.message)
           
            // console.log(localStorage.getItem('user'))
            setIsLoading(false)
           })
        .catch (error => {
            setMsg(error.response.data.message)
            setIsLoading(false)
            console.log(error)
        })
    }

    return(
        <>
       { state.user && 
           <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full]  hidden md:flex justify-between min-h-screen`}>
                <DashMenu/>
                <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] p-5 pt-5 relative lg:left-[25%] md:left-[35%]">
                     <Search/>
            <p>{msg}</p>
            <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" } p-5`}>
            <div className={`md p-2 mb-2 flex gap-5`}>
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{state.user.username}</h2>
                  <p className="text-xs text-purple-800">@{state.user.username}</p>
                </div>
                
            </div>
            <div>
            <p>{state.user.bio}</p>
            </div>
           <div className="flex gap-5 mt-5">
           
            </div>
            </div>
            <div>
                <p>Edit profile:</p>
                <p>{msg}</p>
                <form onSubmit={handleSubmit} className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" }`}>
                <div className="py-5 px-10 w-[full]">
                <p>{state.user.username}</p>
             <input 
            name="username"
            value={form.username}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="username" type="text" placeholder="Username" disabled/>
            </div>  
            <div className="py-5 px-10 w-[full]">
            <p>{state.user.email}</p>
             <input 
            name="email"
            value={form.email}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="email" type="text" placeholder="email"/> 
            </div> 
             <div className="py-5 px-10 w-[full]">
             <p>{state.user?.bio || "bio"}</p>
             <input 
            name="bio"
            value={form.bio}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="bio" type="text" placeholder="bio"/> 
            </div> 
            <div className="px-10 py-3">
            <button className="bg-purple-500 hover:bg-purple-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
              Update
            </button>            
            </div>
             </form>          
            </div>
        </main>
       
        </section>
}
{
    state.user && 
         <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
                <Search/>
           <p>{msg}</p>
            <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" } mb-5 mt-5 p-5`}>
            <div className={`md p-2 mb-2 flex gap-5`}>
                <img src={avater} className="w-[30px] h-[30px] rounded-full"/>
                <div>
                  <h2>{state.user.username}</h2>
                  <p className="text-xs text-purple-800">@{state.user.username}</p>
                </div>
                
            </div>
            <div>
            <p>{state.user.bio}</p>
            </div>
           <div className="flex gap-5 mt-5">
            
            </div>
            </div>
            <div className="mb-5">
                <p>Edit profile:</p>
              <form onSubmit={handleSubmit} className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white" } mb-10`}>
              <div className="py-5 px-10 w-[full]">
                <p>{state.user.username}</p>
             <input 
            name="username"
            value={form.username}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="username" type="text" placeholder="Username" disabled/>
            </div>  
            <div className="py-5 px-10 w-[full]">
            <p>{state.user.email}</p>
             <input 
            name="email"
            value={form.email}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="email" type="text" placeholder="email"/> 
            </div> 
             <div className="py-5 px-10 w-[full]">
             <p>{state.user?.bio || "bio"}</p>
             <input 
            name="bio"
            value={form.bio}
            onChange={handleForm}
           className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white" } shadow appearance-none border-none rounded w-[full] py-2 px-10 
            leading-tight focus:outline-none focus:shadow-outline`}
            id="bio" type="text" placeholder="bio"/> 
            </div> 
            <div className="px-10 py-3">
            <button className="bg-purple-500 hover:bg-purple-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
              Update
            </button>            
            </div>
             </form>          
            </div>:
    </section>
}
<Footer/>
        </>
    )
}