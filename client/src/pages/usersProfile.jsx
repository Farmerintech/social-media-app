import { useContext, useEffect, useState } from "react"
import { UserContext } from "../components/context/usersReducer"
import avater from "../assets/avatar.jpg"
import axios from "axios"
import { Link, useNavigate, useParams } from "react-router"
import { Search } from "../components/search"
import { DashMenu } from "../components/dash-menu"
import { BiChat, BiHeart } from "react-icons/bi"
import { UserCard } from "../components/userCard"

export const UserProfile = () =>{
    const {state} = useContext(UserContext)
    const params = useParams()
    return(
        <UserCard username={params.username  }/>
    )
}