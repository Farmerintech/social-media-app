import { useContext, useEffect, useState } from "react"
import { UserContext } from "./context/usersReducer"
import axios from "axios"

export const handleFollow = (id, username, token) => {
    const headers = {
        "Content-type":"application/json",
        "Authorization":`Bearer ${token}`
    }
    axios
      .post(
        `/api/v1/follow/${username}`,
        {}, // Empty body since no data is needed
        { headers }
      )
      .then((response) => {
        // setResp(response.data);
        // setMsg(`You are now following ${username}`);
        // alert(` ${response.data.message}`);
        window.navigator.vibrate(700)
      })
      .catch((error) => {
        // setMsg(error.response?.data?.message || "Error following user");
        console.error(error);
      });
  };