import React from 'react'
import { fetchAllRecipe } from '../lib/data-service'
import RenderRecipes from './RenderRecipes'

const RecipeList = async() => {

    const recipeList = await fetchAllRecipe()
    // results: 10,
    // totalRecipes: 22,
    // currentPage: 1,
    // totalPages: 3,
    // data:
    const {totalRecipes, data} = recipeList
    const {recipes} = data
    console.log("data: " ,recipes);
  return (
    <div  className="grid grid-cols-1 sm:grid-cols-2  bg-base-200 justify-center rounded-xl shadow-xl p-1 sm:p-4 mt-1 sm:mt-8 ">
        <RenderRecipes recipes={recipes}/>
      
    </div>
  )
}

export default RecipeList
