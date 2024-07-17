"use client"
import Image from "next/image";
import Link from "next/link";
import { RiUserAddLine } from "react-icons/ri";
import { FaUserCheck } from "react-icons/fa";


import { useProfile } from "../context/UserContext";
import { useState } from "react";
import { useToast } from "../hooks/useToast";
import { followUserAction } from "../lib/action";



const FollowBtn = ({ recipeUser, followings }) => {
  
    

    const isInitiallyFollowing = followings?.user.following && 
      Array.isArray(followings?.user.following) &&
      followings?.user.following.some(followedUser => followedUser.id === recipeUser.id);
  
  
    const [isFollowing, setIsFollowing] = useState(isInitiallyFollowing);
  
    
    const { showToast } = useToast();
    const { user } = useProfile();
   
    async function handleClick(userId) {
      try {
        const data = await followUserAction(userId);
        setIsFollowing(data.status === "success" ? true : false);
        showToast(data.message, "success"
        );
      } catch (error) {
        showToast("An error occurred. Please try again.", "error");
      }
    }
   
  


  return (
    <div className={`w-full flex  justify-end m-1 items-center text-sm ${user?.id !== recipeUser?.id ? "": "hidden" }`}>
      <button
        onClick={() => handleClick(recipeUser.id)}
        className={`btn btn-sm mx-2 ${isFollowing ? 'btn-secondary' : 'btn-primary'}`}
      >
        {isFollowing? <FaUserCheck/>:<RiUserAddLine/>} {isFollowing ?  'Following' : 'Follow user'}
      </button>

      <h1>Posted by:</h1>

      <Link
        href={`home/${recipeUser?.id}`}
        className=" link btn btn-sm btn-warning text-lg mr-2"
      >
        <Image
          src={recipeUser?.profilePic}
          className="mask mask-squircle  w-8 relative"
          alt={recipeUser?.username}
          width={50}
          height={50}
        />
        {recipeUser?.username}
      </Link>
    </div>
  );
};

export default FollowBtn;
