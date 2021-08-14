import React from "react";
import { GoogleOutlined, FacebookOutlined } from "@ant-design/icons";
import { auth } from "firebase";
import firebase from "../firebase";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  console.log("useAuth", useAuth());
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to ChimpiChat</h2>
        <div
          className="login-button google"
          onClick={() => {
            console.log("auth", auth);
            auth().signInWithRedirect(new firebase.auth.GoogleAuthProvider());
          }}
        >
          <GoogleOutlined /> Signin with Google
        </div>
        <div
          className="login-button facebook"
          onClick={() =>
            auth().signInWithRedirect(new firebase.auth.FacebookAuthProvider())
          }
        >
          <FacebookOutlined /> Signin with Facebook
        </div>
      </div>
    </div>
  );
}

export default Login;
