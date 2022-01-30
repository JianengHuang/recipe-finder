import React from 'react';
import { v4 as uuidv4 } from 'uuid';

const RecipeDetails = ({ ingredients }) => {
  return ingredients.map((ingredient) => {
    return (<ul key={uuidv4()}>
        <li className="ingredient-text">{ingredient.text}</li>
        <li className="ingredient-weight">{Math.round(ingredient.weight * 10)/10.0}g</li>
    </ul>
    )
  });
};

export default RecipeDetails;
