import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';

class Routes extends React.Component {
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
          render={ (props) => (<Search
            { ...props }
          />) }
        />

        <Route
          exact
          path="/album/:id"
          render={ (props) => <Album { ...props } /> }
        />

        <Route
          exact
          path="/favorites"
          render={ (props) => <Favorites { ...props } /> }
        />

        <Route
          exact
          path="/profile"
          render={ (props) => <Profile { ...props } /> }
        />

        <Route
          exact
          path="/profile/edit"
          render={ (props) => <ProfileEdit { ...props } /> }
        />

        <Route
          exact
          path="*"
          render={ (props) => <NotFound { ...props } /> }
        />

      </Switch>
    );
  }
}

export default Routes;
