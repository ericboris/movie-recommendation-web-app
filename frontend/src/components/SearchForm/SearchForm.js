document.getElementById('search-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the search query
    const searchQuery = document.getElementById('search-query').value;

    // Perform movie search (e.g. call API, render search results)
    console.log(`Search query: ${searchQuery}`);
    window.location.href = "movie_list.html";
});
