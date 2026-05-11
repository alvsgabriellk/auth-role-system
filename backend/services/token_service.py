import jwt
from datetime import datetime, timedelta
from flask import current_app # pega a secret key

def gerar_token(usuario):
    payload = { # mochila de informações que vai dentro do token
        "user_id": usuario.id,
        "role": usuario.role, # nivel de autorização / ex: user ou admin
        "exp": datetime.utcnow() + timedelta(minutes=3) # tempo de expiração
    }

    token = jwt.encode( # criando token
        payload,
        current_app.config["SECRET_KEY_API"], # chave pra criar e validar
        algorithm="HS256"
    )

    return token

def verificar_token(token):
    try:
        payload = jwt.decode(
            token,
            current_app.config["SECRET_KEY_API"],
            algorithms=["HS256"]
        )

        return payload # se o token for valido, retorna dados do usuario com as permissoes
    
    except jwt.ExpiredSignatureError:
        return None
    
    except jwt.InvalidTokenError:
        return None