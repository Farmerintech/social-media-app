import { useParams } from "react-router"
import { EditPost } from "../components/editPost"
import { useContext } from "react"
import { UserContext } from "../components/context/usersReducer"
import { DashMenu } from "../components/dash-menu"
import { Search } from "../components/search"
import { Footer } from "../components/footer"

export const EditPostPage = () =>{
    const {state} = useContext(UserContext)
    const postId = useParams()
    
    return(
    <>
         <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} h-[full] hidden md:flex justify-between min-h-screen`}>
                <DashMenu/>
                <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] pt-5 relative lg:left-[22%] md:left-[35%]">
                   <Search/>
        <EditPost postId={postId.id}/>
        </main>
        </section>
         <section className={` ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
            <Search/>
            <EditPost postId={postId.id}/>

        </section>
        <Footer/>
</>        
    )
}