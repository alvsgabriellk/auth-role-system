export function validarSenha (senha) {
    return { 
        // TA CRIANDO UMA VARIAVEL PRA RETORNAR VALORES TRUE OU FALSE
        // NAO TA TRAZENDO VARIAVEIS DE PAGES NAO
    min: senha.length >= 8,
    maius: /[A-Z]/.test(senha),
    minus: /[a-z]/.test(senha),
    numero: /[0-9]/.test(senha),
    simbolo: /[^A-Za-z0-9]/.test(senha)
    };
};

export function validarEmail (email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
};

export function validarNome (nome) {
    return nome !== "" && nome.length > 3;
};