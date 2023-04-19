Frontend (React) Components:

    App component: 
        Serves as the main application container, handling routing and authentication, and rendering child components based on user actions and application state.

        Props: None

    LoginForm component: 
        Manages user login by capturing user input, handling form validation, and communicating with the UserService for authentication.

        Props:
            onLogin: PropTypes.func.isRequired (callback function executed after successful login)

    SignupForm component: 
        Manages user registration by capturing user input, handling form validation, and communicating with the UserService for creating new user profiles.

        Props:
            onSignup: PropTypes.func.isRequired (callback function executed after successful registration)

    UserProfile component: 
        Displays user profile information, including a list of movies the user has rated and reviewed, and communicates with the UserService for any profile updates.

        Props:
            user: PropTypes.shape({
                id: PropTypes.number.isRequired,
                email: PropTypes.string.isRequired,
            }).isRequired (logged-in user object)

    MovieSearch component: 
        Allows users to search for movies by title or keywords, captures user input, and communicates with the MovieService to fetch search results.

        Props:
            onSearch: PropTypes.func.isRequired (callback function executed after successful movie search)

    MovieList component: 
        Displays a list of movies based on search results, user ratings, or recommendations, and manages navigation to the MovieDetails component for individual movies.

        Props:
            movies: PropTypes.arrayOf(
                PropTypes.shape({
                    id: PropTypes.number.isRequired,
                    title: PropTypes.string.isRequired,
                    poster: PropTypes.string,
                    description: PropTypes.string,
                }),
            ).isRequired (array of movie objects)

            onSelectMovie: PropTypes.func.isRequired (callback function executed when a movie is selected)

    MovieCard component: 
        Presents brief information for individual movies, including the movie poster, title, and short description, and handles user interaction for selecting a movie.

        Props:
            movie: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                poster: PropTypes.string,
                description: PropTypes.string,
            }).isRequired (movie object)

            onSelect: PropTypes.func.isRequired (callback function executed when the movie card is selected)

    MovieDetails component: 
        Displays detailed information about a selected movie, allows users to rate and review the movie, and communicates with the RatingService for storing and retrieving user ratings and reviews.

        Props:
            movie: PropTypes.shape({
                id: PropTypes.number.isRequired,
                title: PropTypes.string.isRequired,
                poster: PropTypes.string,
                description: PropTypes.string,
                director: PropTypes.string,
                actors: PropTypes.arrayOf(PropTypes.string),
                releaseDate: PropTypes.string,
            }).isRequired (movie object)

            onRate: PropTypes.func.isRequired (callback function executed after user rates the movie)

            onReview: PropTypes.func.isRequired (callback function executed after user reviews the movie)
