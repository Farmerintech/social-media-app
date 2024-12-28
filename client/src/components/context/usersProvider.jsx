import { useEffect, useReducer } from "react"
import { getInitialState, InitialStates, UserContext, UserReducer } from "./usersReducer"

export const UserProvider = ({children}) =>{
    const [state, dispatch] =useReducer(UserReducer, getInitialState())
    useEffect(()=>{
            localStorage.setItem("appState", JSON.stringify(state))
        
    }, [state])
    return(
       <UserContext.Provider value={{state, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}