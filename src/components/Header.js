import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';
import './Header.css';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    const userName = await getUser();
    this.setState({
      userName: userName.name,
      loading: false,
    });
  }

  render() {
    const { userName, loading } = this.state;

    if (loading) {
      return <Loading />;
    }
    return (
      <header className="header" data-testid="header-component">
        <section data-testid="header-user-name">{userName}</section>
        <ul>
          <li><Link to="/search" data-testid="link-to-search">Pesquisa</Link></li>
          <li><Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link></li>
          <li><Link to="/profile" data-testid="link-to-profile">Perfil</Link></li>
        </ul>
      </header>
    );
  }
}

export default Header;
