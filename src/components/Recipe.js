import React, { useState } from 'react';
import RecipeDetails from './RecipeDetails';
import { StyledRecipeItem } from './styles/Recipe.styled';
import { StyledButton } from './styles/Button.styled';

const Recipe = (props) => {
  const [show, setShow] = useState(props.defaultShow);
  const {
    label,
    image,
    url,
    ingredients,
    calories,
    // cautions,
    cuisineType,
    totalTime,
    shareAs,
  } = props.recipe.recipe;

  return (
    <>
      <StyledRecipeItem>
        <h2>{label}</h2>
        <img src={image} alt={label} />
        <p>Cuisine Type: {cuisineType}</p>
        <p className='calories'>{Math.floor(calories)} kcal</p>
        <p>
          {totalTime !== 0 && 'Prepration Time: '}
          {totalTime || 'no preparation time registered'}
          {totalTime !== 0 && ' minutes'}
        </p>
        {/* {'Cautions:' && cautions} */}
        <StyledButton onClick={() => setShow(!show)}>Ingredients</StyledButton>
        <a href={url} target='_blank' rel='noopener noreferrer'>
          <StyledButton>Make It!</StyledButton>
        </a>
        <a href={shareAs} target='_blank' rel='noopener noreferrer'>
          <StyledButton>Nutrients</StyledButton>
        </a>
        {show && <RecipeDetails ingredients={ingredients} />}
      </StyledRecipeItem>
    </>
  );
};

export default Recipe;
