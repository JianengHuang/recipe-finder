import styled from 'styled-components';

export const StyledButton = styled.button`
  background-color: #c2fbd7;
  border-radius: 100px;
  box-shadow: rgba(44, 187, 99, 0.2) 0 -25px 18px -14px inset,
    rgba(44, 187, 99, 0.15) 0 1px 2px, rgba(44, 187, 99, 0.15) 0 2px 4px,
    rgba(44, 187, 99, 0.15) 0 4px 8px, rgba(44, 187, 99, 0.15) 0 8px 16px,
    rgba(44, 187, 99, 0.15) 0 16px 32px;
  color: green;
  cursor: pointer;
  display: inline-block;
  font-family: CerebriSans-Regular, -apple-system, system-ui, Roboto, sans-serif;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    box-shadow: rgba(44, 187, 99, 0.35) 0 -25px 18px -14px inset,
      rgba(44, 187, 99, 0.25) 0 1px 2px, rgba(44, 187, 99, 0.25) 0 2px 4px,
      rgba(44, 187, 99, 0.25) 0 4px 8px, rgba(44, 187, 99, 0.25) 0 8px 16px,
      rgba(44, 187, 99, 0.25) 0 16px 32px;
    transform: scale(1.05) rotate(-1deg);
  }

  &.search-button {
    font-size: 25px;
    background-color: #ff695e;
    color: white;
    box-shadow: rgba(255, 105, 94, 0.2) 0 -25px 18px -14px inset,
      rgba(255, 105, 94, 0.15) 0 1px 2px, rgba(255, 105, 94, 0.15) 0 2px 4px,
      rgba(255, 105, 94, 0.15) 0 4px 8px, rgba(255, 105, 94, 0.15) 0 8px 16px,
      rgba(255, 105, 94, 0.15) 0 16px 32px;

    &:hover {
      box-shadow: rgba(255, 105, 94, 0.35) 0 -25px 18px -14px inset,
        rgba(255, 105, 94, 0.25) 0 1px 2px, rgba(255, 105, 94, 0.25) 0 2px 4px,
        rgba(255, 105, 94, 0.25) 0 4px 8px, rgba(255, 105, 94, 0.25) 0 8px 16px,
        rgba(255, 105, 94, 0.25) 0 16px 32px;
      transform: scale(1.05) rotate(-1deg);
    }
  }

  &.open-filter {
    background-color: lightyellow;
  }

  &.delete-button {
    border-radius: 50%;
    padding: 15px 22px;
    background-color: #ff696e;
    color: black;
    font-weight: 800;
  }

  &.refresh-button {
    margin: 10px;
  }
`;

export const StyledInput = styled.input`
  font-family: 'Poppins', sans-serif;
  width: 60%;
  border: 0;
  border-bottom: 2px solid gray;
  outline: 0;
  font-size: 1.3rem;
  color: green;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;

  &:focus {
    top: 0;
    transition: 0.2s;
    font-size: 1.05rem;
    font-weight: 550;
  }

  &::placeholder {
    opacity: 0.6;
  }

  &:hover::placeholder {
    opacity: 0.3;
  }

  @media (min-width: 768px) {
    width: 30%;
  }
`;
