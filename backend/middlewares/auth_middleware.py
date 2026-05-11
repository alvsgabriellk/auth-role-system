from functools import wraps
from flask import request, jsonify
from services.token_service import verificar_token

# protege rota se nao tiver o token
def token_requerido(f):
    @wraps(f) # preserva infomações da func (nome por exemplo)
    def decorated(*args, **kwargs):
        auth_header = request.headers.get("Authorization") # pega o Bearer + token

        if not auth_header:
            return {"error": "Token ausente"}, 401
        
        token = auth_header.split(" ")[1] # separa bearer de token

        payload = verificar_token(token)

        if not payload:
            return {"error": "Token inválido"}, 401
        
        return f(*args, **kwargs)
    return decorated

