from services import adicionar_produto

def novo_produto_controller(dados):
    nome = dados["nome"]
    descricao = dados["descricao"]
    preco = dados["preco"]
    estoque = dados["estoque"]
    categoria = dados["categoria"]

    return adicionar_produto(nome, descricao, preco, estoque, categoria)