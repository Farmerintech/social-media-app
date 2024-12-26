import { useParams } from "react-router"
import { EditPost } from "../components/editPost"

export const EditPostPage = () =>{
    const postId = useParams()
    return(
        <EditPost postId={postId.id}/>
    )
}