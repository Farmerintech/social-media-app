import { useContext, useState } from "react"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { UserContext } from "../components/context/usersReducer"
import { Link } from "react-router"
import { DashMenu } from "../components/dash-menu"
import { Search } from "../components/search"
import { Footer } from "../components/footer"
export const MakePost = () =>{
    const [form, setForm] = useState({
          content:''
    })
    
    const {state, dispatch} = useContext(UserContext)

    const [data, setData] = useState({
    })
    const [msg, setMsg] = useState()
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }

        
     if(!state.user || state.user.username === ''){
    }
    const handleForm = (event) =>{
        setForm({
            ...form,
            [event.target.name]:event.target.value
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
          axios.post(`http://localhost:8000/api/v1/posts`, form, {headers})
          .then(response =>{
              setMsg(response.data.message)
             })
          .catch (error => {
              setMsg(error.response.data.message)
              console.log(error)
          })
      }

    return(
        <>
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full] hidden md:flex justify-between min-h-screen`}>
        <DashMenu/>
        <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] pt-5 relative lg:left-[22%] md:left-[35%]">
           <Search/>
            <form onSubmit={handleSubmit} className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} p-5`}>
                <p>{msg}</p>
            <div className={`flex flex-wrap justify-around gap-2 items-center `}>
                <Link to="/"><img src={avater} alt="user" className="w-[30px] h-[30px] rounded-full"/></Link>
              
                    <input type="text" 
                    className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-800 text-white"}  outline-none w-[70%] p-2`} 
                    onChange={handleForm}
                    name="content"
                    placeholder="Make a post"
                    />
         
                <button className="w-[full] h-[auto] bg-purple-800 text-white text-sm p-2 rounded-md" type="submit">Send Post</button>
            </div>
            <div>
                <p>Add photo/picture</p>
            </div>
            </form>
            </main>
        </section>
       
       
        <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
        <Search/>
        <form onSubmit={handleSubmit} className={`${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} p-5 mt-5 `}>
                <p>{msg}</p>
            <div className="flex justify-around gap-2 items-center ">
                <Link to="/"><img src={avater} alt="user" className="w-[30px] h-[30px] rounded-full"/></Link>
              
                    <input type="text" 
                    className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-800 text-white"}  outline-none w-[70%] p-2`} 
                    onChange={handleForm}
                    name="content"
                    placeholder="Make a post"
                    />
         
                <button className="w-[full] h-[auto] bg-purple-800 text-white text-sm p-2 rounded-md" type="submit">Send Post</button>
            </div>
            <div>
                <p>Add photo/picture</p>
            </div>
            </form>        
            </section>
        <Footer/>
        </>    )
}

