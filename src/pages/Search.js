import React from 'react';
// import PropTypes from 'prop-types';
import Header from '../components/Header';
import FormInput from '../components/FormInput';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      buttonSearch: true,
    };
  }

  searchMusic = ({ target }) => {
    const valueMusic = target.value;

    this.setState({
      search: valueMusic,
    }, () => {
      if (valueMusic.length >= 2) {
        this.setState({
          buttonSearch: false,
        });
      } else {
        this.setState({
          buttonSearch: true,
        });
      }
    });
  }

  render() {
    const { search, buttonSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section className="search">
          <form>
            <FormInput
              htmlFor="search"
              placeHolder="Nome do artista"
              type="text"
              name="search"
              value={ search }
              onChange={ this.searchMusic }
              dataTestid="search-artist-input"
            />

            <button
              type="submit"
              disabled={ buttonSearch }
              data-testid="search-artist-button"
            >
              Pesquisar
            </button>
          </form>
        </section>
      </div>
    );
  }
}

export default Search;
