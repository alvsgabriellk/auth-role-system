from flask import request, jsonify
from routes import auth_bp
from controllers import register_controller
# Responsabilidades:
# request, response, jsonify, status code



@auth_bp.route("/sign-up", methods=["POST"])
def register():
    dados = request.get_json()

    resultado, status = register_controller(dados)

    return jsonify(resultado), status

   
