from services import email_service
from itsdangerous import URLSafeTimedSerializer
from flask import current_app
from urllib.parse import unquote



def email_controller(token):
    token = unquote(token) # decodifica o token da URL


    serializer = URLSafeTimedSerializer(current_app.config["SECRET_KEY_API"])
    try:
        email = serializer.loads(token, max_age=3600) # 1 hora de validade

    except:
        return {"error": "Token inválido"}, 400
    return email_service(email)