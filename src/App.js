import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      button: true,
    };
  }

  userValidation = ({ target }) => {
    const inputName = target.name;
    const inputNameValue = target.value;
    const nameLength = 3;
    this.setState({
      [inputName]: inputNameValue,
    }, () => {
      if (inputNameValue.length >= nameLength) {
        this.setState({
          button: false,
        });
      } else {
        this.setState({
          button: true,
        });
      }
    });
  };

  render() {
    const { userName, button } = this.state;
    return (
      <div>

        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              userName={ userName }
              value={ userName }
              onChange={ this.userValidation }
              btnDisabled={ button }
            />) }
          />

          <Route
            exact
            path="/search"
            render={ (props) => <Search { ...props } /> }
          />

        </Switch>

      </div>
    );
  }
}

export default App;
