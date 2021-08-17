import React, { Component } from "react";
import * as fakeGenreServiceAPI from "../services/fakeMovieService";
import "../../node_modules/font-awesome/css/font-awesome.min.css";
import * as fakeGenreserise from "../services/fakeGenreService";
import Like from "../shared/likes";
import * as fakeMovieService from "../services/fakeMovieService";
import Pagination from "../shared/pagination";
import paginate from "../utils/paginate";
import ListGroup from "../shared/listGroup";
import genreList from "../utils/genre";
import { Link } from "react-router-dom";
import SearchBox from "../components/search";

class MoviesList extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      movieInfo: ["MovieTitle", "Genre", "AvailableStock", "RentalRate", ""],
      pageSize: 4,
      currentPage: 1,
      currentGenre: "All Genre",
      genres: []
    };
  }
  componentDidMount() {
    this.setState({
      movies: fakeGenreServiceAPI.getMovies(),
      genres: fakeGenreserise.getGenres()
    });
  }
  handleClick(e, id) {
    const movies = this.state.movies.filter(movie => id != movie._id);
    this.setState({ movies });
    fakeGenreServiceAPI.deleteMovie(id);
  }
  handleLikes = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movie.liked = !movies[index].liked;
    movies[index] = movie;
    this.setState({ movies });
  };
  handleChange = e => {
    let searchMovie = e.currentTarget.value;
    const movies = fakeMovieService.getMovies();
    console.log("anusha");
    console.log(searchMovie);
    const filteredMovies = movies.filter(movie => {
      console.log(movie);
      return movie.title.toUpperCase().startsWith(searchMovie.toUpperCase());
    });
    this.setState({
      movies: filteredMovies,
      currentGenre: "All Genre",
      currentPage: 1
    });
  };
  handlePagination = page => {
    this.setState({
      currentPage: page
    });
  };
  handleGenre = genre => {
    this.setState({ currentGenre: genre });
  };
  filtered = (currentGenre, currentPage) => {
    let pageMovies = [];
    if (currentGenre === "All Genre" || currentGenre === "") {
      pageMovies = paginate(
        this.state.movies,
        currentPage,
        this.state.pageSize
      );
    } else {
      pageMovies = genreList(currentGenre, this.state.movies);
    }
    return pageMovies;
  };
  render() {
    const movieHeaders = this.state.movieInfo.map(movie => (
      <th scope="col">{movie}</th>
    ));
    const { length: count } = this.state.movies;
    const { pageSize, currentPage, currentGenre, genres } = this.state;

    const pageMovies = this.filtered(currentGenre, currentPage);
    console.log("page movies");
    console.log(pageMovies);
    const moviData = pageMovies.map(movie => (
      <tr>
        <td>
          <Link key={movie._id} to={`/movies/${movie._id}`}>
            {movie.title}
          </Link>
        </td>
        <td>{movie.genre.name}</td>
        <td>{movie.numberInStock}</td>
        <td>{movie.dailyRentalRate}</td>
        <td>
          <Like
            key={movie._id}
            liked={movie.liked}
            onClick={() => this.handleLikes(movie)}
          />
        </td>
        <button
          type="submit"
          className="btn btn-danger btn-sm"
          onClick={e => this.handleClick(e, movie._id)}
        >
          delete
        </button>
      </tr>
    ));
    if (count === 0) {
      return (
        <div>
          <h5 style={{ textAlign: "left" }}>No movies in the database</h5>
        </div>
      );
    } else
      return (
        <div className="row">
          <div className="col3">
            <ListGroup
              selectedGenre={currentGenre}
              onGenreClick={this.handleGenre}
              genres={genres}
            />
          </div>
          <div className="col">
            <button className="btn btn-primary">
              <Link className="btn btn-primary" to="/movies/new">
                New Movie
              </Link>
            </button>
            <h5 style={{ textAlign: "left", marginTop: 30 }}>
              Showing {currentGenre === "All Genre" ? count : pageMovies.length}{" "}
              movies in the database
            </h5>
            <SearchBox onChange={this.handleChange} />
            <table className="table">
              <thead>{movieHeaders}</thead>
              <tbody>{moviData}</tbody>
            </table>
            <Pagination
              totalCount={count}
              pageSize={pageSize}
              onPagination={this.handlePagination}
              currentPage={currentPage}
              currentGenre={currentGenre}
            />
          </div>
        </div>
      );
  }
}

export default MoviesList;
