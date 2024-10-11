const movies = JSON.parse(localStorage.getItem("movies")) || [];

const inputNode = document.getElementById("addMovieInput");
const addButtonNode = document.getElementById("addMovieButton");
const moviesList = document.getElementById("moviesList");

const saveMoviesToLocalStorage = () => {
  const moviesString = JSON.stringify(movies);
  localStorage.setItem("movies", moviesString);
}

const getMovieFromUser = () => {
  const movieName = inputNode.value.trim();

  if (!movieName) {
    alert('Введите название фильма')
    return;
  }

  return movieName;
}

const clearInput = () => {
  inputNode.value = "";
}

const addMovie = (movieName) => {
  movies.push({ name: movieName, viewed: false });
  saveMoviesToLocalStorage();
}

const addButtonHandler = () => {
  const movieName = getMovieFromUser();

  if (!movieName) {
    return;
  }

  addMovie(movieName);

  clearInput();

  renderMoviesList();
}

const checkboxChangeHandler = (index, checkbox, movieItem) => {
  const isChecked = checkbox.checked;
  movieItem.classList.toggle("viewed", isChecked);

  movies[index].viewed = isChecked;
  saveMoviesToLocalStorage();
}

const createMovieItem = (movie, index) => {
  const movieItem = document.createElement("li");
  movieItem.className = "movie__item";

  const checkboxWrapper = document.createElement("label");
  checkboxWrapper.className = "custom-checkbox";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "movie__checkbox";
  checkbox.checked = movie.viewed;

  checkbox.addEventListener("change", () => checkboxChangeHandler(index, checkbox, movieItem));

  const checkmark = document.createElement("span");
  checkmark.className = "checkmark";

  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(checkmark);

  const textNode = document.createTextNode(movie.name);
  movieItem.append(checkboxWrapper, textNode, createDeleteButton(index));

  if (movie.viewed) {
    movieItem.classList.add("viewed");
  }

  return movieItem;
}

const createDeleteButton = (index) => {
  const deleteButton = document.createElement("button");
  deleteButton.className = "movie__delete-button";

  deleteButton.addEventListener("click", (event) => {
    deleteMovie(index);
  });

  return deleteButton;
}

const deleteMovie = (index) => {
  movies.splice(index, 1);
  saveMoviesToLocalStorage();
  renderMoviesList();
}

const renderMoviesList = () => {
  moviesList.innerHTML = "";

  movies.forEach((movie, index) => {
    const movieItem = createMovieItem(movie, index);
    moviesList.prepend(movieItem);
  });
}

addButtonNode.addEventListener("click", addButtonHandler);
document.addEventListener('DOMContentLoaded', renderMoviesList);