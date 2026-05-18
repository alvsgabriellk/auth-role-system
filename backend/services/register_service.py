from utils import gerar_senha_hash
from sqlalchemy.exc import IntegrityError
from database import db, Usuario
import requests
from flask import current_app
from dotenv import load_dotenv
import os
from itsdangerous import URLSafeTimedSerializer # gerar e valida token
from urllib.parse import quote # encoda token antes de colocar na url

load_dotenv()

# Responsabilidades:
# lógica, banco, validação

ResendKey = os.getenv("RESEND_KEY")


def enviar_email(email, link):
    
    response = requests.post(
        "https://api.resend.com/emails",

        headers={
            "Authorization": f"Bearer {ResendKey}"
        },

        json={
            "from": "onboarding@resend.dev",
            "to": email,
            "subject": "Confirme a sua conta",

            "html": f"""
                <h1> Conta criada! </h1>
                <p> Verifique se foi você que se cadastrou </p>
                <a href="{link}">
                    Confirmar conta
                </a>
            """
        }
    )

# Responsabilidades:
# lógica, banco, validação

def registrar_usuario(nome, email, senha):
    #  cria um objeto pra usar minha chave e gerar/ler tokens
    # só é criado quando a função é chamada
    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY_API"])

    senha_hash = gerar_senha_hash(senha)

    usuario = Usuario(
        nome=nome,
        email=email,
        senha=senha_hash
    )

    try:
        db.session.add(usuario)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return {"error": "Esse email já foi cadastrado."}, 409
    
    token = serializer.dumps(email)
    token_encoded = quote(token, safe="") # codifica os pontos e caract especias

    link_confirmação = f"http://127.0.0.1:5000/auth/verificar-email/{token_encoded}"

    enviar_email(email, link_confirmação)
    return {"msg": "Você foi cadastrado com sucesso!"}, 201
    
    # SEM JSONIFY, APENAS RETORNAR DADOS PUROS

