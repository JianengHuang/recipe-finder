import React from 'react';
import Axios from 'axios';

const App = () => {
  const APP_ID = '49156fea';
  const APP_KEY = '7fe4ea9c9aff0f5bfc72517b66bcac8d';
  const ingredients = 'chicken%2C%20pineapple';
  const deviation = '2-3';
  const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${ingredients}&app_id=${APP_ID}&app_key=${APP_KEY}&ingr=${deviation}`;

  const getData = async () => {
    const result = await Axios.get(url);
    console.log(result);
  };

  return <div>Hello</div>;
};

export default App;
