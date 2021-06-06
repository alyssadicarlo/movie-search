'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let currentGenre = 35;
    let currentGenreName = "popular";
    const searchButton = document.querySelector('#searchButton');
    const categorySection = document.querySelector('#genres');
    const mainSection = document.querySelector('.page-main');
    const genreListWrapper = document.createElement('div');
    const popularLink = document.querySelector('#popularLink');
    const nextPageButton = document.querySelector('#nextButton');
    const prevPageButton = document.querySelector('#prevButton');
    const currentPageElement = document.querySelector('#currentPage');

    let currentPage = 1;
    let numberOfPages = 25;

    function updateCurrentPage() {
        currentPageElement.innerText = currentPage;
    }
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
                currentPage = 1
                currentGenreName = genre.name;
                const genreElements = [...document.querySelectorAll('.genre')];
                const genreElement = genreElements.find(element => element.innerText.toLowerCase() === currentGenreName.toLowerCase());
                
                genreElements.forEach((element) => {
                    element.classList.remove('active');
                });
                genreElement.classList.add('active');
                
                const genreId = parseInt(genreElement.id);
                currentGenre = genreId;
                fetchGenreMovies();
            })
        });
    }

    function fetchGenreMovies() {
        updateCurrentPage();

        fetch(
            `https://api.themoviedb.org/3/discover/movie?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${currentPage}&with_genres=${currentGenre}&with_watch_monetization_types=flatrate`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            numberOfPages = data.total_pages;
            updateGenreSection(data);
            // update pagination
        })
    }

    function updateGenreSection(data) {
        mainSection.innerHTML = "";
        genreListWrapper.innerHTML = "";

        const genreTitle = document.createElement('h1');
        genreTitle.innerText =`Popular ${currentGenreName} Movies`;
        mainSection.append(genreTitle);

        const genreList = data.results;
        
        genreList.forEach((movie) => {
            const posterElement = document.createElement('img');
            posterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            
            genreListWrapper.append(posterElement);
        });

        mainSection.append(genreListWrapper);

    }

    function fetchPopularMovies() {
        updateCurrentPage();

        fetch(
            `https://api.themoviedb.org/3/movie/popular?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&page=${currentPage}`
        ).then((response) => {
            return response.json();
        }).then((data) => {
            numberOfPages = data.total_pages;
            updatePopularMovies(data);
        });
    }

    function updatePopularMovies(data) {
        mainSection.innerHTML = "";

        const popularListWrapper = document.createElement('div');

        const popularList = data.results;
        const title = document.createElement('h1');
        title.innerText = "All Popular Movies";

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
            updateMovies(data);
        });
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

    popularLink.addEventListener('click', () => {
        currentGenreName = "popular";
        currentPage = 1
        fetchPopularMovies();
    });

    nextPageButton.addEventListener('click', () => {
        console.log('clicked');
        if (currentGenreName === "popular") {
            currentPage += 1;
            fetchPopularMovies();
        } else {
            currentPage += 1;
            fetchGenreMovies();
        }
    });

    fetchGenres();
    fetchPopularMovies();
    updateCurrentPage();

});