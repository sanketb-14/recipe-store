"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import { useProfile } from "../context/UserContext";
import Loader from "./Loader";
import { useToast } from "../hooks/useToast";
import { FaEdit, FaUserCheck } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
const MyProfile = ({ session, recipe, followers, followings }) => {
  const { showToast } = useToast();
  const { loading } = useProfile();

  

  useEffect(() => {
    if (session) {
      localStorage.setItem("session", JSON.stringify(session));
    }
  }, [session]);

  useEffect(() => {
    if (!loading && !session?.user) {
      showToast("No user data available", "error");
    }
  }, [loading, session, showToast]);

  if (loading) {
    return <Loader />;
  }

  const profileData = session?.user;

  if (!profileData) {
    return <div>No user data available</div>;
  }

  return (
    <div className="flex-col lg:flex-row-reverse bg-base-200 p-1 sm:p-2 ">
      <h1 className="text-2xl sm:text-5xl font-semibold text-center mb-4 sm:mb-8 ">
        My-profile!
      </h1>
      <div className="text-center flex flex-col sm:flex-row">
        <div className="bg-base-100 w-full shadow-xl flex flex-col sm:flex-row justify-center items-center">
          {profileData.image && (
            <div className="relative aspect-square flex flex-col  w-full max-w-40 justify-center m-0 sm:m-3 bg-base-300 ">
              <Image
                src={profileData.image}
                fill
                quality={100}
                alt={`User ${profileData.username}`}
                className="object-cover rounded-lg shadow-lg justify-center items-center "
                onError={() =>
                  showToast("Failed to load profile image", "error")
                }
              />
            </div>
          )}
          <div className="  text-center flex flex-col w-full p-0 sm:p-3 justify-evenly  bg-base-100">
            <div className="  flex flex-col sm:flex-row w-full mx-auto   justify-between p-1 sm:p-4 items-center">
              <h2 className="text-sm sm:text-lg  font-semibold text-secondary  flex  justify-center items-center  text-start tracking-wider">
                {" "}
                <span className="text-primary mx-2 ">
                  <FaUserCheck />
                </span>{" "}
                Name: {profileData.name || "User"}
              </h2>
              <p className="text-xs sm:text-sm justify-end flex tracking-wider">
                <span className="text-primary mx-2">
                  <MdEmail />
                </span>
                Email:- {profileData.email || "No email provided"}
              </p>
            </div>
            <div className="flex justify-between  flex-col sm:flex-row items-center my-1 sm:my-3">
              <div className="flex flex-col  sm:flex-row  mb-2 w-full items-center">
                <p className="btn btn-secondary btn-xs sm:btn-sm mx-1 my-1 w-full max-w-40">
                  <RiUserFollowLine /> followers:{" "}
                  {followers ? followers.length : 0}{" "}
                </p>
                <p className="btn btn-xs  btn-secondary sm:btn-sm my-1 w-full max-w-40">
                  <RiUserFollowLine /> followings:{" "}
                  {followings ? followings.length : 0}{" "}
                </p>
              </div>
              <button
                className="btn btn-primary btn-xs btn-wide tracking-widest sm:btn-md "
                onClick={() =>
                  showToast("Edit profile functionality coming soon!", "info")
                }
              >
                <span className="text-primary-content m-2">
                  <FaEdit />
                </span>
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
