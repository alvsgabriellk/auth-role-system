import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    SECRET_KEY_API = os.getenv("SECRET_KEY_API")
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class DesenvolvimentoConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///banco.db"
    CORS_ORIGINS = ["http://127.0.0.1:5500"]


class ProducaoConfig(Config):
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URL")
    SQLALCHEMY_ENGINE_OPTIONS = {
        "connect_args": {"sslmode": "require"}
    }
    CORS_ORIGINS = [os.getenv("WEB_URL")]


# current_app.config[""] / ler config de qualquer arquivo, rutes, services
# ex: secret_key = current_app.config["SECRET_KEY_API"]