Frontend (React) Components:                                                                          
                                                                                                      
App component: Main application container, handling routing and authentication, and rendering child components based on user actions and application state. Props: None
                                                                                                      
ConnectWallet component:                                                                              
Manages user connection and disconnection of MetaMask wallet, retrieves the wallet address, and communicates with the API Gateway for authentication.
Props:                                                                                                
onConnect: PropTypes.func.isRequired (callback function executed after successful connection)         
onDisconnect: PropTypes.func.isRequired (callback function executed after successful disconnection)
                                                                                                      
UserProfile component:                                                                                
Displays user wallet address. Communicates with the API Gateway for any profile updates.              
Props:                                                                                                
user: PropTypes.shape({                                                                               
address: PropTypes.string.isRequired,                                                                 
}).isRequired (connected user object)                                                                 
                                                                                                      
MovieSearch component:                                                                                
Allows users to search for movies by title or keywords, captures user input, and communicates with the MovieService to fetch search results.
Props:                                                                                                
onSearch: PropTypes.func.isRequired (callback function executed after successful movie search)        
                                                                                                      
MovieList component:                                                                                  
Displays a list of MovieCards based on search results, user ratings, or recommendations.              
Props:                                                                                                
movies: PropTypes.arrayOf(                                                                            
PropTypes.shape({                                                                                     
id: PropTypes.number.isRequired,                                                                      
title: PropTypes.string.isRequired,                                                                   
poster: PropTypes.string,                                                                             
releaseDate: PropTypes.string,                                                                        
}),                                                                                                   
).isRequired (array of movie objects)                                                                 
onSelectMovie: PropTypes.func.isRequired (callback function executed when a movie is selected)        
                                                                                                      
MovieCard component:                                                                                  
Presents brief information for individual movies, including the movie poster, title, and release date.
Handles user interaction for rating a movie with 5 stars and communicates with the API Gateway for storing and retrieving user ratings.
Handles user interaction for selecting a movie for more details and presenting a MovieDetails component as a pop-up window.
Props:                                                                                                
movie: PropTypes.shape({                                                                              
id: PropTypes.number.isRequired,                                                                      
title: PropTypes.string.isRequired,                                                                   
poster: PropTypes.string,                                                                             
releaseDate: PropTypes.string,                                                                        
description: PropTypes.string,                                                                        
director: PropTypes.string,                                                                           
actors: PropTypes.arrayOf(PropTypes.string),                                                          
}).isRequired (movie object)                                                                          
onSelect: PropTypes.func.isRequired (callback function executed when the movie card is selected)   
onRate: PropTypes.func.isRequired (callback function executed when the movie is rated)                
                                          
