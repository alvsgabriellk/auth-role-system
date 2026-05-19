def definir_status(estoque):
    if estoque == 0:
        return "Inativo"
    
    elif estoque <= 15:
        return "Estoque baixo"
    
    return "Ativo"