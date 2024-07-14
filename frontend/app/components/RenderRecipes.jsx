import React from 'react'
import Recipe from './Recipe';

const RenderRecipes = (items) => {
  
    items =  items?.recipes || items 
    
    return items.map((item) => (
        <ul key={item.id} className="flex justify-center">
            <Recipe recipe={item}/>
          
        </ul>
      ));
  
}

export default RenderRecipes
