import React, { useState } from 'react';
import Axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Recipe from './components/Recipe';
import DietData from './components/DietData';
import Header from './components/Header';
import Container from './components/styles/Container.styled';
import {
  StyledButton,
  StyledInput,
} from './components/styles/Button.styled.js';
import GlobalStyles from './components/styles/Global';
import StyledModal from './components/styles/Modal.styled';
import {
  StyledFilter,
  StyledCheckbox,
  StyledLabel,
} from './components/styles/Checkbox.styled';
import { StyledRecipe } from './components/styles/Recipe.styled';
import ScrollToTop from './components/ScrollToTop';

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
  const [show, setShow] = useState(false);

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
      <GlobalStyles />
      <Header />
      <>
        <Container>
          <form>
            <h2>Enter the ingredients you want to use:</h2>
            <StyledModal className='modal'>{alert}</StyledModal>
            {inputField.map((inputField, index) => {
              return (
                <div key={index} className='input'>
                  <StyledInput
                    type='text'
                    name='ingredient'
                    placeholder='Add Ingredient'
                    autoComplete='off'
                    value={inputField.ingredient}
                    onChange={(event) => handleChangeInput(index, event)}
                    onFocus={() => addElementIfNeeded(index)}
                  />
                  <StyledButton
                    className='delete-button'
                    onClick={(event) => removeElement(event, index)}
                  >
                    x
                  </StyledButton>
                </div>
              );
            })}
            <div className='main-buttons'>
              {/* <StyledButton onClick={(event) => addElement(event)}>
                Add Ingredient
              </StyledButton> */}
              <StyledButton onClick={(event) => removeAllElements(event)}>
                Clear all Ingredients
              </StyledButton>
            </div>
          </form>
        </Container>
        <Container className='Advanced-Filter'>
          <h2>Advanced Filter (Optional)</h2>
          <StyledButton className='open-filter' onClick={() => setShow(!show)}>
            ▼
          </StyledButton>
          <hr />
          {show && (
            <Container>
              <form className='time-form'>
                <h3 className='filter-tag'>
                  Maximum Preparation Time (minutes)
                </h3>
                <StyledInput
                  type='number'
                  placeholder='example: 30'
                  value={maxPrepTime}
                  onInput={(event) => setMaxPrepTime(event.target.value)}
                />
              </form>
              <form className='calories-form'>
                <h3 className='filter-tag'>
                  Calories Range per Serving (Min-Max)
                </h3>
                <StyledInput
                  type='text'
                  placeholder='100-300'
                  value={caloriesRange}
                  onInput={(event) => setCaloriesRange(event.target.value)}
                />
              </form>
              <form className='deviation'>
                <h3 className='filter-tag'>Number of ingredients (Min-Max)</h3>
                <StyledInput
                  type='text'
                  placeholder='2-5'
                  value={deviationRange}
                  onInput={(event) => setDeviationRange(event.target.value)}
                />
              </form>
              <form className='meal-type'>
                <h3 className='filter-tag'>Meal Type</h3>
                <StyledFilter>
                  {Object.keys(mealType).map((item, index) => (
                    <StyledLabel key={index}>
                      <StyledCheckbox
                        type='checkbox'
                        name={item}
                        onChange={() => handleChangeMealType(item)}
                      />
                      {item}
                    </StyledLabel>
                  ))}
                </StyledFilter>
              </form>
              <form className='diet-form'>
                <h3 className='filter-tag'>Diet</h3>
                <StyledFilter>
                  {DietData.map((dietInfo, index) => {
                    const { name, camelCaseName } = dietInfo;
                    return (
                      <StyledLabel key={index}>
                        <StyledCheckbox
                          type='checkbox'
                          name={name}
                          onChange={() => handleChangeDiet(camelCaseName)}
                        ></StyledCheckbox>
                        {dietInfo.name}
                      </StyledLabel>
                    );
                  })}
                </StyledFilter>
              </form>
              <StyledButton onClick={handleSubmit}>Apply Changes</StyledButton>
            </Container>
          )}
        </Container>
      </>
      <StyledButton className='search-button' onClick={handleSearch}>
        Search
      </StyledButton>
      <hr />
      <label>
        <input type='checkbox' onClick={() => setDefaultShow(!defaultShow)} />
        Default Show Ingredients
      </label>
      <StyledButton
        className='refresh-button'
        onClick={() => {
          handleSearch();
        }}
      >
        Refresh Recipes
      </StyledButton>
      <StyledRecipe className='recipes'>
        {recipes !== [] &&
          recipes.map((recipe) => (
            <Recipe key={uuidv4()} recipe={recipe} defaultShow={defaultShow} />
          ))}
      </StyledRecipe>
      <ScrollToTop />
    </>
  );
};

export default App;
