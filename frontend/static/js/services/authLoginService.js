export async function autenticarUsuario(usuario) {

    try {
    const res = await fetch("http://127.0.0.1:5000/auth/sign-in", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)
    });

    const dados = await res.json();

    if (dados.verificacao) {
        return {
            sucesso: false,
            verificacaoMsg: dados.verificacao
        };
    } else if (!res.ok) {
        return {
            sucesso: false,
            msg: dados.error
        };
    }

    localStorage.setItem("token", dados.token)

    return {
        sucesso: true,
        dados
    };

    } catch (error) {
        throw new Error("Erro interno no servidor!");
    }
}