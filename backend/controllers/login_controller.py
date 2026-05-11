from services import autenticar_usuario

def login_controller(dados):
    email = dados["email"]
    senha = dados["senha"]

    return autenticar_usuario(email, senha)