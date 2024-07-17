"use client";

import { useState, createContext, useContext, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";


const UserContext = createContext();

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [followStatus, setFollowStatus] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedSession = localStorage.getItem("session");
        if (storedSession) {
          const session = JSON.parse(storedSession);
          if (session.user) {
            setUser(session.user);
            setToken(session.accessToken);
          } else {
            const response = await axiosInstance.get(
              `${baseUrl}/api/v1/auth/my-account`
            );
            setUser(response.data);
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setError(error.message || "An error occurred while fetching user data");
        toast.error(error);
      } finally {
        setLoading(false);
      }
    };
    console.log(error);

    fetchUser();
  }, []);

  const followUser = async (userIdToFollow) => {
    try {
      const response = await axios.post(
        `${baseUrl}/api/v1/auth/follow-user`,
        { userIdToFollow },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
        }
      );
      const data = await response.data;
     
      setFollowStatus(data.message);
    } catch (error) {
      console.log("error  user:", error);
    }
  };

  const updateUser = (newUserData) => {
    setUser(newUserData);
    localStorage.setItem("session", JSON.stringify({ user: newUserData }));
  };

  const setLoginError = (errorMessage) => {
    setError(errorMessage);
    notify(errorMessage, "error");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser: updateUser,
        token,
     
        setLoginError,
        followUser,
        followStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a UserProvider");
  }
  return context;
};
