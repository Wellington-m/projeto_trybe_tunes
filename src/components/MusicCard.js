import React from 'react';
import PropTypes from 'prop-types';
import './MusicCard.css';

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, checked, onChange } = this.props;
    return (
      <div className="musicCard">
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        <label htmlFor="favorities">
          Favorita
          <span className="tw-heart-box">
            <input
              type="checkbox"
              name="favorities"
              checked={ checked }
              onChange={ onChange }
              value={ trackId }
              data-testid={ `checkbox-music-${trackId}` }
            />
            <span className="tw-heart" />
          </span>
        </label>

      </div>

    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default MusicCard;
