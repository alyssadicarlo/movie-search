'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let currentGenre = "Comedy";
    const searchButton = document.querySelector('#searchButton');
    const categorySection = document.querySelector('#genres');
    const mainSection = document.querySelector('.page-main');

    // Gets list of genres for side menu
    function fetchGenres() {
        fetch(
            'https://api.themoviedb.org/3/genre/movie/list?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US'
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updateGenres(data);
        });
    }

    // Updates side menu with list of genres
    function updateGenres(data) {
        const genreList = data.genres;

        genreList.forEach((genre) => {
            const genreLink = document.createElement('p');
            genreLink.id = genre.id;
            genreLink.classList.add('no-margin');
            genreLink.classList.add('genre')
            genreLink.innerText = genre.name;

            categorySection.append(genreLink);

            genreLink.addEventListener('click', () => {
                currentGenre = genre.name;
                fetchGenreMovies();
            })
        });
    }

    function fetchGenreMovies() {
        fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US'
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updateGenreSection(data);
        })
    }

    function updateGenreSection(data) {
        mainSection.innerHTML = "";
        const genreListWrapper = document.createElement('div');

        const movieList = data.results;

        const genreElements = [...document.querySelectorAll('.genre')];
        const genreElement = genreElements.find(element => element.innerText === currentGenre);
        const genreId = parseInt(genreElement.id);

        const genreTitle = document.createElement('h2');
        genreTitle.innerText = currentGenre;
        
        mainSection.append(genreTitle);

        let genreList = [];

        movieList.forEach((movie) => {
            if (movie.genre_ids.includes(genreId)) {
                genreList.push(movie);
            }
        });
        
        genreList.forEach((movie) => {
            const posterElement = document.createElement('img');
            posterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            
            genreListWrapper.append(posterElement);
        });

        mainSection.append(genreListWrapper);

    }

    function fetchPopularMovies() {
        fetch(
            'https://api.themoviedb.org/3/movie/popular?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&page=1'
        ).then((response) => {
            return response.json();
        }).then((data) => {
            updatePopularMovies(data);
        });
    }

    function updatePopularMovies(data) {
        mainSection.innerHTML = "";

        const popularListWrapper = document.createElement('div');

        const popularList = data.results;
        const title = document.createElement('h2');
        title.innerText = "Popular Movies";

        mainSection.append(title);

        popularList.forEach((movie) => {
            const posterElement = document.createElement('img');
            posterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            
            popularListWrapper.append(posterElement);
        });

        mainSection.append(popularListWrapper);
    }

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
            console.log(data);
            updateMovies(data);
        })
    }

    function updateMovies(data) {
        mainSection.innerHTML = "";
        const movieData = data.results;

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

            mainSection.append(movieCardElement);
        });

    }

    fetchGenres();
    fetchPopularMovies();

});