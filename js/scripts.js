'use strict';

document.addEventListener("DOMContentLoaded", function () {
    let currentGenre = 35;
    let currentGenreName = "popular";
    const categorySection = document.querySelector('#genres');
    const mainSection = document.querySelector('.page-main');
    const genreListWrapper = document.createElement('div');
    const popularLink = document.querySelector('#popularLink');
    const nextPageButton = document.querySelector('#nextButton');
    const prevPageButton = document.querySelector('#prevButton');
    const currentPageElement = document.querySelector('#currentPage');
    const mobileGenreSection = document.querySelector('#genreSelect');

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
            updateMobileGenres(data);
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

    function updateMobileGenres(data) {
        const genreList = data.genres;
        const genreSelectElement = document.createElement('select');

        const placeholderOption = document.createElement('option');
        placeholderOption.value = "placeholder";
        placeholderOption.innerText = "---Select a genre---";
        placeholderOption.selected = true;
        genreSelectElement.append(placeholderOption);

        genreList.forEach((genre) => {
            const genreOption = document.createElement('option');
            genreOption.id = genre.id;
            genreOption.value = genre.name;
            genreOption.innerText = genre.name;

            genreSelectElement.append(genreOption);
        });

        mobileGenreSection.append(genreSelectElement);

        genreSelectElement.addEventListener('change', (event) => {
            currentPage = 1
            currentGenreName = event.target.value;

            const genreElements = [...document.querySelectorAll('.genre')];
            const genreElement = genreElements.find(element => element.innerText.toLowerCase() === currentGenreName.toLowerCase());
            const genreId = parseInt(genreElement.id);
            currentGenre = genreId;

            fetchGenreMovies();
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
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const posterElement = document.createElement('img');
            const titleElement = document.createElement('span');

            posterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            titleElement.innerText = movie.title;

            movieCard.append(posterElement);
            movieCard.append(titleElement);

            genreListWrapper.append(movieCard);
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
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');

            const posterElement = document.createElement('img');
            const titleElement = document.createElement('span');

            posterElement.src = `http://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            titleElement.innerText = movie.title;

            movieCard.append(posterElement);
            movieCard.append(titleElement);

            popularListWrapper.append(movieCard);
        });

        mainSection.append(popularListWrapper);
    }

    popularLink.addEventListener('click', () => {
        currentGenreName = "popular";
        currentPage = 1
        fetchPopularMovies();
    });

    nextPageButton.addEventListener('click', () => {
        if (currentGenreName === "popular") {
            currentPage += 1;
            fetchPopularMovies();
        } else {
            currentPage += 1;
            fetchGenreMovies();
        }
    });

    prevPageButton.addEventListener('click', () => {
        if (currentGenreName === "popular") {
            currentPage -= 1
            fetchPopularMovies();
        } else {
            currentPage -= 1
            fetchGenreMovies();
        }
    });

    fetchGenres();
    fetchPopularMovies();
    updateCurrentPage();

});