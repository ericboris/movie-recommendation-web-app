Backend (Flask) Components:
    API Gateway:
        Handle incoming requests from the frontend.
        Manage authentication and authorization using a middleware, such as Flask-Login or JWT tokens.
        Route requests to appropriate backend services using Flask's decorators and functions.

        Endpoints:
            POST /auth/login (login)
            POST /auth/signup (register)
            GET /profile/:id (fetch user profile)
            PUT /profile/:id (update user profile)
            GET /movies/search (search movies)
            GET /movies/:id (fetch movie details)
            POST /movies/:id/rating (rate movie)
            PUT /movies/:id/rating (update movie rating)
            DELETE /movies/:id/rating (delete movie rating)
            POST /movies/:id/review (submit movie review)
            PUT /movies/:id/review (update movie review)
            DELETE /movies/:id/review (delete movie review)
            GET /recommendations (fetch personalized movie recommendations)

    UserService:
        Implement user registration, authentication, and profile management (CRUD operations).
        Interact with the Users table in the database using an ORM (e.g., SQLAlchemy).
        Securely store user passwords using a proper hashing library (e.g., bcrypt).

        Interface:
            createUser(email: str, password: str) -> int
            authenticateUser(email: str, password: str) -> dict
            getUserProfile(userId: int) -> dict
            updateUserProfile(userId: int, data: dict) -> dict


    MovieService:
        Fetch movie information and search results from the public movie API.
        Provide API endpoints for searching movies and retrieving movie details.
        Interact with the public movie API using an HTTP library (e.g., requests).
        Cache frequently accessed movie information to improve performance.

        Interface:
            searchMovies(query: str, page: int) -> list
            getMovieDetails(movieId: int) -> dict

    RatingService:
        Manage user movie ratings and reviews (CRUD operations).
        Interact with the MovieRatings and MovieReviews tables in the database using an ORM (e.g., SQLAlchemy).

        Interface:
            createRating(userId: int, movieId: int, rating: float) -> None
            updateRating(userId: int, movieId: int, rating: float) -> None
            deleteRating(userId: int, movieId: int) -> None
            createReview(userId: int, movieId: int, review: str) -> None
            updateReview(userId: int, movieId: int, review: str) -> None
            deleteReview(userId: int, movieId: int) -> None

    RecommendationService:
        Generate personalized movie recommendations based on user preferences (e.g., movie ratings).
        Provide API endpoints for fetching personalized recommendations.
        Implement custom algorithms or use existing recommendation libraries (e.g., LightFM, Surprise) to generate recommendations.

        Interface:
            getRecommendations(userId: int, limit: int) -> list


Database (MySQL) Components:

    Users table:
        Store user profile information, including email, password, and user ID.
        Utilize proper indexing and constraints (e.g., unique email constraint, primary key for user ID).
        Ensure secure password storage using proper hashing techniques.

        Fields:
            id: INT, AUTO_INCREMENT, PRIMARY KEY
            email: VARCHAR(255), UNIQUE, NOT NULL
            password: VARCHAR(255), NOT NULL
            created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
            updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP

    MovieRatings table:
        Store user movie ratings, including user ID, movie ID, and rating.
        Utilize proper indexing and constraints (e.g., primary key, foreign keys for user ID and movie ID).
        Ensure one rating per movie per user with appropriate constraints (e.g., unique composite key of user ID and movie ID).

        Fields:
            id: INT, AUTO_INCREMENT, PRIMARY KEY
            user_id: INT, FOREIGN KEY REFERENCES Users(id), NOT NULL
            movie_id: INT, NOT NULL
            rating: FLOAT, NOT NULL, CHECK (rating >= 0 AND rating <= 5)
            created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
            updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP
            UNIQUE KEY (user_id, movie_id)

    MovieReviews table:
        Store user movie reviews, including user ID, movie ID, and review text.
        Utilize proper indexing and constraints (e.g., primary key, foreign keys for user ID and movie ID).
        Ensure one review per movie per user with appropriate constraints (e.g., unique composite key of user ID and movie ID).

        Fields:
            id: INT, AUTO_INCREMENT, PRIMARY KEY
            user_id: INT, FOREIGN KEY REFERENCES Users(id), NOT NULL
            movie_id: INT, NOT NULL
            review: TEXT, NOT NULL
            created_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP
            updated_at: TIMESTAMP, DEFAULT CURRENT_TIMESTAMP, ON UPDATE CURRENT_TIMESTAMP
            UNIQUE KEY (user_id, movie_id)

