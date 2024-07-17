import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import FollowBtn from "./FollowBtn";
import DeleteRecipe from "./DeleteRecipe";


const Recipe = ({ recipe ,user}) => {
   
   
   

  const difficulty = recipe.difficultyLevel;


  return (
    <div className="card card-compact bg-base-100 w-96 shadow-xl mt-2 sm:mt-8 mx-2">
      <figure className="relative h-80 aspect-square ">
        <Image
          src={recipe.pictures}
          fill
          className="object-cover rounded-lg shadow-lg "
          alt={`Recipe ${recipe.title}`}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title ">
          {recipe.title}
          {difficulty && (
            <span
              className={`indicator-item indicator-top indicator-end badge badge-primary text-white text-sm lowercase border-none ${
                difficulty === "MEDIUM" || difficulty === "HARD"
                  ? "bg-orange-500"
                  : ""
              }`}
            >
              {difficulty}
            </span>
          )}
          {recipe.cookingTime && (
            <p className="text-xs text-secondary flex flex-row mx-auto px-2">
              <IoMdTime /> {recipe.cookingTime}:Minutes
            </p>
          )}
        </h2>
        {recipe.avgRating >= 0 && (
          <p className="text-xs text-accent text-nowrap flex mx-2">
            <AiOutlineLike />
            Average Rating: {recipe?.avgRating.toFixed(1)}
          </p>
        )}

        {recipe.avgRating >= 0 && (
          <div className="rating rating-xs">
            <input
              type="radio"
              name="rating-5"
              className={`mask mask-star-2 ${
                recipe.avgRating.toFixed(1) >= 0 || 1
                  ? "bg-orange-400"
                  : "bg-gray-300"
              } `}
            />
            <input
              type="radio"
              name="rating-5"
              className={`mask mask-star-2 ${
                recipe.avgRating.toFixed(1) >= 1
                  ? "bg-orange-400"
                  : "bg-gray-300"
              } `}
              // defaultChecked
            />
            <input
              type="radio"
              name="rating-5"
              className={`mask mask-star-2 ${
                recipe.avgRating.toFixed(1) >= 2
                  ? "bg-orange-400"
                  : "bg-gray-300"
              } `}
            />
            <input
              type="radio"
              name="rating-5"
              className={`mask mask-star-2 ${
                recipe.avgRating.toFixed(1) >= 3
                  ? "bg-orange-400"
                  : "bg-gray-300"
              } `}
            />
            <input
              type="radio"
              name="rating-5"
              className={`mask  mask-star-2 ${
                recipe.avgRating.toFixed(1) >= 4
                  ? "bg-orange-400"
                  : "bg-gray-300"
              } `}
            />
          </div>
        )}
        {recipe.dietaryPreference &&
          recipe.dietaryPreference.map((item) => (
            <ul key={item} className="flex justify-start flex-row">
              <li className="badge text-xs badge-sm badge-info lowercase  ">
                {item}
              </li>
            </ul>
          ))}

        <p>{recipe?.description}</p>
       <div className="flex justify-between items-center ">
       <Link href={`/home/${recipe.id}`}>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm sm:btn-md">
              <MdOutlineRestaurantMenu />
              View Details..
            </button>
          </div>
        </Link>
        <DeleteRecipe user={user} recipeId={recipe.id}/>
       </div>
      </div>
   
    </div>
  );
};

export default Recipe;
