import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';
import './Recipe.css';

const Recipe = (props) => {
  const [show, setShow] = useState(props.defaultShow);
  const [prepTime, setPrepTime] = useState('');
  const {
    label,
    image,
    url,
    ingredients,
    calories,
    cautions,
    cuisineType,
    totalTime,
    shareAs,
  } = props.recipe.recipe;

  return (
    <>
      <div className='recipe'>
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <p>Cuisine Type: {cuisineType}</p>
        <p className='calories'>{Math.floor(calories)} kcal</p>
        <p>
          {totalTime != 0 && 'Prepration Time: '}
          {totalTime || 'no preparation time registered'}
          {totalTime != 0 && ' minutes'}
        </p>
        {'Cautions:' && cautions}
        <button onClick={() => setShow(!show)}>Ingredients</button>
        <a href={url} target='_blank' useref='noopener noreferrer'>
          <button>Make It!</button>
        </a>
        <a href={shareAs} target='_blank' useref='noopener noreferrer'>
          <button>Nutrients</button>
        </a>
        {show && <RecipeDetails ingredients={ingredients} />}
      </div>
    </>
  );
};

export default Recipe;
