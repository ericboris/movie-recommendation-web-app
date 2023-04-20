document.addEventListener("DOMContentLoaded", function () {
    const movieListElement = document.getElementById("movie-list");

    movieList.forEach((movie) => {
        const movieCard = createMovieCard(movie);
        movieListElement.appendChild(movieCard);
    });
});
