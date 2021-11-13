import { ReactElement } from 'react';
import { AppProps } from 'next/app'

import { ThemeProvider } from "styled-components";
import theme from "../global/styles/theme";

import Header from '../components/Header';

import GlobalStyle from "../styles/GlobalStyle";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Header />

      <GlobalStyle />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
