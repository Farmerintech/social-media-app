import { useContext } from "react"
import avater from "../assets/avatar.jpg"
import { UserContext } from "./context/usersReducer"

export const Users = ({user}) =>{
    const {state, dispatch} = useContext(UserContext)
    return(
        <section className={`flex w-[full] px-10 py-3 items-center gap-5 rounded-md ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"}`}>
            <div className=" flex-col w-[60px] ]">
               <div className="w-[52px] border border-purple-800 rounded-xs">
               <img src={avater} alt="user" className="w-[50px] 
               h-[50px] border "/>
              </div> 
               <p className="text-xs">{user}</p>
            </div>
        </section>
    )
}