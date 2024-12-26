import { useContext } from "react"
import { UserContext } from "./context/usersReducer"

export const Modal = ({text}) =>{
    return(
        <section>
        <div className={'fixed top-20 md:left-50 bg-purple-800 p-3 w-[90%] md:w-[30%] lg:w-[45%]'}>
            <p className={`font-bold text-white text-center`}>{text}</p>
        </div>
        </section>
     
       
    )
}