from flask import request, jsonify
from routes import auth_bp
from controllers import login_controller

@auth_bp.route("/sign-in", methods=["POST"])
def login():
    dados = request.get_json()

    resultado, status = login_controller(dados)

    return jsonify(resultado), status