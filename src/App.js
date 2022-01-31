import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
// import DietData from './components/DietData';

const App = () => {
  const [inputField, setInputField] = useState([{ ingredient: '' }]);
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('Enter the ingredients you want to use: ');
  const [defaultShow, setDefaultShow] = useState(false);
  const [diet, setDiet] = useState({
    balanced: false,
    highFiber: false,
    highProtein: false,
    lowCarb: false,
    lowFat: false,
    lowSodium: false,
  });
  let dietString = '';
  const { balanced, highFiber, highProtein, lowCarb, lowFat, lowSodium } = diet;

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  // const handleChangeDiet = (camelCaseName) => {
  //   setDiet({ ...diet, camelCaseName: !camelCaseName });
  // };

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

  const handleSubmit = () => {
    dietString = '';
    for (let x in diet) {
      if (eval(x)) {
        switch (x) {
          case 'highFiber':
            x = 'high-fiber';
            break;
          case 'highProtein':
            x = 'high-protein';
            break;
          case 'lowCarb':
            x = 'low-carb';
            break;
          case 'lowFat':
            x = 'low-fat';
            break;
          case 'lowSodium':
            x = 'low-sodium';
            break;
        }
        dietString += `&diet=${x}`;
      }
    }
    console.log(dietString);
  };

  const getData = async (ingredients) => {
    const API_ID = process.env.REACT_APP_API_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const deviation = '2-3';
    const url = `https://api.edamam.com/api/recipes/v2?q=${ingredients}&ingr=${deviation}&app_key=${API_KEY}${dietString}&type=public&app_id=${API_ID}&beta=true`;
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
          <h2>{alert}</h2>
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
      <div className='Advanced-Filter'>
        <h2>Advanced Filter (Optional)</h2>
        <form className='diet-form'>
          <h3 className='filter-tag'>Diet</h3>
          {/* {DietData.map((dietInfo) => {
            const { name, camelCaseName, boolean } = dietInfo;
            return (
              <label>
                <input
                  type='checkbox'
                  name={name}
                  onChange={() =>
                    handleChangeDiet(camelCaseName)
                  }
                ></input>
                {dietInfo.name}
              </label>
            );
          })} */}
          <label>
            <input
              type='checkbox'
              name='balanced'
              onChange={() => setDiet({ ...diet, balanced: !balanced })}
            ></input>
            Balanced
          </label>
          <label>
            <input
              type='checkbox'
              name='high-fiber'
              onChange={() => setDiet({ ...diet, highFiber: !highFiber })}
            ></input>
            High-Fiber
          </label>
          <label>
            <input
              type='checkbox'
              name='high-protein'
              onChange={() => setDiet({ ...diet, highProtein: !highProtein })}
            ></input>
            High-Protein
          </label>
          <label>
            <input
              type='checkbox'
              name='low-carb'
              onChange={() => setDiet({ ...diet, lowCarb: !lowCarb })}
            ></input>
            Low-Carb
          </label>
          <label>
            <input
              type='checkbox'
              name='low-fat'
              onChange={() => setDiet({ ...diet, lowFat: !lowFat })}
            ></input>
            Low-Fat
          </label>
          <label>
            <input
              type='checkbox'
              name='low-sodium'
              onChange={() => setDiet({ ...diet, lowSodium: !lowSodium })}
            ></input>
            Low-Sodium
          </label>
        </form>
        <button onClick={handleSubmit}>Apply Changes</button>
      </div>
      <label>
        <input type='checkbox' onClick={() => setDefaultShow(!defaultShow)} />
        Default Show Ingredients
      </label>
      <div className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => (
            <Recipe key={uuidv4()} recipe={recipe} defaultShow={defaultShow} />
          ))}
      </div>
    </>
  );
};

export default App;
