import React from 'react';
import { StyledHeader } from './styles/Header.styled';
import mainLogo from '../assets/logo.png'

const Header = () => {
  return (
    <>
      <StyledHeader>
        <img src={mainLogo} alt="Logo" />
      </StyledHeader>
    </>
  );
};

export default Header;
