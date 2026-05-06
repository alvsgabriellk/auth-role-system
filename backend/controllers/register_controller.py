# CONTROLLER LIDA COM REQUISIÇÃO.
# ENTRADA E SAIDA

from services import usuario_criado

def registrando_usuario(dados): # ENTRADA DOS DADOS DA REQUISIÇÃO
    nome = dados["nome"]
    email = dados["email"]
    senha = dados["senha"]

    return usuario_criado(nome, email, senha) # SAIDA DOS DADOS JÁ COM A LÓGICA