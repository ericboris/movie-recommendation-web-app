document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform login logic (e.g. call API, validate user, redirect)
    console.log(`Email: ${email}, Password: ${password}`);
    window.location.href = "search.html";
});
