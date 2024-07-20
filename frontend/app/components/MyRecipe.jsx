"use client";
import { useState } from "react";

import { LuChefHat } from "react-icons/lu";
import { FaHeart } from "react-icons/fa";
import RenderRecipes from "./RenderRecipes";
import { MdOutlineFastfood } from "react-icons/md";
import CreateRecipeForm from "./CreateRecipeForm";

const MyRecipe = (user) => {
  const [activeTab, setActiveTab] = useState("myRecipes");
  const { recipes, favorites } = user.data;
  

  return (
    <div className=" w-full max-w-full h-screen ">
      <div className=" flex flex-row w-full justify-center ">
        <button
          className={`tab btn btn-xs sm:btn-md ${
            activeTab === "myRecipes" ? "active btn-primary" : ""
          }`}
          onClick={() => setActiveTab("myRecipes")}
        >
          <LuChefHat />
          My Recipes
        </button>
        <button
          className={`btn btn-xs sm:btn-md  ${
            activeTab === "favorites" ? "active btn-primary" : ""
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <FaHeart />
          Favorites
        </button>
      </div>
      <div className="w-full flex justify-end items-center">
        <label
          htmlFor="my_modal_7"
          className="text-xs sm:text-sm btn-xs sm:btn-md btn btn-secondary sm:text-md flex items-center "
        >
          <span className="text-lg font-semibold text-secondary-content">
            <MdOutlineFastfood />
          </span>
          Create-Recipe
        </label>

        <input type="checkbox" id="my_modal_7" className="modal-toggle" />
        <div className="modal" role="dialog">
          <div className="modal-box">
            <CreateRecipeForm/>
          </div>
          <label className="modal-backdrop" htmlFor="my_modal_7">
            Close
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  bg-base-200 justify-center rounded-xl shadow-xl p-1 sm:p-4 mt-1 sm:mt-4 ">
        {activeTab === "myRecipes"
          ? RenderRecipes(recipes, user)
          : RenderRecipes(favorites, user)}
      </div>
    </div>
  );
};

export default MyRecipe;
