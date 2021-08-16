import React, { Component } from "react";

const MovieDetails = props => {
  return (
    <React.Fragment>
      <h1>{props.match.params.id}</h1>
      <button onClick={() => props.history.push("/movies")}>Save</button>
    </React.Fragment>
  );
};

export default MovieDetails;
