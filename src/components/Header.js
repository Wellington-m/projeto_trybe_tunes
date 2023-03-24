import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

const HeaderS = styled.header`
  width: 100%;
  height: 100px;
  background: ${(props) => props.corFundo && '#3F3D56'};
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
`;

const NavS = styled.nav`
  a {
    color: white;
    text-decoration: none;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    margin-right: 20px;
    margin-left: 20px;
  }
`;

const NameUserP = styled.p`
  margin-right: 3%;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
`;

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
      return <Loading component="header" />;
    }
    return (
      <HeaderS corFundo="#3F3D56" data-testid="header-component">
        <NavS>
          <Link to="/search" data-testid="link-to-search">Pesquisar</Link>
          |
          <Link to="/favorites" data-testid="link-to-favorites">Favoritas</Link>
          |
          <Link to="/profile" data-testid="link-to-profile">Perfil</Link>
        </NavS>
        <NameUserP data-testid="header-user-name">{userName}</NameUserP>
      </HeaderS>
    );
  }
}

export default Header;
