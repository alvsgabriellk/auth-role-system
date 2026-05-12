export async function cadastrarUsuario(usuario) {
        // momento que sai do navegador e vai pra a api
        const res = await fetch("http://127.0.0.1:5000/auth/sign-up", {  // fetch = promisse
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(usuario)
        });

        const dados = await res.json(); // se retornar uma resposta(resolve)

        return {
            ok: res.ok,
            dados
        };
}





