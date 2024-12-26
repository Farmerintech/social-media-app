import { useContext } from "react"
import avater from "../assets/avatar.jpg"
import { UserContext } from "./context/usersReducer"

export const Users = ({user}) =>{
    const {state, dispatch} = useContext(UserContext)
    return(
        <section className={``}>
            <div className=" flex-col w-[60px] items-center ">
               <img src={avater} alt="user" className="w-[50px] 
               h-[50px] rounded "/>
               <p className="text-xs">{user}</p>
            </div>
        </section>
    )
}