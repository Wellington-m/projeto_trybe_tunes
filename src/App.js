import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Routes from './components/Routes';

const GlobalStyle = createGlobalStyle`
html {
    box-sizing: border-box;
    font-size: 16px;
  }
  
  *, *:before, *:after {
    box-sizing: inherit;
  }
  
  body, h1, h2, h3, h4, h5, h6, p, ol, ul {
    margin: 0;
    padding: 0;
    font-weight: normal;
  }
  
  ol, ul {
    list-style: none;
  }
  
  img {
    max-width: 100%;
    height: auto;
  }

  :root {
    --main-color: #FAFAFA;
    --secondary-color: #121725;
    --accent: #003BE5;
    --dark-green: #023031;
    --light-green: #036B52;
    --white: white;
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
