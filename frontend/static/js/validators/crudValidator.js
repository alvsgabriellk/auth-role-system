export function ValidarNome (nome) {
    return nome.trim().length >= 3;
}

export function ValidarDescricao (descricao) {
    return descricao.trim().length >= 10;
}

export function ValidarPreco (preco) {
    return preco > 0;
}

export function ValidarEstoque (estoque) {
    return estoque >= 0;
}

export function ValidarCategoria (categoria) {
    return categoria.trim().length >= 3;
}

export function ValidarBuscar (produto) {
    const valor = produto.trim();

    if (valor.length === 0) {
        return false;
    }

    // se for number
    if (!isNaN(valor)) {
        return Number(valor) > 0;
    }

    // se for string
    return valor.length >= 3;
}

export function ValidarID (id) {
    return id.length > 0;
}
