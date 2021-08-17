import React from "react";

const SearchBox = props => {
  return (
    <input
      className="form-control"
      onChange={props.onChange}
      type="text"
      placeholder="Search Movie.."
    ></input>
  );
};

export default SearchBox;
