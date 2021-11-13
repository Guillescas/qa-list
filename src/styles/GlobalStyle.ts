import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    ::-webkit-scrollbar {
      width: 0.4rem;
      height: 0.2rem;
      margin-right: 10px;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      cursor: move;
    }
  }

  @font-face {
    font-family: 'Ubuntu';
    src: url('../fonts/Ubuntu/Ubuntu-Light.ttf') format('ttf');
    font-style: normal;
    font-weight: 300;
    font-display: fallback; /* <- this can be added to each @font-face definition */
  }

  body {
    background: ${({ theme }) => theme.colors.background};
    font-family: 'Ubuntu', sans-serif;
    color: ${({ theme }) => theme.colors.text};

    transition: background 0.2s;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.colors.text};
  }

  button {
    cursor: pointer;
  }
`;
