from flask import Flask
from flask_cors import CORS
from .config import Config
from .database import db
from .api import api_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    CORS(app)

    db.init_app(app)

    app.register_blueprint(api_bp, url_prefix='/api')

    app.config['MAX_CONTENT_LENGTH'] = 1 * 1024 * 1024

    return app
