/**
 * DOM Elements and constants
 */
const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");
const movieList = document.getElementById("movie-list");

const movies = [];

/**
 * Toggle movie list element visibility.
 */
const toggleMovieList = () => {
  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
};

/**
 * Render movies on the page, either all movies, or only those included
 * with filter.
 * @param {String} filter text for searching movie titles
 */
const renderMovies = (filter = "") => {
  toggleMovieList();
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) => movie.info.title.includes(filter));

  filteredMovies.forEach((movie) => {
    const movieEl = document.createElement("li");
    const { info, ...otherProps } = movie;

    let text = otherProps.id + " => " + info.title + " - ";

    for (const key in info) {
      if (key !== "title") {
        text += `${key}: ${info[key]}`;
      }
    }
    movieEl.textContent = text;
    movieList.append(movieEl);
  });
};

/**
 * Validate the user input.
 *
 * Returns true if valid, else returns false.
 * @param {String} title title of the movie
 * @param {String} extraName name of extra element of movie
 * @param {String} extraValue value for the extra element
 */
const validateMovieInputs = (title, extraName, extraValue) => {
  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return false;
  }
  return true;
};

/**
 * Adds a movie to the movie list both in the movies variable,
 * and renders on the page.
 *
 * @param {String} title title of the movie
 * @param {String} extraName name of extra element of movie
 * @param {String} extraValue value for the extra element
 */
const addMovie = (title, extraName, extraValue) => {
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random().toPrecision(2).toString(),
  };
  movies.push(newMovie);
  renderMovies();
};

/**
 * Handler for adding a movie.
 */
const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (!validateMovieInputs(title, extraName, extraValue)) return;
  addMovie(title, extraName, extraValue);
};

/**
 * Handler for searching movies.
 */
const searchMoviesHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

/**
 * Event listeners
 */
addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searchMoviesHandler);
