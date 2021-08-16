import React from "react";
import Form from "./form";
import joi from "joi-browser";
import * as fakeMovieService from "../services/fakeMovieService";
import * as fakeGenreServices from "../services/fakeGenreService";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    errors: {},
    genres: []
  };
  componentDidMount() {
    const genres = fakeGenreServices.getGenres();
    this.setState({ genres });
    const movieId = this.props.match.params.id;
    if (movieId === "new") return;
    const movie = fakeMovieService.getMovie(movieId);
    if (!movie) {
      return this.props.history.push("/not-found");
    }
    this.setState({
      data: this.maptoViewmodel(movie)
    });
  }
  maptoViewmodel = movie => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate
    };
  };
  schema = {
    _id: joi.string(),
    title: joi
      .string()
      .required()
      .label("Title"),
    genreId: joi
      .string()
      .required()
      .label("Genre"),
    numberInStock: joi
      .number()
      .required()
      .min(0)
      .max(100)
      .label("Number In Stock"),
    dailyRentalRate: joi
      .number()
      .required()
      .label("Rate")
      .min(0)
      .max(10)
  };
  doSubmit = () => {
    console.log("I am here");
    fakeMovieService.saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSumbit}>
          {this.renderInput("title", "Title", "")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "")}
          {this.renderInput("dailyRentalRate", "Rate", "")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
