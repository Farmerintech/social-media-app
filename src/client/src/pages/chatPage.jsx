import { useParams } from "react-router"
import { ChatBox } from "../components/chatbox"

export const ChatPage = () =>{
    const userB = useParams()
    return(
        <ChatBox userB={userB.id}/>
    )
}