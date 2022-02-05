import styled from 'styled-components';

export const StyledHeader = styled.header`
  background-color: lightgreen;
  padding: 30px 0;
  font-size: 3rem;

  p {
    font-size: 1rem;
  }

  @media (max-width: 1000px) {
    font-size: 1.5rem;
    img {
      width: 100%;
    }
  }
`;
