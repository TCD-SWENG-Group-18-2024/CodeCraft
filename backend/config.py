from dotenv import load_dotenv
import os

load_dotenv()


class ApplicationConfig:
    # You need to add FLASK_DB_KEY to your .env file as well
    SECRET_KEY = os.getenv("FLASK_DB_KEY")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///database.db'
