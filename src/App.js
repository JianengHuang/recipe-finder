import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import DietData from './components/DietData';
import Header from './components/Header';
import Container from './components/styles/Container.styled';

const App = () => {
  const [inputField, setInputField] = useState([{ ingredient: '' }]);
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');
  const [defaultShow, setDefaultShow] = useState(false);
  const [maxPrepTime, setMaxPrepTime] = useState('');
  const [time, setTime] = useState('');
  const [caloriesRange, setCaloriesRange] = useState('');
  const [calories, setCalories] = useState('');
  const [diet, setDiet] = useState({
    balanced: false,
    highFiber: false,
    highProtein: false,
    lowCarb: false,
    lowFat: false,
    lowSodium: false,
  });
  const { balanced, highFiber, highProtein, lowCarb, lowFat, lowSodium } = diet;
  let dietString = '';
  const [mealType, setMealType] = useState({
    breakfast: false,
    lunch: false,
    teaTime: false,
    snack: false,
    dinner: false,
  });
  const { breakfast, lunch, teaTime, snack, dinner } = mealType;
  let mealTypeString = '';
  const [deviationRange, setDeviationRange] = useState('');
  const [deviation, setDeviation] = useState('');

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleChangeMealType = (item) => {
    switch (item) {
      case 'breakfast':
        setMealType({ ...mealType, breakfast: !breakfast });
        break;
      case 'lunch':
        setMealType({ ...mealType, lunch: !lunch });
        break;
      case 'teaTime':
        setMealType({ ...mealType, teaTime: !teaTime });
        break;
      case 'snack':
        setMealType({ ...mealType, snack: !snack });
        break;
      case 'dinner':
        setMealType({ ...mealType, dinner: !dinner });
        break;
    }
  };

  const handleChangeDiet = (camelCaseName) => {
    switch (camelCaseName) {
      case 'balanced':
        setDiet({ ...diet, balanced: !balanced });
        break;
      case 'highFiber':
        setDiet({ ...diet, highFiber: !highFiber });
        break;
      case 'highProtein':
        setDiet({ ...diet, highProtein: !highProtein });
        break;
      case 'lowCarb':
        setDiet({ ...diet, lowCarb: !lowCarb });
        break;
      case 'lowFat':
        setDiet({ ...diet, lowFat: !lowFat });
        break;
      case 'lowSodium':
        setDiet({ ...diet, lowSodium: !lowSodium });
        break;
    }
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
    } else {
      setAlert('Please enter at least one ingredient');
      setTimeout(function () {
        setAlert('');
      }, 6000);
    }
    event.preventDefault();
  };

  const addElement = (event) => {
    event.preventDefault();
    setInputField([...inputField, { ingredient: '' }]);
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

  const removeAllElements = (event) => {
    event.preventDefault();
    setInputField([{ ingredient: '' }]);
  };

  const handleSubmit = () => {
    if (maxPrepTime) {
      setTime(`&time=${maxPrepTime}`);
    } else {
      setTime('');
    }
    if (caloriesRange) {
      setCalories(`&calories=${caloriesRange}`);
      console.log('hello');
    } else {
      setCalories('');
    }
    if (deviationRange) {
      setDeviation(`&ingr=${deviationRange}`);
      console.log(deviation);
    } else {
      setDeviation('');
    }

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

    mealTypeString = '';
    for (let x in mealType) {
      if (eval(x)) {
        switch (x) {
          case 'breakfast':
            x = 'Breakfast';
            break;
          case 'lunch':
            x = 'Lunch';
            break;
          case 'teaTime':
            x = 'Teatime';
            break;
          case 'snack':
            x = 'Snack';
            break;
          case 'dinner':
            x = 'Dinner';
            break;
        }
        mealTypeString += `&mealType=${x}`;
      }
    }
  };

  const getData = async (ingredients) => {
    const API_ID = process.env.REACT_APP_API_ID;
    const API_KEY = process.env.REACT_APP_API_KEY;
    const url = `https://api.edamam.com/api/recipes/v2?q=${ingredients}${deviation}&app_key=${API_KEY}${dietString}&type=public${time}${calories}${mealTypeString}&random=true&app_id=${API_ID}&beta=true`;
    const result = await Axios.get(url).catch(function (error) {
      console.log(error);
    });
    if (result.data.hits.length === 0) {
      setAlert(`No recipes found`);
      setTimeout(function () {
        setAlert('');
      }, 6000);
    } else {
      setAlert('Recipes found');
      setTimeout(function () {
        setAlert('');
      }, 6000);
    }
    setRecipes(result.data.hits);
    console.log(result);
  };

  return (
    <>
      <Header />
      <Container>
        <div>
          <form>
            <h2>Enter the ingredients you want to use:</h2>
            <h3 className='modal'>{alert}</h3>
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
            <div className='search-button'>
              <button onClick={(event) => addElement(event)}>
                Add Ingredient
              </button>
              <button className='submit-btn' onClick={handleSearch}>
                Search
              </button>
              <button onClick={(event) => removeAllElements(event)}>
                Clear all Ingredients
              </button>
            </div>
          </form>
        </div>
        <div className='Advanced-Filter'>
          <h2>Advanced Filter (Optional)</h2>
          <hr />
          <form className='time-form'>
            <h3 className='filter-tag'>Maximum Preparation Time (minutes)</h3>
            <input
              type='number'
              placeholder='example: 30'
              value={maxPrepTime}
              onInput={(event) => setMaxPrepTime(event.target.value)}
            />
          </form>
          <form className='calories-form'>
            <h3 className='filter-tag'>Calories Range per Serving (Min-Max)</h3>
            <input
              type='text'
              placeholder='100-300'
              value={caloriesRange}
              onInput={(event) => setCaloriesRange(event.target.value)}
            />
          </form>
          <form className='meal-type'>
            <h3 className='filter-tag'>Meal Type</h3>
            {Object.keys(mealType).map((item, index) => (
              <label key={index}>
                <input
                  type='checkbox'
                  name={item}
                  onChange={() => handleChangeMealType(item)}
                />
                {item}
              </label>
            ))}
          </form>
          <form className='deviation'>
            <h3 className='filter-tag'>Number of ingredients (Min-Max)</h3>
            <label>
              <input
                type='text'
                placeholder='2-5'
                value={deviationRange}
                onInput={(event) => setDeviationRange(event.target.value)}
              />
            </label>
          </form>
          <form className='diet-form'>
            <h3 className='filter-tag'>Diet</h3>
            {DietData.map((dietInfo, index) => {
              const { name, camelCaseName } = dietInfo;
              return (
                <label key={index}>
                  <input
                    type='checkbox'
                    name={name}
                    onChange={() => handleChangeDiet(camelCaseName)}
                  ></input>
                  {dietInfo.name}
                </label>
              );
            })}
          </form>
          <button onClick={handleSubmit}>Apply Changes</button>
        </div>
      </Container>
      <hr />
      <div className='recipe-options'>
        <button
          onClick={() => {
            handleSearch();
          }}
        >
          Refresh Recipes
        </button>
        <label>
          <input type='checkbox' onClick={() => setDefaultShow(!defaultShow)} />
          Default Show Ingredients
        </label>
      </div>
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
