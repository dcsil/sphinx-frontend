import React from 'react';
import { CSSReset, ThemeProvider } from '@chakra-ui/core';
import customTheme from './utils/theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRoutes from './routes';

const App = () => {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
