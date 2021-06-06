'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = window.location.search;
    fetchMovie(searchInput.slice(7,searchInput.length));

    const mainSection = document.querySelector('.page-main');

    function fetchMovie(searchInput) {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&query=${searchInput}&page=1&include_adult=false`
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateMovies(data);
        });
    }

    function updateMovies(data) {
        mainSection.innerHTML = "";
        const movieData = data.results;
        const resultsWrapper = document.createElement('div');

        movieData.forEach(function (movie) {
            const movieCardElement = document.createElement('div');
            movieCardElement.classList.add('.movie-search-card');
            const movieTitleElement = document.createElement('h2');
            const movieOverviewElement = document.createElement('p');
            const moviePosterElement = document.createElement('img');

            movieTitleElement.innerText = movie.title;
            movieOverviewElement.innerText = movie.overview;
            moviePosterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;

            movieCardElement.append(movieTitleElement);
            movieCardElement.append(movieOverviewElement);
            movieCardElement.append(moviePosterElement);

            resultsWrapper.append(movieCardElement);
        });

        mainSection.append(resultsWrapper);
    }
});