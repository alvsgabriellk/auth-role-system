from flask import request, jsonify
from routes import auth_bp
from controllers import registrando_usuario
# Responsabilidades:
# request, response, jsonify, status code



@auth_bp.route("/sign-up", methods=["POST"])
def novo_cadastro():
    dados = request.get_json()

    resultado, status = registrando_usuario(dados)

    return jsonify(resultado), status

   
