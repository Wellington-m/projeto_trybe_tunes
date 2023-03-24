import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import FormInput from '../components/FormInput';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

const FormPesquisa = styled.form`
  display: flex;
  margin-top: 20px;
  margin-bottom: 20px;

  input {
    width: 590px;
    height: 70px;
    border: 2px solid rgba(63, 61, 86, 0.6);
    border-radius: 10px;
    font-size: 28px;
    padding-left: 30px;
  }
`;

const Button = styled.button`
  width: 270px;
  height: 70px;
  background: #FF6584;
  border-radius: 10px;
  color: white;
  font-size: 28px;
  line-height: 34px;
  margin-left: 20px;
`;

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const ResultCards = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      search: '',
      nameSearched: '',
      buttonSearch: true,
      loadingSearch: false,
      searchEnded: false,
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
    });
  };

  render() {
    const {
      search,
      buttonSearch,
      loadingSearch,
      nameSearched,
      searchEnded,
      resultSearch } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <Wrapper>
          {loadingSearch ? <Loading loadMessage="pesquisa" />
            : (
              <FormPesquisa onSubmit={ this.searchMusic }>
                <FormInput
                  htmlFor="search"
                  placeHolder="Nome do artista"
                  type="text"
                  name="search"
                  value={ search }
                  onChange={ this.getNameArtist }
                  dataTestid="search-artist-input"
                />

                <Button
                  type="submit"
                  disabled={ buttonSearch }
                  data-testid="search-artist-button"
                >
                  Pesquisar
                </Button>
              </FormPesquisa>)}
          {searchEnded && (
            <div>
              { resultSearch.length === 0
                ? <h3>Nenhum álbum foi encontrado</h3>
                : (
                  <div>
                    <h3>{`Resultado de álbuns de: ${nameSearched} `}</h3>
                    <ResultCards>
                      { resultSearch.map((album) => (
                        <AlbumCard
                          key={ album.collectionId }
                          id={ album.collectionId }
                          img={ album.artworkUrl100 }
                          albumName={ album.collectionName }
                          artistName={ album.artistName }
                        />
                      ))}
                    </ResultCards>
                  </div>
                )}

            </div>
          ) }
        </Wrapper>
      </div>
    );
  }
}

export default Search;
