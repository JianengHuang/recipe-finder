import React, { useState } from 'react';
import Axios from 'axios';
import './Home.css';

const Home = () => {
  const [inputField, setInputField] = useState([{ ingredient: '' }]);

  const handleChangeInput = (index, event) => {
    const values = [...inputField];
    values[index][event.target.name] = event.target.value;
    setInputField(values);
  };

  const handleSearch = (event) => {
    if (inputField.length > 0 && inputField[0].ingredient == '') {
      for (let i = 0; i < inputField.length; i++) {
        if(inputField[i].ingredient){
          ingredients += inputField[i].ingredient + "%2C%20";
        }
      }
      ingredients = ingredients.substring(0, ingredients.length);
      console.log(ingredients);
    }
    event.preventDefault();
    // getData();
    // console.log(inputField);
  };

  const addElementIfNeeded = (index) => {
    if (index == inputField.length - 1) {
      setInputField([...inputField, { ingredient: '' }]);
    }
  };

  const removeElement = (event, index) => {
    const values = [...inputField];
    values.splice(index, 1);
    setInputField(values);
    event.preventDefault();
  };

  const APP_ID = '49156fea';
  const APP_KEY = '7fe4ea9c9aff0f5bfc72517b66bcac8d';
  const ingredients = 'chicken%2C%20pineapple';
  const deviation = '2-3';
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${deviation}`;

  const getData = async () => {
    const result = await Axios.get(url);
    console.log(result);
  };

  return (
    <div className='container'>
      <form>
        {inputField.map((inputField, index) => {
          return (
            <div key={index} className='input'>
              <input
                type='text'
                name='ingredient'
                placeholder='Add Ingredient'
                variant='filled'
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
  );
};

export default Home;
