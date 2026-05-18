from utils import gerar_senha_hash
from sqlalchemy.exc import IntegrityError
from database import db, Usuario
import requests
from dotenv import load_dotenv
import os

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
    
    return {"msg": "Você foi cadastrado com sucesso!"}, 201
    
    # SEM JSONIFY, APENAS RETORNAR DADOS PUROS

