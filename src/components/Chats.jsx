import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

function Chats() {
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  async function handleLogout() {
    await auth().signOut();
    history.push("/");
  }

  async function getFile(url) {
    const res = await fetch(url);
    const data = await res.blob();

    return new File([data], "Profile.jpg", { type: "image/jpg" });
  }

  useEffect(() => {
    if (!user) {
      return history.push("/");
    }
    //axios get user data provided info in the headers
    axios
      .get("https://api.chatengine.io/users/me", {
        headers: {
          "project-id": process.env.REACT_APP_PROJECT_ID,
          "user-name": user.email,
          "user-secret": user.uid,
          "content-type": "application/json",
        },
      })
      .then(() => {
        // if user exist
        setLoading(false);
        console.log("load user done");
      })
      .catch(() => {
        // if user not exist, we will create new user
        let formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        //pull user image
        getFile(user.photoURL).then((avatar) => {
          formdata.append("avatar", avatar, avatar.name);

          //post to api
          axios
            .post("https://api.chatengine.io/users", formdata, {
              headers: {
                "private-key": process.env.REACT_APP_PRIVATE_KEY,
              },
            })
            .then(() => {
              setLoading(false);
            })
            .catch((error) => {
              console.log(error);
            });
        });
      });
  }, [user]);

  if (!user || loading) return "loading";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChimpiChat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        // 66px is for the header
        height="92vh"
        projectID={process.env.REACT_APP_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      ></ChatEngine>
    </div>
  );
}

export default Chats;
