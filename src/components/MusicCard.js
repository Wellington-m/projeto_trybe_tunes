import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';
import './MusicCard.css';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    const { favoriteSongs, music } = this.props;
    const isFavorite = favoriteSongs
      .some((favoriteMusic) => favoriteMusic.trackId === music.trackId);
    if (isFavorite) {
      console.log(isFavorite);
      this.setState({ checked: true });
    }
  }

  favoriteSong = async ({ target }) => {
    const { music, attFavorites } = this.props;
    if (target.checked) {
      this.setState({
        checked: true,
        loading: true,
      });
      await addSong(music);
      attFavorites();
      this.setState({ loading: false });
    } else {
      this.setState({
        checked: false,
        loading: true,
      });
      await removeSong(music);
      attFavorites();
      this.setState({ loading: false });
    }
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { checked, loading } = this.state;
    console.log(trackName);
    const track = (
      <label htmlFor="favorities">
        Favorita
        <span className="tw-heart-box">
          <input
            type="checkbox"
            name="favorities"
            checked={ checked }
            onChange={ this.favoriteSong }
            data-testid={ `checkbox-music-${trackId}` }
          />
          <span className="tw-heart" />
        </span>
      </label>);
    return (
      <div className="musicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        { loading ? <Loading /> : track }

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({ trackId: PropTypes.number.isRequired }).isRequired,
  favoriteSongs: PropTypes.arrayOf(PropTypes.object).isRequired,
  attFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
