from flask import Blueprint

auth_bp = Blueprint("auth", __name__, url_prefix="/auth")
crud_bp = Blueprint("crud", __name__, url_prefix="/crud")

from .auth import ( 
    login_routes,
    register_routes,
    email_routes,
    verificar_routes
)

from .crud import (
    novo_routes
)