import _ from "lodash";

export default function genreList(genre, items) {
  const filtered = items.filter(item => item.genre.name === genre);
  return filtered;
}
