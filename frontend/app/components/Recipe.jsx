import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import FollowBtn from "./FollowBtn";
const Recipe = ({ recipe }) => {
    
   
  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl mt-2 sm:mt-8 mx-2">
       <figure className="relative h-80 aspect-square" >
          <Image src={recipe.pictures} fill className="object-cover rounded-lg shadow-lg "alt={`Recipe ${recipe.title}`} />
        </figure>
      <div className="card-body">
        <h2 className="card-title">{recipe.title}</h2>
        <p>{recipe.description}</p>
        <Link href={`/home/${recipe.id}`} >
        <div className="card-actions justify-start">
          <button className="btn btn-primary btn-sm sm:btn-md"><MdOutlineRestaurantMenu />View Details..</button>
        </div>
        </Link>
      </div>
      <FollowBtn/>

    </div>
  );
};

export default Recipe;
