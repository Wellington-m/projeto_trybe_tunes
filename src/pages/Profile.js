import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      image: '',
      description: '',
      email: '',
      isLoadind: false,
    };
  }

  async componentDidMount() {
    this.getUserInfo();
  }

  editProfile = () => {
    const { history } = this.props;
    history.push('/profile/edit');
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

  render() {
    const { name, image, description, email, isLoadind } = this.state;

    return (
      <div data-testid="page-profile">
        <Header />

        { isLoadind ? <Loading />
          : (
            <section>
              <img src={ image } alt="imagem do perfil" data-testid="profile-image" />
              <p>
                { name }
              </p>
              <p>
                {email}
              </p>
              <p>
                { description }
              </p>
              <button
                type="button"
                onClick={ this.editProfile }
              >
                Editar perfil
              </button>
            </section>
          )}
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Profile;
