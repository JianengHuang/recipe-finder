import React from 'react';
import { StyledHeader } from './styles/Header.styled';

const Header = () => {
  return (
    <>
      <StyledHeader>
        <h1>Recipe Finder</h1>
        <p>
          <i>
            Enter your available ingredients to generate a recipe that fits all
            your criteria
          </i>
        </p>
      </StyledHeader>
    </>
  );
};

export default Header;
