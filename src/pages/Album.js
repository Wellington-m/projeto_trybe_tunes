import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      tracks: [],
    };
  }

  componentDidMount() {
    this.getMusicsFromApi();
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
    const { artistName, albumName, tracks } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name">{artistName}</p>
        <p data-testid="album-name">{albumName}</p>
        { tracks.map((musics) => (
          <MusicCard
            key={ musics.trackId }
            trackName={ musics.trackName }
            previewUrl={ musics.previewUrl }
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
