from utils import verificar_senha_hash
from services.token_service import gerar_token
from database import db, Usuario
from sqlalchemy import select

def autenticar_usuario(email, senha):
    senha_hash = verificar_senha_hash(senha)

    usuario = db.session.execute(
        select(Usuario).where(
            Usuario.email == email
        )
    ).scalar_one_or_none()

    if not usuario:
        return {"error": "Usuário não encontrado"}, 404
    
    if not verificar_senha_hash(senha_hash, usuario.senha):
        return {"error": "Senha incorreta"}, 400
    
    token = gerar_token(usuario)
    
    return {
        "msg": "Login realizado",
        "token": token, # retorna pro frontend
        "role": usuario.role
    }, 200