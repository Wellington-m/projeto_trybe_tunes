import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';
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
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
  }

  favoriteSong = async (e) => {
    if (e.target.checked) {
      this.setState({ isLoading: true });
      const { tracks } = this.state;
      const trackId = parseInt(e.target.value, 10);
      const result = tracks.filter((element) => element.trackId === trackId);
      const [resultObject] = result;
      await addSong(resultObject);
      this.setState({ isLoading: false });
    }
  }

  getMusicsFromApi = async () => {
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

  render() {
    const { artistName, albumName, tracks, isLoading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>

        { isLoading && <Loading /> }

        { tracks.map((musics) => (
          <MusicCard
            key={ musics.trackId }
            trackId={ musics.trackId }
            trackName={ musics.trackName }
            previewUrl={ musics.previewUrl }
            onChange={ this.favoriteSong }
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
