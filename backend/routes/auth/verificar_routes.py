from flask import jsonify, request
from routes import auth_bp
from services import verificar_token
from middlewares import token_requerido

@auth_bp.route("/verificar", methods=["GET"])
@token_requerido
def verificar():
    auth_header = request.headers.get("Authorization")
    token = auth_header.split(" ")[1]
    payload = verificar_token(token)

    return jsonify({
        "valido": True,
        "role": payload.get("role")
    }), 200