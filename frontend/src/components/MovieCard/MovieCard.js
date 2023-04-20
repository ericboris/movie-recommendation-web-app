function createMovieCard(movie) {
    const movieCard = document.createElement("div");
    movieCard.className = "movie-card";

    const title = document.createElement("h2");
    title.textContent = movie.title;
    movieCard.appendChild(title);

    const releaseDate = document.createElement("p");
    releaseDate.textContent = `Release Date: ${movie.releaseDate}`;
    movieCard.appendChild(releaseDate);

    const description = document.createElement("p");
    description.textContent = movie.description;
    movieCard.appendChild(description);

    return movieCard;
}
