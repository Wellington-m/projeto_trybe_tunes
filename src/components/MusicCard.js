import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, checked, attFavorites } = this.props;
    const track = (
      <label htmlFor={ `checkbox-music-${trackId}` }>
        Favorita
        <span className="tw-heart-box">
          <input
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorities"
            checked={ checked }
            onChange={ (e) => attFavorites(e, trackId) }
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
        { track }

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({ trackId: PropTypes.number.isRequired }).isRequired,
  attFavorites: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default MusicCard;
