/**
 * DOM elements and variables
 */
const addMovieModal = document.getElementById("add-modal");
const startAddMovieButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelAddMovieButton = addMovieModal.querySelector(".btn--passive");
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const listRoot = document.getElementById("movie-list");
const deleteMovieModal = document.getElementById("delete-modal");

const movies = [];

/**
 * Toggles the entry text indicating there are currently no favorite movies.
 */
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

/**
 * Removes movie with id movieId from array and from page.
 * @param {String} movieId: unique id for the movie to be deleted
 */
const deleteMovieHandler = (movieId) => {
  const index = movies.findIndex((el) => el.id === movieId);
  if (index !== -1) movies.splice(index, 1);

  listRoot.children[index].remove();

  closeMovieDeletionModal();
  updateUI();
};

/**
 * Closes the deletion confirmation modal.
 */
const closeMovieDeletionModal = () => {
  toggleBackdrop();
  deleteMovieModal.classList.remove("visible");
};

/**
 * Shows modal to confirm deletion of movie.
 * @param {String} movieId: unique id for a movie to delete
 */
const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible");
  toggleBackdrop();

  const cancelDeletionButton = deleteMovieModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  // cleanup previous listeners set up, if modal opened before
  cancelDeletionButton.removeEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));
  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger");

  cancelDeletionButton.addEventListener("click", closeMovieDeletionModal);
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  );
};

/**
 * Renders a new movie on the page, at the bottom of the movie list.
 * @param {String} id: unique id for the movie
 * @param {String} title: the name of the movie
 * @param {String} imageUrl: url for the image
 * @param {String} rating: user's rating for the movie
 */
const renderNewMovieElement = (id, title, imageUrl, rating) => {
  const newMovieElement = document.createElement("li");
  newMovieElement.className = "movie-element";
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${imageUrl}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p>${rating}/5</p>
    </div>
  `;
  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  );
  listRoot.append(newMovieElement);
};

/**
 * Toggle the backdrop of page, so that it is faded when user clicks on modal.
 */
const toggleBackdrop = () => {
  backdrop.classList.toggle("visible");
};

/**
 * Close the add movie modal.
 */
const closeMovieModal = () => {
  toggleBackdrop();
  addMovieModal.classList.remove("visible");
};

/**
 * Toggle the modal used to add a new movie.
 */
const showMovieModal = () => {
  addMovieModal.classList.add("visible");
  toggleBackdrop();
};

/**
 * Clear out the input values in the add movie modal.
 */
const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

/**
 * Called when user clicks the Cancel button in the add movie
 * modal. Toggles the modal.
 */
const cancelAddMovieHandler = () => {
  closeMovieModal();
  clearMovieInput();
};

/**
 * Adds a new movie to the movie array, and renders on the screen.
 *
 * Validate that none of the inputs are empty, and that the rating input
 * is between 1 and 5.
 *
 * Closes the modal, and clears the input values from the modal.
 */
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values.");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);

  closeMovieModal();
  clearMovieInput();

  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  );
  updateUI();
};

/**
 * Called when a user clicks on the backdrop, which will toggle
 * the modal that is currently shown.
 */
const backdropClickHandler = () => {
  closeMovieModal();
  closeMovieDeletionModal();
  clearMovieInput();
  toggleBackdrop();
};

/**
 * Event Handlers
 */
startAddMovieButton.addEventListener("click", showMovieModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler);
confirmAddMovieButton.addEventListener("click", addMovieHandler);
