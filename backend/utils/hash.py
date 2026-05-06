from werkzeug.security import generate_password_hash, check_password_hash

def gerar_senha_hash(senha):
    return generate_password_hash(senha)

def verificar_senha_hash(senha, senha_registrada):
    return check_password_hash(senha, senha_registrada)