from flask import request, jsonify
from routes import auth_bp
from controllers import email_controller

@auth_bp.route("/verificar-email/<path:token>", methods=["GET"])
def verificar_email(token):
    resposta, status = email_controller(token)

    return jsonify(resposta), status    
    