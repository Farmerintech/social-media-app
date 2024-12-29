import { useContext, useState } from "react"
import { MdSearch, MdSunny } from "react-icons/md"
import { UserContext } from "./context/usersReducer"
import { BiMoon, BiSun } from "react-icons/bi"

export const Search = () =>{
    const [theme, setTheme] = useState("light")
    const {state, dispatch} = useContext(UserContext)
    const changeTheme = () =>{
        theme === "light" ? setTheme("dark") : setTheme("light")
        dispatch({type:"setTheme", payload:theme})
    }
    return(
        <section className="flex justify-between items-center">
            <form className={`${state.theme === "light" ? "bg-white text-black" :"bg-gray-800"} flex w-[90%] px-10 py-3 items-center gap-5 rounded-md`}>
                <span><MdSearch size={20}/></span>
                <input type="text" placeholder="Who are you looking for..?" className={`${state.theme === "light" ? "bg-white" :"bg-gray-800"} outline-none`}/>
            </form>
            <div onClick={changeTheme} className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} w-[30px] h-[30px] flex justify-center items-center rounded-full`}>
              {state.theme === "dark" ? <BiSun/>: <BiMoon/>}
            </div>
        </section>
    )
}