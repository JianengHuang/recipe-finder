import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Home.css';
import Recipe from './components/Recipe';
import Alert from './components/Alert';
import Config from './Config'

const Home = () => {
  const [inputField, setInputField] = useState([{ ingredient: '' }]);
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('Enter the ingredients you want to use: ');

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleSearch = (event) => {
    if (inputField.length > 0 && inputField[0].ingredient !== '') {
      let ingredients = '';
      for (let i = 0; i < inputField.length; i++) {
        if (inputField[i].ingredient) {
          ingredients += inputField[i].ingredient + '%2C%20';
        }
      }
      ingredients = ingredients.substring(0, ingredients.length - 6);
      getData(ingredients);
    }
    event.preventDefault();
  };

  const addElementIfNeeded = (index) => {
    if (index === inputField.length - 1) {
      setInputField([...inputField, { ingredient: '' }]);
    }
  };

  const removeElement = (event, index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
    event.preventDefault();
  };

  const getData = async (ingredients) => {
    const API_ID = Config.API_ID;
    const API_KEY = Config.API_KEY;
    const deviation = '2-3';
    const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${API_ID}&app_key=${API_KEY}&ingr=${deviation}`;
    const result = await Axios.get(url).catch(function (error) {
      console.log(error);
    });
    if (result.data.hits.length === 0) {
      setAlert(`No recipes found`);
    } else {
      setAlert('Recipes found');
    }
    setRecipes(result.data.hits);
    console.log(result);
  };

  return (
    <>
      <div className='container'>
        <form>
          {alert || <Alert />}
          {inputField.map((inputField, index) => {
            return (
              <div key={index} className='input'>
                <input
                  type='text'
                  name='ingredient'
                  placeholder='Add Ingredient'
                  autoComplete='off'
                  value={inputField.ingredient}
                  onChange={(event) => handleChangeInput(index, event)}
                  onFocus={() => addElementIfNeeded(index)}
                />
                <button
                  className='delete-btn'
                  onClick={(event) => removeElement(event, index)}
                >
                  x
                </button>
              </div>
            );
          })}
          <button className='submit-btn' onClick={handleSearch}>
            Search
          </button>
        </form>
      </div>
      <div className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </>
  );
};

export default Home;
