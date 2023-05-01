import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();

    this.state = {
      allFavoriteSongs: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getFavorite();
  }

  getFavorite = async () => {
    this.setState({ isLoading: true });
    const favoriteSongs = await getFavoriteSongs();
    this.setState({
      allFavoriteSongs: favoriteSongs,
    });
    this.setState({ isLoading: false });
  }

  removeFavorite = async (musicId) => {
    this.setState({
      isLoading: true,
    });
    const { allFavoriteSongs } = this.state;
    await removeSong(allFavoriteSongs.find((s) => s.trackId === musicId));
    this.getFavorite();
  }

  render() {
    const { allFavoriteSongs, isLoading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { isLoading
          ? <Loading />
          : allFavoriteSongs.map((music) => (
            <MusicCard
              key={ music.trackId }
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              trackId={ music.trackId }
              checked
              attFavorites={ () => this.removeFavorite(music.trackId) }
            />
          ))}
      </div>
    );
  }
}

export default Favorites;
