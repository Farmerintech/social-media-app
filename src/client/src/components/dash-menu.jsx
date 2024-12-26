import { ProfileCard } from "./profileCard"
import { BiHome, BiUser } from "react-icons/bi"
import {MdPeople, MdEvent, MdShoppingCart, 
    MdGroup, MdPostAdd, MdOutlineSettings, MdLogout, MdChevronLeft,
    MdOutlinePeople,
    MdOutlinePostAdd,
    MdOutlineEvent,
    MdOutlineShoppingBag,
    MdOutlineGroup,
    MdOutlineLogout,
    MdVerifiedUser
} from "react-icons/md"
import { Footer } from "./footer"
import { useContext } from "react"
import { UserContext } from "./context/usersReducer"
import { Link, useNavigate } from "react-router"
export const DashMenu = ({aditiionalStyle}) => {
    const navigate = useNavigate()

    const {state, dispatch } = useContext(UserContext)
    const Logout = () =>{
        dispatch({type:"Logout"})
        navigate('/login')
    }
    return(
        <>
        <section className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} w-[100%] md:w-[260px] p-5 shadow-md min-h-screen fixed left-0 ${aditiionalStyle}`}>
            <h2 className="font-bold text-2xl">Pur<span className="text-purple-800 text-3xl">ple</span></h2>
                <div className="flex">
                    <div className="border-b border-gray-300 my-4 w-[100%]"></div>
                    <div className={` ${state.theme === "light" ? "bg-white" :"bg-gray-800 text-white"} w-[30px] h-[30px] rounded-full flex items-center justify-center border-gray-700`}>
                        <MdChevronLeft size={20}/>
                    </div>
                </div>
            <div className={`${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"}  p-3 rounded-l-lg md:w-[240px]`}>
                <ProfileCard/>
            </div>
            <ul className="">
            <Link to ="/"><li className={` ${state.theme === "light" ? "bg-black text-white " :"bg-white text-black"} flex items-center gap-3 mb-3 mt-2 p-1 rounded-l-lg`}> 
                    <BiHome/>Home</li></Link>
                <Link to ="/friends">
                <li className="flex items-center gap-3 mb-3"><MdOutlinePeople/>Friends</li>
                </Link>
                <Link to ="/add_post">
                <li className="flex items-center gap-3 mb-3"><MdOutlinePostAdd/>Add Posts</li>
                </Link>
                <Link to ="/my_profile"> 
                <li className="flex items-center gap-3 mb-3"> <BiUser/>My Profile</li>
                </Link>
                <li className="flex items-center gap-3 mb-3"> <MdOutlineShoppingBag/>Mart</li>
                <li className="flex items-center gap-3 mb-3"> <MdOutlineGroup/>Community</li>
            </ul>
            <hr className="my-4 border-gray-300"/>
            <p>Account</p>
            <ul className="min-h-screen">
                <li className="flex items-center gap-3 mb-3"><MdOutlineSettings/>Settings</li>
                <li className="flex items-center gap-3 mb-3" onClick={Logout}><MdOutlineLogout/>Logout</li>
            </ul>
        </section>
        <Footer/>
        </>
    )
}