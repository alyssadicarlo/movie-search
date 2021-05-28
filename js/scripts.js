'use strict';

document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.querySelector('#searchButton');
    const movieContainer = document.querySelector('.movieContainer');

    searchButton.addEventListener('click', function () {
        const input = document.querySelector('#movieSearch');
        const movie = input.value;
        fetchMovie(movie);
    });

    function fetchMovie(movie) {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&query=${movie}&page=1&include_adult=false`
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateMovies(data);
        })
    }

    function updateMovies(data) {
        movieContainer.innerHTML = "";
        const movieData = data.results;

        movieData.forEach(function (movie) {
            const movieCardElement = document.createElement('div');
            movieCardElement.classList.add("movieCard");

            const movieTitleElement = document.createElement('h2');
            const movieOverviewElement = document.createElement('p');

            movieTitleElement.innerText = movie.title;
            movieOverviewElement.innerText = movie.overview;

            movieCardElement.append(movieTitleElement);
            movieCardElement.append(movieOverviewElement);

            movieContainer.append(movieCardElement);
        });

    }

});