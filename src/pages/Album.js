import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import AlbumCard from '../components/AlbumCard';

const AlbumInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const MusicsDiv = styled.div`
  max-height: 500px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      albumName: '',
      tracks: [],
      favoriteSongs: [],
      img: '',
      albumId: '',
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getListOfMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    console.log(musics);
    const [firstResult] = musics;
    const tracksList = musics.slice(1);
    this.setState({
      artistName: firstResult.artistName,
      albumName: firstResult.collectionName,
      img: firstResult.artworkUrl100,
      albumId: firstResult.collectionId,
      tracks: [...tracksList],
      isLoading: false,
    });
  }

  getFavorite = async () => {
    this.setState({ isLoading: true });
    const favoritesSongs = await getFavoriteSongs();
    this.setState({
      favoriteSongs: favoritesSongs,
    });
    this.getListOfMusic();
  }

  isFavoriteSong = (musicId) => {
    const { favoriteSongs } = this.state;
    const isFavorite = favoriteSongs
      .some((favoriteMusic) => favoriteMusic.trackId === musicId);
    return isFavorite;
  }

  addOrRemoveToFavorite = async (element, trackId) => {
    const { tracks } = this.state;
    const { target } = element;
    const music = tracks.find((track) => track.trackId === trackId);
    if (target.checked) {
      this.setState({
        isLoading: true,
      });
      await addSong(music);
      this.getFavorite();
      this.setState({ isLoading: false });
    } else {
      this.setState({
        isLoading: true,
      });
      await removeSong(music);
      this.getFavorite();
      this.setState({ isLoading: false });
    }
  }

  render() {
    const {
      artistName,
      albumName, tracks, favoriteSongs, isLoading, img, albumId } = this.state;
    if (isLoading) {
      return <Loading component="Album" />;
    }
    return (
      <div data-testid="page-album">
        <Header />
        <AlbumInfo>
          <AlbumCard
            key={ albumId }
            id={ albumId }
            img={ img }
            albumName={ albumName }
            artistName={ artistName }
          />
          <MusicsDiv>
            { tracks.map((music) => (
              <MusicCard
                key={ music.trackId }
                checked={ this.isFavoriteSong(music.trackId) }
                trackId={ music.trackId }
                trackName={ music.trackName }
                previewUrl={ music.previewUrl }
                favoriteSongs={ favoriteSongs }
                music={ music }
                attFavorites={ this.addOrRemoveToFavorite }
              />
            )) }
          </MusicsDiv>
        </AlbumInfo>
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
