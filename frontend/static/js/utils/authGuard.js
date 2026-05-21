export async function authGuard({ adminRequerido = false } = {}) {
    const token = localStorage.getItem("token");

    if (!token) {
        sessionStorage.setItem("authAlerta", "Sessão expirada. Faça login novamente.");
        window.location.href = "/templates/login.html";
        return;
    }

    try {
        const res = await fetch("http://127.0.0.1:5000/auth/verificar", {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const dados = await res.json();

        if (!res.ok) {
            localStorage.removeItem("token");
            sessionStorage.setItem("authAlerta", "Sessão expirada. Faça login novamente.");
            window.location.href = "/templates/login.html";
            return;
        }
            // se a pagina tiver dizendo que adminRequerido = True. RECEBER TRUE - PQ PRECISA
        if (adminRequerido && dados.role !== "admin") {
            sessionStorage.setItem("authAlerta", "Você não tem permissão para acessar essa página.")
            // token validou, mas faltou permissão
            window.location.href = "/templates/login.html";
            return;
        }

        document.body.style.visibility = "visible";
    } catch (error) {
        sessionStorage.setItem("authAlerta", "Erro ao validar sessão. Faça login novamente.");
        window.location.href = "/templates/login.html";
    }
}
