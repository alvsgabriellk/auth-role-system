from utils import verificar_senha_hash
from services.token_service import gerar_token
from database import db, Usuario
from sqlalchemy import select

def autenticar_usuario(email, senha):

    usuario = db.session.execute(
        select(Usuario).where(
            Usuario.email == email
        )
    ).scalar_one_or_none()

    if not usuario:
        return {"error": "Email ou Senha incorretos."}, 400
    
    if not verificar_senha_hash(usuario.senha, senha):
        return {"error": "Email ou Senha incorretos."}, 400
    
    if usuario.verificado == False:
        return {"verificacao": "Confirme seu email antes de fazer login"}, 401
    
    token = gerar_token(usuario)
    
    return {
        "msg": "Login realizado",
        "token": token, # retorna pro frontend
        "role": usuario.role
    }, 200