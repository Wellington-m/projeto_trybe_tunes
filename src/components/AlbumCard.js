import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Card = styled.div`
  width: 200px;
  height: 230px;
  background: #3F3D56;
  border: 0px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  a {
    color: white;
    text-decoration: none;
  }
  overflow: hidden;

  :hover {
    box-shadow: 0 6px 10px 0 rgba(0,0,0,0.4);
  }
`;

const Img = styled.img`
  width: 200px;
  height: 160px;
  border-bottom: 2px solid rgba(255,255,255,0.4);
  border-radius: 10px 10px 0px 0px;
`;

class AlbumCard extends React.Component {
  render() {
    const { img, albumName, artistName, id } = this.props;
    return (
      <Card>
        <Link to={ `/album/${id}` } data-testid={ `link-to-album-${id}` }>
          <Img src={ img } alt={ albumName } />
          <p>{`Album: ${albumName}`}</p>
          <p>{`Artista: ${artistName}`}</p>
        </Link>
      </Card>
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
