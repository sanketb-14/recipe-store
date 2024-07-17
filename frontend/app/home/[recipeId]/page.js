import { fetchAllRecipe, getMyProfile, getSingleRecipe, getUserDetails, } from "@/app/lib/data-service";
import React from "react";
import Image from "next/image";

import { FaPeopleGroup, FaHeart } from "react-icons/fa6";
import { ImStatsBars2 } from "react-icons/im";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaClock ,FaLocationArrow, FaRegHeart } from "react-icons/fa";
import FollowBtn from "@/app/components/FollowBtn";
import { auth } from "@/app/lib/auth";

import AddToFavorites from "@/app/components/AddToFavorites";
import Review from "@/app/components/Review";
import AllReviews from "@/app/components/AllReviews";



export async function generateMetadata({ params }) {
  const data = await getSingleRecipe(params.recipeId);

  return { title: `Recipe ${data.recipe.title}` };
}

export async function generateStaticParams() {
  const { data } = await fetchAllRecipe();
 

  const ids = data.recipes.map((cabin) => ({ roomID: String(cabin.id) }));
  return ids;
}

const page = async ({ params }) => {
  const data = await getSingleRecipe(params.recipeId);
  const session = await auth()
  
  const myProfile = session &&  await getMyProfile(session)
   const {id:userId} = myProfile?.user || "user"
  
  
  
  const { recipe } = data;
  const {
    id,
    title,
    description,
    ingredients,
    instructions,
    cookingTime,
    servings,
    dietaryPreference,
    difficultyLevel,
    pictures,
    user,
    favorites,
    reviews,
  } = recipe;

  

  return (
    <div className="max-w-6xl bg-base-200 card p-2 shadow-xl w-full">
      <div className="grid grid-cols-2 gap- card-body w-full mb-8 ">
        <div className="relative scale-[0.8] -translate-x-4 ">
          <Image
            src={pictures}
            fill
            className="object-cover rounded-xl shadow-xl "
            alt={`Recipe ${title}`}
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-accent font-black text-4xl my-12">
            Recipe {title}
          </h3>

          <p className="text-lg text-primary h-auto">{description}</p>

          <ul className="flex flex-col justify-center items-start">
            <li className="flex  items-center">
            <FaClock className="h-5 w-5 text-secondary mr-2" />
                 Cooking Time{" "}
                <span className="font-bold text-accent mx-2">{cookingTime}</span> Minutes
              
            </li>
            <li className="flex  items-center">
            <ImStatsBars2 className="h-5 w-5 text-secondary mr-2" />
                 difficultyLevel
                <span className="font-bold text-accent mx-2">{difficultyLevel}</span> 
              
            </li>

            <li className="flex gap-3 items-center">
            
            <FaPeopleGroup className="h-5 w-5 text-secondary" /> For upto the people{" "}  <span className="font-bold text-accent">{servings}</span>
                Servings{" "}
              
              
            </li>
          </ul>
          <p className=" text-lg text-center text-primary my-2">  Dietary Preference:</p>

          <ul className="grid grid-cols-3  gap-1 items-center text-lg">
            
            {dietaryPreference.map(item => (<li key={item} className="p-1 mx-2 m-2 justify-start  bg-accent/50 text-accent-content lowercase text-sm text-nowrap flex  items-center"><span className="mx-2 text-secondary"><FaHeart/></span>{item}</li>))}
            
          </ul>
          <p className="font-semibold text-lg text-center text-primary my-4">  Ingredients:</p>
          <ul className="grid grid-cols-3  gap-1 items-center text-lg">
            
            {ingredients.map(item => (<li key={item} className="p-1 mx-2 m-2 justify-start  border-r-2 border-secondary text-sm text-nowrap flex  items-center"><span className="mx-2 text-secondary"><MdLocalGroceryStore/></span>{item}</li>))}
            
          </ul>
          <p className="font-semibold text-lg text-center text-primary my-4">  Instructions :</p>

          <ul className="grid grid-cols-1  gap-1 items-center text-lg">
          
            {instructions.map(item => (<li key={item} className="p-1 mx-2  justify-start rounded-xl bg-base-200 text-secondary text-sm text-nowrap flex items-center"><span className="mx-2 text-accent"><FaLocationArrow/></span>{item}</li>))}
            
          </ul>
        </div>
      </div>
      <div className="flex justify-start">
        {session && <AddToFavorites userId={userId} favorites={favorites}/>}
        {session && <FollowBtn recipeUser={user} followings={myProfile}/>}

      </div>
      {session && <Review  myProfile={myProfile} recipeId={id}/>}
      <AllReviews recipeId={id}/>

    </div>
  );
};

export default page;
