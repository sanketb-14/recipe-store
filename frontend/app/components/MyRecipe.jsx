"use client";
import { useState } from 'react';
import { LuChefHat } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import RenderRecipes from './RenderRecipes';

const MyRecipe = ({ recipes, favorites }) => {
  const [activeTab, setActiveTab] = useState('myRecipes');


  return (
    <div className=" w-full max-w-full h-screen ">
      <div className=" flex flex-row w-full justify-center ">
        <button
          className={`tab btn btn-xs sm:btn-md ${activeTab === 'myRecipes' ? 'active btn-primary' : ''}`}
          onClick={() => setActiveTab('myRecipes')}
        >
            <LuChefHat />
          My Recipes
        </button>
        <button
          className={`btn btn-xs sm:btn-md  ${activeTab === 'favorites' ? 'active btn-primary' : ''}`}
          onClick={() => setActiveTab('favorites')}
        >
            <FaHeart />
          Favorites
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2  bg-base-200 justify-center rounded-xl shadow-xl p-1 sm:p-4 mt-1 sm:mt-8 ">
        {activeTab === 'myRecipes' ? RenderRecipes(recipes) : RenderRecipes(favorites)}
      </div>
    </div>
  );
};

export default MyRecipe;