# Welcome

## Sprint 1: Project Setup and Basic Structure

### Project repository created and version control set up (e.g., Git).
1. I created a new project directory in the terminal.
```shell 
mkdir movie_recommendation_app && cd movie_recommendation_app
```

2. In the project directory I created the initial folder hierarchy.
```shell
mkdir -p frontend/public frontend/src/components frontend/src/services
```
```shell
mkdir -p backend/app/models backend/app/services backend/app/utils backend/migrations backend/tests
```

3. I added a README to the project directory.
```shell
touch README.md
```

4. I installed and configured the project to use MkDocs.
```shell
pip3 install mkdocs
```
```shell
mkdocs new .
```

### Development environment configured with necessary tools and libraries.
1. I installed Node.js and npm from https://nodejs.org/en/ and verified with 
```shell
node -v
```
```shell
npm -v
```

2. I installed and verified React and React-Router.
```shell
npm install react react-dom react-router-dom
```
```shell
npx create-react-app new_app && cd new_app && npm start
```

3. I installed MySQL Community Server from https://www.mysql.com/downloads/. Initial verification with ```mysql -V``` failed and I had to add mysql to my path.
```shell
vim ~/.zshrc
```
```shell
export PATH=$PATH:/usr/local/mysql/bin/
``` 
I verified that the server was running.
```shell
mysql -u root -p
``` 
In the server at the prompt I created a new username and password. 
```sql
CREATE USER 'new_user'@'localhost' IDENTIFIED BY 'new_password';
``` 
I created a new database.
```sql
CREATE DATABASE db_name;
```
I granted privileges to new_user to db_name.
```sql
GRANT ALL PRIVILEGES ON db_name.* TO 'new_user'@'localhost';
```
I applied the changes.
```sql
FLUSH PRIVILEGES;
```
And I exited the server.
```sql
EXIT;
```

4. I installed PyMySQL.
```shell 
python3 -m pip install PyMySQL
```

5. I installed Flask, Flask-SQLAlchemy, and Flask-CORS.
```shell 
pip3 install Flask Flask-SQLAlchemy Flask-CORS
``` 
And made a sample app to verify the installations.
```shell 
mkdir flask_test_app && cd flask_test_app & touch app.py
``` 
In app.py I wrote:
```py
    from flask import Flask                                                                               
    from flask_sqlalchemy import SQLAlchemy                                                               
    from flask_cors import CORS                                                                           
    import pymysql                                                                                        
                                                                                                          
    app = Flask(__name__)                                                                                 
    CORS(app)                                                                                             
                                                                                                          
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://user_name:password@localhost/db_name'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False                                                  
    db = SQLAlchemy(app)                                                                                  
                                                                                                          
    @app.route("/")                                                                                       
    def home():                                                                                           
        return "Hello World"                                                                              
                                                                                                          
    if __name__ == "__main__":                                                                            
        app.run(debug=True) 
```
I replaced user_name, password, and db_name with the user name, password, and database name that I chose when I created the user and database in the SQL prompt.<br>
I verified that the Flask installations were working.
```shell
python3 app.py
```

### Basic structure and layout of the web application created using HTML, CSS, and JavaScript.
* I blocked out the basic structure of the site in HTML. 
* I connected basic javascript functionality to the html pages.
* Design is low priority so I'll do CSS later. 

### Simple static movie list for testing purposes integrated.
* I created ```staticMovieList.js``` in ```frontend/src/```. It contains a list of movie-objects of the form ```{id:int, title:str, releaseDate:str, description:str}```.
* I updated ```movie_list.html``` to load ```staticMovieList.js```, ```MovieCard.js```, and ```MovieList.js``` using script tags.
* I added an event listener to ```MovieList.js``` to get the movie list from ```movie_list.html```, pass the content of each movie to ```MovieCard.html``` to be rendered in html, and append the rendered html into the movie list html element.
* I updated ```MovieCard.js``` to receive a movie object and return it rendered as html.



