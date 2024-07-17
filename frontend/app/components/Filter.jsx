"use client"
import React, { useState } from 'react';


const Filter = ({ onFilterChange }) => {
    const [filters, setFilters] = useState({
        dietaryPreference: [],
        difficultyLevel: '',
        maxCookingTime: '',
        minRating: ''
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
          setFilters(prev => ({
            ...prev,
            [name]: checked
              ? Array.isArray(prev[name]) ? [...prev[name], value] : [value]
              : Array.isArray(prev[name]) ? prev[name].filter(item => item !== value) : []
          }));
        } else {
          setFilters(prev => ({ ...prev, [name]: value }));
        }
      };
    
      const applyFilters = () => {
        onFilterChange(filters);
      };



  return (

    <details className="collapse flex w-full">
  <summary className="collapse-title flex w-full justify-end">
    <span className='btn absolute right-20 w-80  btn-primary text-lg tracking-widest font-semibold'> Filter</span>
  </summary>
  <div className="collapse-content">

  <div className='bg-base-200 w-full rounded-xl shadow-xl flex justify-center items-center flex-col '>
     <h3 className='font-semibold text-2xl m-2 text-center w-full text-primary'>Filter Recipes</h3> 
     <div className="card grid grid-cols-2 card-compact card-body w-full bg-base-200  justify-center items-start">
      
      <div className=' border-l-2 border-accent bg-base-100  flex  max-auto   justify-center items-center w-full'>
        <label className='text-lg text-secondary  text-nowrap mx-2'>Dietary Preference:</label>
        <div className='flex w-full justify-end m-3 '>
          <input type="checkbox" name="dietaryPreference " value="VEGETARIAN" onChange={handleChange} className='mx-2 ' /> Vegetarian
          <input type="checkbox" name="dietaryPreference" value="VEGAN" onChange={handleChange} className='ml-4 mx-2'/> Vegan
          <input type="checkbox" name="dietaryPreference" value="GLUTEN_FREE" onChange={handleChange} className='ml-4 mx-2'/> Gluten-Free
        </div>
      </div>
      <div className='bg-base-100 mx-3 border-l-2 border-accent flex items-center w-full justify-center'>
        <label className='text-lg font-semibold m-2 text-secondary'>Difficulty Level:</label>
        <select name="difficultyLevel" onChange={handleChange} className='bg-base-200  m-2 p-2 w-1/2 mx-auto text-sm border-b-2 border-accent border-0'>
          <option value="">All</option>
          <option value="EASY">Easy</option>
          <option value="MEDIUM">Medium</option>
          <option value="HARD">Hard</option>
        </select>
      </div>
      <div className='bg-base-100 border-l-2 border-accent flex items-center w-full justify-start'>
        <label  className='text-lg font-semibold m-2 text-secondary'>Max Cooking Time (minutes):</label>
        <input type="number" name="maxCookingTime" className='bg-base-200  m-2 p-2 w-1/2 mx-auto text-sm border-b-2 border-accent border-0' onChange={handleChange} />
      </div >
      <div  className='bg-base-100 mx-3 border-l-2 border-accent flex items-center w-full justify-start'>
        <label className="text-lg font-semibold m-2 text-secondary">Min Rating:</label>
        <input type="number" className='bg-base-200  m-2 p-2 w-1/2 mx-auto text-sm border-b-2 border-accent border-0' name="minRating" min="1" max="5" step="0.1" onChange={handleChange} />
      </div>
      
    </div>
    <button className='btn btn-md text-lg btn-primary w-1/2' onClick={applyFilters}>Apply Filters</button>
   </div>
   
  </div>
</details>




   
  );
};

export default Filter;



