import React from 'react';
import PropTypes from 'prop-types';
import FormInput from '../components/FormInput';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

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
      <div data-testid="page-login">
        <form onSubmit={ this.handleSubmit }>
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

        </form>
      </div>);
  }
}

Login.propTypes = {
  value: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  btnDisabled: PropTypes.bool.isRequired,
};

export default Login;
