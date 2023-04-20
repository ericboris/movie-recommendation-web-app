document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the form values
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
    }

    // Perform signup logic (e.g. call API, create user, redirect)
    console.log(`Username: ${username}, Email: ${email}, Password: ${password}`);
});
