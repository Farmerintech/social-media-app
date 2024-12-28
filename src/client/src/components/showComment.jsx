import { useEffect, useState } from "react"
import { useContext } from "react"
import { UserContext } from "./context/usersReducer"

export const showComment = () =>{
    const [data, setData] = useState()
    const [msg, setMsg] = useState()
    const {state, dispatch} = useContext(UserContext)
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${state.user.token}`
    }
    
    useEffect(()=>{
        axios.get(`/api/v1/posts`, {headers})
        .then(response =>{
            setData(response.data)
            // console.log(response.data)
        })
     .catch (error => {
         setMsg(error.response.data.message)
         console.log(error)
     })
     if(!state.user || state.user.username === ''){
    }
    }, [data]);

    <section>
        {data && data.posts.length > 0 &&
                data.posts.comments.map(mycomment =>(
          <div>
             <p>{mycomment.comment}</p>
           <p>{mycomment.commentedBy}</p>
          </div>
                ))
        }
    </section>
}