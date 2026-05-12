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

    if (res.status == 401) {
        return {
            sucesso: false
        };
    }

    if (!res.ok) {
        throw new Error("Erro interno no servidor!");
    }

    localStorage.setItem("token", dados.token);

    return {
        sucesso: true,
        dados
    };
    } catch (error) {
        throw new Error("Erro interno no servidor!");

    }
}