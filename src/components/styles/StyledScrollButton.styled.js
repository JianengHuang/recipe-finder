import styled from 'styled-components';

const StyledScrollButton = styled.div`
  button {
    position: fixed;
    bottom: 20px;
    right: 30px;
    z-index: 99;
    cursor: pointer;
    font-size: 20px;
    background-color: inherit;
    border: solid black;
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 10px;
    transform: rotate(-135deg);
    -webkit-transform: rotate(-135deg);
  }

  button:hover {
    bottom: 25px;
  }
`;

export default StyledScrollButton;
