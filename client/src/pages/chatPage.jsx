import { useParams } from "react-router"
import { ChatBox } from "../components/chatbox"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../components/context/usersReducer"

export const ChatPage = () =>{
    const userB = useParams()
    const [res, setRes] = useState()
    const {state} = useContext(UserContext)
    // useEffect(()=>{
            // const socket = io("http://localhost:8000/api/v1/chat"); // Replace with your server URL
        // socket.on('connect', () => {
        //     console.log('Connected to server:', socket.id);
        // });

        // socket.on('disconnect', () => {
        //     console.log('Disconnected from server');
        // });

        // return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        // };

    //     }, [])
    return(
        <ChatBox userB={userB.user}/>
    )
}