import { useState } from "react"
import image from "../assets/Exams-cuate.png"
import axios from "axios"
import video from "../assets/loading-unscreen.gif"
import { Link } from "react-router"
import {FaEye, FaEyeSlash} from "react-icons/fa"
export const SignUp = () => {

    const [form, setForm] = useState(
        {
            username:'',
            email:"",
            password:"",
            secondPassword:""
        }
    )
    const [msg, setMsg] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [show, setShow] = useState(false)
    const showPassword = ()=>{
      setShow(!show)
    }

    const handleForm = (event) =>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
        })
    }
    const handleSubmit = (event) => {
      setIsLoading(true)
        event.preventDefault()
        if(form.username === ''){
            setMsg("Username is reqired to login")
            setIsLoading(false)
            return
        }
        if(form.password === ''){
            setMsg("Password is reqired to login")
            setIsLoading(false)
            return
        }
        if(form.password.length < 8){
            setMsg("Password must be at least 8 characters")
            setIsLoading(false)
            return
        }
        if(form.password !== form.secondPassword){
            setMsg("Passwords did not match")
            setIsLoading(false)
            return
        }
        const headers = {
            "Content-type":"application/json",
        }
        const body = {username:form.username, email:form.email, password:form.password}
    axios.post('/api/v1/auth/register', body, {headers})
           .then(response =>{
            setMsg(response.data.message)
            setForm({
                username:'',
                email:"",
                password:'',
                secondPassword:''
            })
            setIsLoading(false)
           })
        .catch (error => {
            setMsg(error.response.data.message)
            setIsLoading(false)
            console.log(error)
        })
    }
    return(
        <div className="w-[full] mt-10 flex flex-wrap items-center justify-center content-center ">
        <div className=" md:w-[30%] w-[80%] mt-10 flex justify-center">
            <img src={image} alt="login-page" className="w-[full] h-[300px] "/>
        </div>
        <form className="rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mt-10 mb-10 ">
                <h3 className="font-bold text-3xl">Welcome!</h3>
                <p className="text-lg">Enter Details to Sign up</p>
            </div>
            {isLoading &&
            <div className="flex justify-center item-center">
          <p className="text-purple-500 font-bold">Loading...</p>
          </div>}
            <p className="text-red-500 text-sm">{msg}</p>
            <div className="flex md:gap-6 flex-wrap">
            <div className="relative mb-6 w-full md:w-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input 
            name="username"
            value={form.username}
            onChange={handleForm}
            className="shadow appearance-none border rounded py-2 px-10 w-full
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder="Username"/>
          </div>
          <div className="relative mb-6 w-full md:w-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input 
            name="email"
            value={form.email}
            onChange={handleForm}
            className="shadow appearance-none border rounded py-2 px-10 w-full
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" type="text" placeholder="Email"/>
          </div>
          </div>
          <div className="flex md:gap-6 flex-wrap">
          <div className="relative mb-6 w-full md:w-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <p className="absolute top-10 right-3" onClick={showPassword}>{show ? <FaEye/>: <FaEyeSlash/>}</p>
            <input 
              name="password"
              value={form.password}
              onChange={handleForm}
            className="shadow appearance-none border
            rounded w-full py-2 px-10 text-gray-700 mb-3 leading-tight 
            focus:outline-none focus:shadow-outline" id="password" 
            type= {show ? "text" : "password"}
            placeholder="******************"/>
          </div>
          <div className="mb-6 relative w-full md:w-auto">
            <label className="block text-gray-700 text-sm font-bold mb-2">
             Confirm Password
            </label>
            <p className="absolute top-10 right-3" onClick={showPassword}>{show ? <FaEye/>: <FaEyeSlash/>}</p>
            <input 
              name="secondPassword"
              value={form.secondPassword}
              onChange={handleForm}
            className="shadow appearance-none border
            rounded w-full py-2 px-10 text-gray-700 mb-3 leading-tight 
            focus:outline-none focus:shadow-outline" id="secondPassword" 
            type= {show ? "text" : "password"}
            placeholder="******************"/>
          </div>
          </div>
          <div className="flex flex-col-reverse justify-between mt-5">
            <button className="bg-purple-500 hover:bg-purple-700 
            text-white font-bold py-2 px-10 md:px-4 rounded focus:outline-none focus:shadow-outline" 
            type="submit">
              Sign Up
            </button>
          </div>
          <p className="inline-block align-baseline font-bold text-sm text-purple-500 hover:text-purple-800">
              Already have an account..? <Link to="/login" className="font-bold text-sm text-purple-500 hover:text-purple-800">Login</Link>
            </p>
        </form>
      </div>      
    )
}