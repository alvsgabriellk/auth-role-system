from utils import gerar_senha_hash
from sqlalchemy.exc import IntegrityError
from database import db, Usuario

# Responsabilidades:
# lógica, banco, validação

def usuario_criado(nome, email, senha):
    senha_hash = gerar_senha_hash(senha)

    usuario = Usuario(
        nome=nome,
        email=email,
        senha=senha_hash
    )

    try:
        db.session.add(usuario)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        return {"error": "Esse email já foi cadastrado."}, 409
    
    return {"msg": "Você foi cadastrado com sucesso!"}, 201
    
    # SEM JSONIFY, APENAS RETORNAR DADOS PUROS

