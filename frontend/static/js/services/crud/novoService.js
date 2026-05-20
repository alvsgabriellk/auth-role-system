export async function NovoProduto (produto) {

    try {
        const token = localStorage.getItem("token");
        
        const res = await fetch("http://127.0.0.1:5000/crud/novo-produto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(produto)
        });

        const dados = await res.json();

        if (!res.ok) {
            return {
                sucesso: false,
                msg: dados.error
            };
        }

        return {
            sucesso: true,
            dados
        };
    } catch (error) {
        throw new Error("Erro interno no servidor!");
    }
}