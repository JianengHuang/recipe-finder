import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Licorice&family=Poppins:wght@300;400;700&display=swap');

    * {
        box-sizing: border-box;
    }

    body {
        font-family: 'Poppins', sans-serif;
    }
`;

export default GlobalStyles;
