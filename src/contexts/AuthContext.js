import React, { useContext, useState, useEffect, createContext } from "react";
import { useHistory } from "react-router";
import { auth } from "../firebase";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    setLoading(true);
    auth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
      if (user) history.push("/chats");
    });
  }, [user, history]);

  let value = { user };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
