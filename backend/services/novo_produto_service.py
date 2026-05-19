from database import db, Produto
from utils import definir_status
from sqlalchemy.exc import IntegrityError 

def adicionar_produto(nome, descricao, preco, estoque, categoria):
    status = definir_status(estoque)
    produto = Produto(
        nome=nome,
        descricao=descricao,
        preco=preco,
        estoque=estoque,
        categoria=categoria,
        status=status
    )

    try:
        db.session.add(produto)
        db.session.commit()
    except IntegrityError:
        db.session.rollback()
        
        return {"error": "Esse produto já existe!"}, 409
    
    return {"msg": "Produto adicionado!"}, 201