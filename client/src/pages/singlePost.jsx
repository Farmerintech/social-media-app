import { useParams } from "react-router";
import { SinglePostCard } from "../components/singlePostCard"
import { DashMenu } from "../components/dash-menu";
import { Search } from "../components/search";
import { useContext } from "react";
import { UserContext } from "../components/context/usersReducer";
import { AddComment } from "../components/AddComment";
import { Footer } from "../components/footer";
export const SinglePost = () =>{
    const {state} = useContext(UserContext)
    const params = useParams()
    const postId = params.postId
    return(
        <>
           <section className={` ${state.theme === "light" ? "bg-stone-50 text-black" :"bg-gray-700 text-white"} h-[full]  hidden md:flex justify-between min-h-screen`}>
                <DashMenu/>
                <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] pt-5 relative lg:left-[25%] md:left-[35%]">
                     <Search/>
                     <AddComment postId={postId}/>
                    <SinglePostCard postId={postId}/>
                </main>
                </section>
                <section className={` ${state.theme === "light" ? "bg-stone-50 text-black" :"bg-gray-700 text-white"} p-5 md:hidden justify-between min-h-screen`}>
                <div className="mt-5 mb-5">
                <Search/>
                </div>
                <div className="mt-5 mb-5"> <AddComment postId={postId}/></div>
                <div className="mt-5 md:mb-5 mb-20">
                <SinglePostCard postId={postId}/>
                </div>
                </section>
            <Footer/>
        </>
    )
}