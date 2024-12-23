import { createContext } from "react";

export const UserContext = createContext()
 

export const InitialStates = {
    user: {
        id: '',
        email: '',
        username: '',
        token: '',
    },
    message: {
        text: ''
    },
    theme:"light"
};
export const getInitialState = () =>{
    const storedState = localStorage.getItem("appState");
    return storedState ? JSON.parse(storedState) : InitialStates
}
//
export const UserReducer = (state, action) => {
    
    switch (action.type) {
        case 'Login':
            // Store user information upon login
            return {
                ...state,
                    user:action.payload // Spread operator to merge incoming user info
                }
         case 'setTheme':
            // Store user information upon login
            return {
                ...state,
                    theme:action.payload // Spread operator to merge incoming user info
                }
        case 'Logout':
            // Reset user state on logout
            return InitialStates; // Reset to initial state instead of null
        default:
            return state; // Return current state if no action matches
    }
};
