# CONTROLLER LIDA COM REQUISIÇÃO.
# ENTRADA E SAIDA

from services import registrar_usuario

def register_controller(dados): # ENTRADA DOS DADOS DA REQUISIÇÃO
    nome = dados["nome"]
    email = dados["email"]
    senha = dados["senha"]

    return registrar_usuario(nome, email, senha) # SAIDA DOS DADOS JÁ COM A LÓGICA