import React from "react";

const ListGroup = props => {
  const { selectedGenre, onGenreClick, genres } = props;
  return (
    <ul className="list-group" align-items-left>
      <li
        className={
          selectedGenre === "All Genre"
            ? "list-group-item active"
            : "list-group-item"
        }
        onClick={() => onGenreClick("All Genre")}
      >
        All Genre
      </li>
      {genres.map(genre => (
        <li
          key={genre}
          className={
            selectedGenre === genre.name
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onGenreClick(genre.name)}
        >
          {genre.name}
        </li>
      ))}
    </ul>
  );
};

export default ListGroup;
