from database import db, Usuario
from sqlalchemy import select

def email_service(email):
    usuario = db.session.execute(
        select(Usuario).where(
            Usuario.email == email
        )
    ).scalar_one_or_none()

    if not usuario:
        return {"error": "Usuário não encontrado"}, 404
    
    usuario.verificado = True
    db.session.commit()
    return {"msg": "Conta confirmada"}, 200