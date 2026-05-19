from database import Produto
from database import db
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError 

def adicionar_produto(nome, descricao, preco, estoque, categoria):
    produto = Produto(
        nome=nome,
        descricao=descricao,
        preco=preco,
        estoque=estoque,
        categoria=categoria
    )

    try:
        db.session.add(produto)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        
        return {"error": "Esse produto já existe!"}, 409
    
    return {"msg": "Produto adicionado!"}, 201