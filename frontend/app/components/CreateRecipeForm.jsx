"use client"
import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '../lib/data-service';
import { useToast } from '../hooks/useToast';

const CreateRecipeForm = () => {
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();
    const queryClient = useQueryClient();
    const {showToast} = useToast()
  
    const mutation = useMutation({
      mutationFn: createRecipe,
      onSuccess: () => {
        queryClient.invalidateQueries(['profile']);
        showToast("New recipe successfully created" , "success");
        reset();
      },
    });
  
    const onSubmit = (data) => {
      // Convert ingredients and instructions to arrays
      const formattedData = {
        ...data,
        ingredients: data.ingredients.split('\n').filter(item => item.trim() !== ''),
        instructions: data.instructions.split('\n').filter(item => item.trim() !== ''),
        cookingTime: parseInt(data.cookingTime),
        servings: parseInt(data.servings),
        dietaryPreference: Array.isArray(data.dietaryPreference) ? data.dietaryPreference : [data.dietaryPreference],
      };
    //   console.log("Formatted data", formattedData);
      mutation.mutate(formattedData);
      
    };

  return (
    <form onSubmit={handleSubmit(onSubmit)}  className='w-full flex flex-col justify-center items-center h-fit py-4  '>
        <div className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="title">Title:</label>
        <input
        className=' h-fit w-full  border-secondary  p-2 border-2 rounded-lg outline-none bg-transparent'
          id="title"
          {...register('title', { required: 'Title is required' })}
        />
        {errors.title && showToast(`Error ${errors.title.message}` , "error")}
        </div>
     

      <div className=' w-full  my-2 flex items-center justify-start rounded-md ' >
        <label className="text-lg font-semibold text-accent mr-2"htmlFor="description">Description </label>
        <textarea
         className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent'
          id="description"
          {...register('description', { required: 'Description is required' })}
        />
        {errors.description && showToast(`Error ${errors.description.message}` , "error")}
       
      </div>

      <div   className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="ingredients">Ingredients</label>
        <textarea
       className=' h-fit w-full border-secondary mx-auto p-2 border-2 rounded-lg outline-none bg-transparent'
          id="ingredients"
          {...register('ingredients')}
        />
        
      </div>

      <div className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="instructions">Instructions  </label>
        <textarea
         className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent'
          id="instructions"
          {...register('instructions')}
        />
       
      </div>

      <div  className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="cookingTime">Cooking Time (minutes)  </label>
        <input
          type="number"
          className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent'
          id="cookingTime"
          {...register('cookingTime', { min: 1 })}
        />
      
      </div>

      <div  className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2"  htmlFor="servings">Servings </label>
        <input
          className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent'
          type="number"
          id="servings"
          {...register('servings', { min: 1 })}
        />
       
      </div>

      <div  className=' w-full  my-2 flex items-center justify-start rounded-md ' >
        <label className="text-lg font-semibold text-accent mr-2"  htmlFor="dietaryPreference">Dietary Preference</label>
        <Controller
          name="dietaryPreference"
          control={control}
           
          defaultValue={[]}
          render={({ field }) => (
            <select {...field} multiple className=' select h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent'>
              <option value="VEGAN">Vegan</option>
              <option value="VEGETARIAN">Vegetarian</option>
              <option value="GLUTEN_FREE">Gluten Free</option>
              
            </select>
          )}
        />
        
      </div>

      <div  className=' w-full  my-2 flex items-center justify-start rounded-md ' >
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="difficultyLevel">Difficulty Level </label>
        <select className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent' {...register('difficultyLevel')}>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
    
      </div>

      <div  className=' w-full  my-2 flex items-center justify-start rounded-md '>
        <label className="text-lg font-semibold text-accent mr-2" htmlFor="pictures">Pictures URL </label>
        <input
        className=' h-fit w-full border-2 rounded-lg  border-secondary mx-auto p-2  outline-none bg-transparent' 
          id="pictures"
          {...register('pictures')}
        />

      </div>

      <button className='btn btn-primary btn-sm' type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? 'Creating...' : 'Create Recipe'}
      </button>

      {mutation.isError && showToast(`An error occurred: ${mutation.error.message}`, "error")}
    </form>
  );
};

export default CreateRecipeForm;