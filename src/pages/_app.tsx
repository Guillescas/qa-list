import { ReactElement } from 'react';
import { AppProps } from 'next/app'

import { ThemeProvider } from "styled-components";
import theme from "../global/styles/theme";

import GlobalStyle from "../styles/GlobalStyle";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
