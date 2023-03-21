import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Routes from './components/Routes';

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0px;
    font-family: sans-serif;
    margin: 0px;
  }
`;

class App extends React.Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Routes />
      </>
    );
  }
}

export default App;
