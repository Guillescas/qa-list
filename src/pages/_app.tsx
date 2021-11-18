import { ReactElement } from 'react';
import { AppProps } from 'next/app'
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';

import { ThemeProvider } from "styled-components";
import theme from "../global/styles/theme";

import Header from '../components/Header';

import GlobalStyle from "../styles/GlobalStyle";

import 'react-toastify/dist/ReactToastify.css';

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Checklist</title>
      </Head>
      <Header />

      <GlobalStyle />
      <Component {...pageProps} />

      <ToastContainer />
    </ThemeProvider>
  );
};

export default MyApp;
