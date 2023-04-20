// Fetch movie details and display them (e.g. call API, render movie details)

document.getElementById('rating-review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const rating = document.getElementById('rating').value;
    const review = document.getElementById('review').value;

    // Perform rating and review submission (e.g. call API, save rating and review)
    console.log(`Rating: ${rating}, Review: ${review}`);
});
