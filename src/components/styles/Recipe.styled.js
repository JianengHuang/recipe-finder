import styled from 'styled-components';

export const StyledRecipe = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-content: space-between;
  justify-content: center;
  text-transform: capitalize;
  margin: 20px;
`;

export const StyledRecipeItem = styled.div`
  width: 400px;
  border: 10px;
  background-color: rgba(30, 160, 50, 0.5);
  text-align: center;
  margin: 10px;
  border-radius: 0.5rem;
  padding: 0.3rem;
  h2 {
    background-color: rgba(30, 160, 50, 0.5);
    margin: 0;
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    font-size: 2.4rem;
    font-weight: 500;
    text-shadow: 0 0.5rem 0.5rem #555;
    color: #fff;
  }
  img {
    border-radius: 0.5rem;
    object-fit: cover;
  }
  ul {
    column-count: 2;
    list-style: none;
    text-align: center;
    padding: 5px;
    padding-left: 40px;
    border: 3px dashed #1c87c9;
  }
  li {
    margin: 0.5rem 0;
  }
  .calories {
    text-transform: none;
  }
  .ingredient-text {
    justify: center;
    width: 250px;
  }
  .ingredient-weight {
    position: relative;
    left: 80px;
    border: 10px;
    float: left;
    padding: 2px 5px;
    border: 1px solid black;
  }
`;
