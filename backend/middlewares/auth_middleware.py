from functools import wraps
from flask import request
from services.token_service import verificar_token
import jwt

# TRATAMENTO DOS ERROS
# É ONDE OS ERROS SERÃO LANÇADOS PARA O SITE RECONHECER O ERRO

# protege rota se nao tiver o token
def token_requerido(f):
    @wraps(f) # preserva infomações da func (nome por exemplo)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization") # pega o Bearer + token

        if not auth_header:
            return {"error": "Token ausente"}, 401
        
        try:
            token = auth_header.split(" ")[1] # separa bearer de token

            payload = verificar_token(token)

        except jwt.ExpiredSignatureError:
            return {"error": "Token expirado"}, 401

        except jwt.InvalidTokenError:
            return {"error": "Token inválido"}, 401
        
        return f(*args, **kwargs)
    return decorated

def admin_requerido(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization")
        
        token = auth_header.split(" ")[1]

        payload = verificar_token(token)

        if payload.get("role") != "admin": # melhor assim que volta none doq ["role"]
            return {"error": "Acesso negado"}, 403
        
        return f(*args, **kwargs)
    return decorated