import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import FormInput from '../components/FormInput';

class ProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      isLoadind: false,
      btnDisabled: true,
    };
  }

  async componentDidMount() {
    this.getUserInfo();
  }

  getUserInfo = async () => {
    this.setState({ isLoadind: true });
    const { name, email, description, image } = await getUser();
    this.setState({
      name,
      email,
      description,
      image,
      isLoadind: false,
    });
  }

  // https://www.horadecodar.com.br/2020/09/13/como-validar-email-com-javascript/
  validateEmail = ({ email }) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  checkFormInput = ({ name, description, image }) => {
    let isNotEmpty = false;
    if (name !== '' && description !== '' && image !== '') {
      isNotEmpty = true;
    }
    return isNotEmpty;
  }

  handleProfile = ({ target }) => {
    const nameOfInput = target.name;
    const valueOfInput = target.value;

    this.setState({
      [nameOfInput]: valueOfInput,
    }, () => {
      if (this.checkFormInput(this.state) && this.validateEmail(this.state)) {
        this.setState({ btnDisabled: false });
      } else {
        this.setState({ btnDisabled: true });
      }
    });
  }

  saveInfos = async (element) => {
    element.preventDefault();
    this.setState({ isLoadind: true });
    const { name, email, description, image } = this.state;
    const userInfos = {
      name,
      email,
      image,
      description,
    };
    await updateUser(userInfos);
    const { history } = this.props;
    history.push('/profile');
    this.setState({ isLoadind: false });
  }

  render() {
    const { name, email, description, image, isLoadind, btnDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        { isLoadind ? <Loading /> : (
          <form onSubmit={ this.saveInfos }>
            <FormInput
              htmlFor="name"
              placeHolder="Nome"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleProfile }
              dataTestid="edit-input-name"
            />

            <FormInput
              htmlFor="email"
              placeHolder="E-mail"
              type="text"
              name="email"
              value={ email }
              onChange={ this.handleProfile }
              dataTestid="edit-input-email"
            />

            <FormInput
              htmlFor="description"
              placeHolder="descrição"
              type="text"
              name="description"
              value={ description }
              onChange={ this.handleProfile }
              dataTestid="edit-input-description"
            />

            <FormInput
              htmlFor="image"
              placeHolder="Imagem de perfil"
              type="text"
              name="image"
              value={ image }
              onChange={ this.handleProfile }
              dataTestid="edit-input-image"
            />

            <button
              type="submit"
              disabled={ btnDisabled }
              data-testid="edit-button-save"
            >
              Salvar alterações
            </button>

          </form>
        ) }
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProfileEdit;
