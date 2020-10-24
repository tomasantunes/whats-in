import React from 'react';
import MovieDetails from './MovieDetails';
import './SearchResults.css';
import illustrationEmpty from './images/illustration-empty-state.png';
import iconHeart from './images/icon-heart-white.svg';

class SearchResults extends React.Component {

  state = {selectedMovie: '', movieDetails: {}};

  onButtonClick = event => {
    this.props.onEmptyClick("Godfather");
  };

  resetSelectedMovie = () => {
    this.setState({selectedMovie: '', movieDetails: {}});
    this.props.onSearchToggle();
  }

  selectMovie = (id) => {
    let movie = this.props.results.find(x => x.imdbID === id);
    this.setState({selectedMovie: movie.Title, movieDetails: movie});
    this.props.onSearchToggle();
  }

  render() {
    const results = this.props.results.map(({ Title, Year, imdbID, Poster }) => {
    return (
        <div key={imdbID} className="movie-result">
          <img alt={Title} src={Poster} />
          <div className="overlay">
          </div>
          <div className="overlay-title" onClick={() => this.selectMovie(imdbID)} >{Title}</div>
          <div className="overlay-year">{Year}</div>
          <div className="overlay-heart"><img alt="Heart" src={iconHeart} /></div>
        </div>
      );
    });

    return (
      <div>
        {(() => {
          if (this.state.selectedMovie !== '') {
            return <MovieDetails selectedMovie={this.state.selectedMovie} movieDetails={this.state.movieDetails} onBackClick={this.resetSelectedMovie} apikey={this.props.apikey} />;
          }
          else if (results.length > 0) {
            return <div className="movie-results">{results}</div>;
          } 
          else {
            return (
              <div className="no-results">
                <img src={illustrationEmpty} className="center" alt="No Results" />
                <h2>Don't know what to search?</h2>
                <a href="/#" onClick={this.onButtonClick}>Here's an offer you can't refuse</a>
              </div>
            );
          }
        })()}
      </div>
    );
  }
};

export default SearchResults;
