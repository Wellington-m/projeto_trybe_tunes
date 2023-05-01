import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import './MusicCard.css';

const HeartBoxSpan = styled.span`
    display: inline-block;
    height: 100px;
    position: relative;
    width: 100px;
`;

const HeartSpan = styled.span`
    background: url('http://i.imgur.com/zw8ahUb.png') no-repeat 0 0;
    display: inline-block;
    height: inherit;
    left: 0;
    position: absolute;
    top: 0;
    width: inherit;
`;

const MusicCardStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: end;
  height: 100%;
  width: 100%;
`;

class MusicCard extends React.Component {
  render() {
    const { trackName, previewUrl, trackId, checked, attFavorites } = this.props;
    const track = (
      <label htmlFor={ `checkbox-music-${trackId}` }>
        <HeartBoxSpan className="tw-heart-box">
          <input
            id={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorities"
            checked={ checked }
            onChange={ (e) => attFavorites(e, trackId) }
            data-testid={ `checkbox-music-${trackId}` }
          />
          <HeartSpan className="tw-heart" />
        </HeartBoxSpan>
      </label>);
    return (
      <MusicCardStyled>
        <p>{ trackName }</p>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>
        { track }

      </MusicCardStyled>

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
