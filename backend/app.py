from flask import Flask, request, jsonify, redirect, url_for
from flask_cors import CORS
from database import db
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5500"]) # faz o back aceitar o front e o front acessar a api

app.secret_key = os.getenv("SECRET_KEY_API")

ENV = os.getenv("ENV", "local") # se nao achar chave env, aceita default(local)

if ENV == "production": # no servidor de deploy terá la ENV=production
    DATABASE_URL = os.getenv("DATABASE_URL")
    app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL
    app.config["SQLALCHEMY_ENGINE_OPTIONS"] = {
        "connect_args": {"sslmode": "require"}
    }
else:
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///banco.db"

db.init_app(app)

if __name__ == "__main__":
    app.run(debug=True)