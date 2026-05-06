from flask import Blueprint, request, jsonify
from controllers import registrando_usuario


register_bp = Blueprint("register", __name__)

@register_bp.route("/sign-up", methods=["POST"])
def novo_cadastro():
    dados = request.get_json()

    resultado, status = registrando_usuario(dados)

    return jsonify(resultado), status

   
