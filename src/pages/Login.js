import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import FormInput from '../components/FormInput';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';
import logo from '../images/logo.svg';

const PageLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  img {
    margin-top: 169px;
    margin-bottom: 104px;
  }

  @media (max-width: 599px) {
    margin-top: 50px;
    img {
      margin: 0;
      margin-bottom: 50px;
    }
  }

  @media (min-width: 1200px) {
    img {
      margin-top: 0;
    }
  }

  @media (min-width: 1800px) {
    background: grey;
  }
`;

const FormLogin = styled.form`
  background-color: var(--white);
  border-radius: 10px;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  height: 314px;
  padding: 94px;
  width: 697px;
  input {
    border: 1px solid #E1E5EB;
    outline: none;
    padding: 12px 16px;
    width: 100%;
  }
  button {
    background-color: var(--accent);
    border: none;
    border-radius: 2px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    color: var(--white);
    cursor: pointer;
    margin-top: 31px;
    padding: 8px 32px;
    width: 100%;
  }

  @media (max-width: 768px) {
    max-width: 90%;
    padding-left: 24px;
    padding-right: 24px;
  }
`;

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      setLoading: false,
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    this.setState({ setLoading: true });
    const { userName } = this.props;
    await createUser({ name: userName });
    this.setState({ setLoading: false });

    const { history } = this.props;
    history.push('/search');
  };

  render() {
    const { value, onChange, btnDisabled } = this.props;
    const { setLoading } = this.state;

    if (setLoading) {
      return <Loading />;
    }

    return (
      <PageLogin data-testid="page-login">
        <img src={ logo } alt="logo da Trybe" />
        <FormLogin onSubmit={ this.handleSubmit }>
          <FormInput
            htmlFor="name"
            placeHolder="Nome"
            type="text"
            name="userName"
            value={ value }
            onChange={ onChange }
            dataTestid="login-name-input"
          />

          <button
            type="submit"
            disabled={ btnDisabled }
            data-testid="login-submit-button"
          >
            Entrar
          </button>

        </FormLogin>
      </PageLogin>);
  }
}

Login.propTypes = {
  value: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
