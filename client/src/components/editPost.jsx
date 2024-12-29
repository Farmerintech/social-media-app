import { useContext, useEffect, useState } from "react"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { UserContext } from "./context/usersReducer"

export const EditPost = ({postId}) =>{
  
    
    const {state, dispatch} = useContext(UserContext)

    const [data, setData] = useState({
    })
    const [msg, setMsg] = useState()
       const [form, setForm] = useState({
        content:''
       })
    useEffect(()=>{
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        axios.get(`/api/v1/posts/${postId}`, {headers})
        .then(response =>{
            setData(response.data.post);
           })
        .catch (error => {
            setMsg(error.response.data.message)
            console.log(error)
        })
    }, [])
    useEffect(()=>{
        setForm({
            content:data.content
        })
    }, [data])
  
    const handleForm = (event) =>{
        setForm({
            content:event.target.value
        })
        console.log(form)
    }
   
    const handleSubmit = (event) => {
        event.preventDefault()
        if(form.content === ''){
            setMsg("post field is empty")
            return
        }
        const headers = {
            "Content-type":"application/json",
            "Authorization":`Bearer ${state.user.token}`
        }
        axios.put(`/api/v1/posts/${postId}`, form, {headers})
        .then(response =>{
            setMsg(response.data.message);
            setForm({
              content:""
            })
           })
        .catch (error => {
            setMsg(error.response)
            console.log(error)
        })
    }

    return(
        <section className={`${state.theme === "light" ? "bg-white text-black" :"bg-gray-800 text-white"} p-5 rounded-md mt-10`}>
        <p>{msg}</p>
            <form onSubmit={handleSubmit}>
            <div className="flex justify-around gap-2 items-center">
                <img src={avater} alt="user" className="w-[30px] h-[30px] rounded-full"/>
              
                    <textarea type="text" 
                    value={form.content}
                    className={`${state.theme === "light" ? "bg-stone-50 text-black" :"bg-gray-700 text-white"} outline-none w-[70%]  p-2`} 
                    onChange={handleForm}
                    name="content"
                    placeholder="Make a Quick post"/>         
                <button className="w-[full] h-[auto] bg-purple-800 text-white text-sm p-2 rounded-md" type="submit">Send Post</button>
            </div>
            <div>
                <p>Add photo/picture</p>
            </div>
            </form>
        </section>
    )
}