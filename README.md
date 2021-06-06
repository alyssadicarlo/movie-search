<h1 align="center">Movie Search Tool</h1>

<img align="center" width=100 src="https://raw.githubusercontent.com/alyssadicarlo/movie-search/main/video-player.svg">

<hr>
<br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/8296891c-0343-42c1-aa8a-98a1e047b9ec/deploy-status)](https://app.netlify.com/sites/movie-search-326/deploys)
![Netlify Status](https://img.shields.io/github/languages/count/alyssadicarlo/movie-search)

<br>

Web app using the TMDB API. Live site can be viewed at [movie-search-326.netlify.app](https://movie-search-326.netlify.app/).

## Example Request

```javascript

function fetchMovie(movie) {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=7dcf5fae32cc6d8cf133c74050d42657&language=en-US&query=${movie}&page=1&include_adult=false`
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateMovies(data);
        });
    }

```

## Features

- [x] View popular movies
- [ ] View now showing movies
- [ ] View upcoming movies
- [x] Filter movies by genre
- [ ] View movie details
- [ ] Rate movie