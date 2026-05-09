from flask import Flask
from flask_cors import CORS
from database import db
import os
from config import DesenvolvimentoConfig, ProducaoConfig
from routes import auth_bp

app = Flask(__name__)

ENV = os.getenv("ENV", "local") # lá vai ta production, e aqui local

if ENV == "production":
    app.config.from_object(ProducaoConfig) # carregando dados de producao
else:
    app.config.from_object(DesenvolvimentoConfig) # carregando dados de desenvolvimento

CORS(app, origins=app.config["CORS_ORIGINS"]) # faz o back aceitar o front e o front acessar a api


db.init_app(app)

app.register_blueprint(auth_bp, url_prefix="/auth")

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=app.config.get("DEBUG"))