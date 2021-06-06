<div style="text-align: center">
    <img width=100 src="https://raw.githubusercontent.com/alyssadicarlo/movie-search/main/video-player.svg">
    <h1>Movie Search</h1>
</div>
<br>

[![Netlify Status](https://api.netlify.com/api/v1/badges/8296891c-0343-42c1-aa8a-98a1e047b9ec/deploy-status)](https://app.netlify.com/sites/movie-search-326/deploys)

<br>

Web app using the TMDB API. Live site can be viewed at [movie-search-326.netlify.app](https://movie-search-326.netlify.app/).

## Example Request

```javascript

function fetchMovie(movie) {
        fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&language=en-US&query=${movie}&page=1&include_adult=false`
        ).then(function (response) {
            return response.json();
        }).then(function (data) {
            updateMovies(data);
        });
    }

```

## Features

- [x] Responsive
- [x] View popular movies
- [ ] View now showing movies
- [ ] View upcoming movies
- [x] Filter movies by genre
- [ ] View movie details
- [ ] Rate movie