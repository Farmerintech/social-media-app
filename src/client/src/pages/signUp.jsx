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
    axios.post('http://localhost:8000/api/v1/auth/register', body, {headers})
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
        <div className="w-full mt-10 flex flex-wrap items-center justify-center content-center ">
        <div className=" md:w-[30%] w-[80%] mt-10 flex justify-center">
            <img src={image} alt="login-page" className="w-[full] h-[300px] "/>
        </div>
        <form className="rounded px-10 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mt-10 mb-10 ">
                <h3 className="font-bold text-3xl">Welcome!</h3>
                <p className="text-lg">Enter Details to Sign up</p>
            </div>
            {isLoading &&
            <div className="w-[30px] h-[30px] flex justify-center item-center">
          <img src={video} controls/>
        </div>}
            <p className="text-red-500 text-sm">{msg}</p>
            <div className="flex flex-wrap md:gap-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input 
            name="username"
            value={form.username}
            onChange={handleForm}
            className="shadow appearance-none border rounded w-[full] py-2 px-10 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder="Username"/>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input 
            name="email"
            value={form.email}
            onChange={handleForm}
            className="shadow appearance-none border rounded w-[full] py-2 px-10 
            text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="email" type="text" placeholder="Email"/>
          </div>
          </div>
          <div className="flex md:gap-6 flex-wrap">
          <div className="relative mb-6">
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
          <div className="mb-6 relative">
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
          {/* <div className="px-3 mb-6 md:mb-0">
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Gender
      </label>
      <div className="relative">
        <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-10 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option>Male</option>
          <option>Female</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>*/}
          <div className="flex flex-col-reverse justify-between mt-5">
            <button className="bg-purple-500 hover:bg-purple-700 
            text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
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