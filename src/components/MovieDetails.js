import React from 'react';
import axios from 'axios';
import './MovieDetails.css';
import imdbLogo from './images/logo-imdb.svg';
import rottenLogo from './images/logo-rotten-tomatoes.svg';
import heartIcon from './images/icon-heart-grey.svg';
import heartIconFull from './images/icon-heart-full.svg';
import backArrowGrey from './images/icon-arrow-grey.svg';
import backArrowWhite from './images/icon-arrow-white.svg';

class MovieDetails extends React.Component {

    constructor(props) {
        super(props);

        this.state = { apikey: props.apikey, movieData: {}, isLoading: true, favorite: false, arrowHover: false};

        this.getMovieData(props.movieDetails.imdbID);
    }

    onBackButton = () => {
        this.props.onBackClick();
    }

    setFavorite = () => {
        this.setState({favorite: !this.state.favorite});
    }

    arrowEnter = () => {
        this.setState({arrowHover: true});
    }

    arrowLeave = () => {
        this.setState({arrowHover: false});
    }

    getMovieData = async id => {
        const response = await axios.get('http://www.omdbapi.com/', {
          params: { apikey: this.state.apikey, i: id }
        });
    
        this.setState({ movieData: response.data });
        let cast_arr = response.data.Actors.split(', ');
        let cast = [];
        for (var i in cast_arr) {
            cast.push({id: i, name: cast_arr[i]});
        }
        this.setState({cast: cast});

        let genres_arr = response.data.Genre.split(', ');
        let genres = [];
        for (var j in genres_arr) {
            genres.push({id: j, name: genres_arr[j]});
        }
        this.setState({genres: genres});

        let directors_arr = response.data.Director.split(', ');
        let directors = [];
        for (var k in directors_arr) {
            directors.push({id: k, name: directors_arr[k]});
        }
        this.setState({directors: directors});
        this.setState({isLoading: false});
      }

    render() {
        if(this.state.isLoading) {
            return <div></div>;
        }
        else {
            const cast = this.state.cast.map(({id, name}) => {
                return <p key={id}>{name}</p>;
            });
            const genres = this.state.genres.map(({id, name}) => {
                return <p key={id}>{name}</p>;
            });
            const directors = this.state.directors.map(({id, name}) => {
                return <p key={id}>{name}</p>;
            });
            let favoriteClass = this.state.favorite === true ? "toggle-favorite" : "";
            let favoriteIcon = this.state.favorite === true ? heartIconFull : heartIcon;
            let favoriteText = this.state.favorite === true ? "Added" : "Add to favorites";
            let backArrow = this.state.arrowHover === true ? backArrowWhite : backArrowGrey;
            return (
                <div className="movie-details">
                    <div className="row">
                        <div className="col-md-6">
                            <img alt="Back" className="back-arrow" src={backArrow} onClick={this.onBackButton} onMouseEnter={this.arrowEnter} onMouseLeave={this.arrowLeave}/>
                            <h1 className="movie-details-title">{this.props.selectedMovie}</h1>
                            <div className="imdb-rating">
                                <span className="imdb-rating-logo"><img alt="IMDB Logo" src={imdbLogo} /></span>
                                <span className="imdb-rating-text">{this.state.movieData.Ratings[0].Value}</span>
                            </div>
                            <div className="rotten-rating">
                                <span className="rotten-rating-logo"><img alt="Rotten Tomatoes Logo" src={rottenLogo} /></span>
                                <span className="rotten-rating-text">{this.state.movieData.Ratings[1].Value}</span>
                            </div>
                            <div className={`favorite ${favoriteClass}`} onClick={this.setFavorite}>
                                <span className="favorite-icon"><img alt="Favorite" src={favoriteIcon} /></span>
                                <span className={`favorite-text ${favoriteClass}`}>{favoriteText}</span>
                            </div>
                            <div className="plot">
                                <p className="plot-label"><b>Plot</b></p>
                                <p>{this.state.movieData.Plot}</p>
                            </div>
                            <div className="row no-gutters">
                                <div className="cast col-md-4">
                                    <p className="cast-label"><b>Cast</b></p>
                                    {cast}
                                </div>
                                <div className="genre col-md-4">
                                    <p className="genre-label"><b>Genre</b></p>
                                    {genres}
                                </div>
                                <div className="director col-md-4">
                                    <p className="director-label"><b>Director</b></p>
                                    {directors}
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="movie-details-poster">
                                <img alt="Poster" src={this.state.movieData.Poster} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

export default MovieDetails;