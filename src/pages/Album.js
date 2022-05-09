import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      tracks: [],
      isLoading: false,
      favoriteSongs: [],
    };
  }

  componentDidMount() {
    this.getListOfMusic();
    this.getFavorite();
  }

  getListOfMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    const [firstResult] = musics;
    const tracksList = musics.filter((element) => element.wrapperType === 'track');
    this.setState({
      artistName: firstResult.artistName,
      albumName: firstResult.collectionName,
      tracks: [...tracksList],
    });
  }

  getFavorite = async () => {
    this.setState({ isLoading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favoritesSongs,
      isLoading: false,
    });
  }

  render() {
    const { artistName, albumName, tracks, isLoading, favoriteSongs } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>

        { isLoading ? <Loading />
          : tracks.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackId={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              favoriteSongs={ favoriteSongs }
              music={ music }
              attFavorites={ this.getFavorite }
            />
          )) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
