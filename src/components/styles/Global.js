import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        box-sizing: border-box;
    }

    body {
        font-family: sans-serif;
    }

    i {
        font-family: cursive;
    }
`;

export default GlobalStyles;
