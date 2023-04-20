document.querySelector("#login-form form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Handle login form submission
    console.log("Login form submitted");
});

document.querySelector("#movie-search form").addEventListener("submit", function(event) {
    event.preventDefault();
    // Handle movie search form submission
    console.log("Movie search form submitted");
});
