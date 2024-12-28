import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { Link, useNavigate } from "react-router"
import { Search } from "../components/search"
import { DashMenu } from "../components/dash-menu"
import { BiChat, BiHeart } from "react-icons/bi"
import { UserCard } from "../components/userCard"

export const Myprofile = () =>{
    const {state} = useContext(UserContext)
    return(
        <UserCard username={state.user.username}/>
    )
}