import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class AlbumCard extends React.Component {
  render() {
    const { img, albumName, artistName, id } = this.props;
    return (
      <Link to={ `/album/${id}` } data-testid={ `link-to-album-${id}` }>
        <div className="exibirAlbum">
          <img src={ img } alt={ albumName } />
          <p>{`Album: ${albumName}`}</p>
          <p>{`Artista: ${artistName}`}</p>
        </div>
      </Link>
    );
  }
}

AlbumCard.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  albumName: PropTypes.string.isRequired,
  artistName: PropTypes.string.isRequired,
};

export default AlbumCard;
