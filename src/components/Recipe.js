import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';

const Recipe = (props) => {
  const [show, setShow] = useState(props.defaultShow);
  const { label, image, url, ingredients } = props.recipe.recipe;
  return (
    <>
      <div className='recipe'>
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <a href={url} target='_blank' useref='noopener noreferrer'>
          <button>Make It!</button>
        </a>
        <button onClick={() => setShow(!show)}>Ingredients</button>
        {show && <RecipeDetails ingredients={ingredients} />}
      </div>
    </>
  );
};

export default Recipe;
