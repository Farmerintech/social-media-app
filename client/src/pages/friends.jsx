import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/context/usersReducer";
import avatar from "../assets/avatar.jpg";
import { DashMenu } from "../components/dash-menu";
import { Search } from "../components/search";
import { Footer } from "../components/footer";
import { Link } from "react-router";
import { handleFollow } from "../components/follow";

export const Friends = () => {
  const [res, setRes] = useState();
  const [data, setData] = useState();
  const [msg, setMsg] = useState();
  const [resp, setResp] = useState();
  const { state } = useContext(UserContext);

  // Common headers for requests
  const headers = {
    "Content-type": "application/json",
    Authorization: `Bearer ${state.user.token}`,
  };

  // Fetch user and friend list on mount
  useEffect(() => {
    axios
      .get(`/api/v1/users/${state.user.id}`, { headers })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        setMsg(error.response?.data?.message || "Error fetching user data");
        console.error(error);
      });

    axios
      .get(`/api/v1/users`, { headers })
      .then((response) => {
        setRes(response.data);
      })
      .catch((error) => {
        setMsg(error.response?.data?.message || "Error fetching users list");
        console.error(error);
      });
  }, [state.user.id]);

  // Handle follow button click
  

  return (
    <>
      <section
        className={`${
          state.theme === "light" ? "bg-stone-50" : "bg-gray-700 text-white"
        } h-[full] hidden md:flex justify-between min-h-screen`}
      >
        <DashMenu />
        <main className="flex flex-col gap-5 lg:w-[70%] md:w-[60%] pt-5 relative lg:left-[22%] md:left-[35%]">
          <Search />
          <div
            className={`${
              state.theme === "light" ? "bg-white" : "bg-gray-800 text-white"
            }`}
          >
            {res &&
              res.users.map((user) => (
                <div className="flex p-5 justify-between" key={user.id}>
                  <div className="flex gap-5">
                    <img
                      src={avatar}
                      alt={user._id}
                      className="w-[50px] h-[50px] border rounded-full"
                    />
                    <div>
                      <p><Link to ={`/${user.username}`}>{user.username}</Link></p>
                      <p className="text-purple-800 text-xs">
                        @{user.username}
                      </p>
                      {data &&
                      data.user.following.includes(user._id) ? (
                        <p>Following</p>
                      ) : (
                        <p>Not following</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleFollow(user.id, user.username, state.user.token)}
                      className="bg-purple-800 text-white px-4 py-2 rounded"
                    >
                      {data &&
                      data.user.following.includes(user._id) ? "Unfollow" :"Follow"}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </main>
      </section>

      <section className={`min-h-screen ${state.theme === "light" ? "bg-stone-50" :"bg-gray-700 text-white"} p-5 md:hidden justify-between } `}>
            <Search/>
          <div
            className={`${
              state.theme === "light" ? "bg-white" : "bg-gray-800 text-white "
            } mt-10`}
          >
            {res &&
              res.users.map((user) => (
                <div className="flex p-5 justify-between" key={user.id}>
                  <div className="flex gap-5">
                    <img
                      src={avatar}
                      alt={user._id}
                      className="w-[50px] h-[50px] border rounded-full"
                    />
                    <div>
                    <p><Link to ={`/${user.username}`}>{user.username}</Link></p>                      
                    <p className="text-purple-800 text-xs">
                        @{user.username}
                      </p>
                      {data &&
                      data.user.following.includes(user._id) ? (
                        <p>Following</p>
                      ) : (
                        <p>Not following</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => handleFollow(user.id, user.username, state.user.token)}
                      className="bg-purple-800 text-white px-2 py-2 rounded"
                    >
                        {data &&
                      data.user.following.includes(user._id) ? "Unfollow" :"Follow"}
                      
                    </button>
                  </div>
                </div>
              ))}
          </div>
      </section>
      <Footer/>

    </>
  );
};
