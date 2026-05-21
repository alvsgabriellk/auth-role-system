from flask import request, jsonify
from routes import crud_bp
from controllers import novo_produto_controller

@crud_bp.route("/novo-produto", methods=["POST"])
def novo_produto():
    dados = request.get_json()

    resultado, status = novo_produto_controller(dados)

    return jsonify(resultado), status