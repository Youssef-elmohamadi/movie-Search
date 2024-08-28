const itemsBox = document.querySelector(".search-list");
const movieComponent = document.querySelector(".films");
const movieBody = document.createElement("div");
const searchInput = document.querySelector(".form-control");
function fetchForSearch(searchWords) {
  const APIKey = "22971a85";
  const URL = `https://www.omdbapi.com/?s=${searchWords}&page=2&apikey=${APIKey}`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response == "True") {
        showSearchList(data.Search);
      } else {
        const searchItemContainer = document.createElement("div");
        searchItemContainer.classList.add("d-flex");
        searchItemContainer.innerHTML = `<p class ="text-light"> No Data found</p>`;
        itemsBox.appendChild(searchItemContainer);
      }
    });
}

function showSearchList(data) {
  data.forEach((movie) => {
    const searchItemContainer = document.createElement("div");
    searchItemContainer.classList.add("d-flex", "search-item");
    searchItemContainer.innerHTML = `
                 <div class="image">
                    <img
                      class="w-100 h-100 p-2"
                      src=${movie.Poster}
                      alt=""
                    />
                  </div>
                  <div class="list-info">
                    <h3 class="fs-6 text-light">${movie.Title}</h3>
                    <p class="text-secondary fs-7">${movie.Year}</p>
                  </div>
        `;
    searchItemContainer.dataset.imdbid = movie.imdbID;
    itemsBox.appendChild(searchItemContainer);
    searchItemContainer.addEventListener("click", () => {
      movieBody.innerHTML = "";
      searchInput.value = "";
      fetchForShow(movie.imdbID);
    });
  });
}

function search() {
  itemsBox.innerHTML = "";
  const value = searchInput.value.trim();
  if (value.length > 0) {
    itemsBox.classList.remove("hide-search-list");
    fetchForSearch(value);
  } else {
    itemsBox.classList.add("hide-search-list");
  }
}

window.addEventListener("click", function (event) {
  if (event.target.className != "form-control") {
    itemsBox.classList.add("hide-search-list");
  }
});

async function fetchForShow(id) {
  const URL = `https://www.omdbapi.com/?i=${id}&apikey=22971a85`;
  const response = await fetch(URL);
  const data = await response.json();
  if (data.Response == "True") {
    createMovieDetails(data);
  }
}

function createMovieDetails(data) {
  movieBody.classList.add(
    "film-component",
    "p-3",
    "mt-5",
    "d-flex",
    "gap-5",
    "justify-content-center",
    "align-items-center",
    "w-100"
  );
  movieBody.innerHTML = ` <div class="image-film">
            <img
              class="w-100 h-100 img-thumbnail"
              src=${data.Poster}
              alt=""
            />
          </div>
          <div class="info-film w-50">
            <h3 class="movie-title text-warning">
              ${data.Title}
            </h3>
            <ul
              class="movie-misc-info text-light list-group d-flex w-100 justify-content-start"
            >
              <li
                class="list-group-item year w-100 text-light py-2 px-0 bg-transparent border-0"
              >
                Year: ${data.Year}
                <span class="p-2 rounded bg-warning fw-bold"
                  >Ratings: ${data.imdbRating} </span
                > Released: ${data.Released}
              </li>
            </ul>
            <p class="genre p-3 rounded text-light">
              <b>Genre:</b> ${data.Genre}
            </p>
            <p class="writer p-1 text-light">
              <b>Writer:</b> ${data.Writer}
            </p>
            <p class="actors p-1 text-light">
              <b>Actors: </b>${data.Actors}
            </p>
            <p class="plot p-1 text-light">
              <b>Plot:</b> ${data.Plot}
            </p>
            <p class="language p-1 text-light"><b>Language:</b> ${data.Language}</p>
            <p class="awards p-1 text-warning">
              <b><i class="fas fa-award"></i></b> ${data.Awards}
            </p>
          </div>
`;
  movieComponent.appendChild(movieBody);
}

function displayMovieDetails() {
  const searchArray = document.querySelectorAll(".search-item");
  searchArray.forEach((item) => {
    item.addEventListener("click", () => {
      fetchForShow(item.imdbID);
    });
  });
}
