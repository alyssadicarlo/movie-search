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
        console.log(movieData);

        movieData.forEach(function (movie) {
            const movieCardElement = document.createElement('div');
            const movieTitleElement = document.createElement('h2');
            const movieOverviewElement = document.createElement('p');
            const moviePosterElement = document.createElement('img');

            movieTitleElement.innerText = movie.title;
            movieOverviewElement.innerText = movie.overview;
            moviePosterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;

            movieCardElement.classList.add("movieCard");
            moviePosterElement.classList.add("movieImage");

            movieCardElement.append(movieTitleElement);
            movieCardElement.append(movieOverviewElement);
            movieCardElement.append(moviePosterElement);

            movieContainer.append(movieCardElement);
        });

    }

});