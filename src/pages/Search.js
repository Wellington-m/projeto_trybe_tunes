import React from 'react';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      nameSearched: '',
      buttonSearch: true,
      loadingSearch: false,
      searchEnded: false,
      returnedValue: true,
      resultSearch: [],
    };
  }

  getNameArtist = ({ target }) => {
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

  searchMusic = async (e) => {
    e.preventDefault();
    this.setState({ loadingSearch: true });
    const { search } = this.state;
    const returnSearch = await searchAlbumsAPI(search);
    this.setState({
      resultSearch: [...returnSearch],
      nameSearched: search,
      loadingSearch: false,
      searchEnded: true,
      search: '',
    }, () => {
      const { resultSearch } = this.state;
      if (resultSearch.length === 0) {
        this.setState({ returnedValue: false });
      } else {
        this.setState({ returnedValue: true });
      }
    });
  };

  render() {
    const {
      search,
      buttonSearch,
      loadingSearch,
      nameSearched,
      searchEnded,
      resultSearch,
      returnedValue } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <section className="search">

          {loadingSearch ? <Loading />
            : (
              <form onSubmit={ this.searchMusic }>
                <FormInput
                  htmlFor="search"
                  placeHolder="Nome do artista"
                  type="text"
                  name="search"
                  value={ search }
                  onChange={ this.getNameArtist }
                  dataTestid="search-artist-input"
                />

                <button
                  type="submit"
                  disabled={ buttonSearch }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </button>
              </form>)}
        </section>
        <section className="resultOfSearch">
          {searchEnded
          && (
            <p>
              {`Resultado de álbuns de: ${nameSearched} `}
            </p>)}

          {returnedValue
            ? (
              resultSearch.map((album) => (
                <AlbumCard
                  key={ album.collectionId }
                  id={ album.collectionId }
                  img={ album.artworkUrl100 }
                  albumName={ album.collectionName }
                  artistName={ album.artistName }
                />
              )))
            : <p>Nenhum álbum foi encontrado</p>}

        </section>
      </div>
    );
  }
}

export default Search;
