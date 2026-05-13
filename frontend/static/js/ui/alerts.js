export function mostrarAlerta(tipo, mensagem) {

    const alerta = document.getElementById("alerta");
    const mensagemAlerta = document.getElementById("mensagemAlerta");
    const iconeAlerta = document.getElementById("iconeAlerta");

    alerta.className = 
    "alert d-flex align-items-center";

    if (tipo === "success") {
        alerta.classList.add("alert-success");

        iconeAlerta.setAttribute(
            "href",
            "#check-circle-fill"
        );
    } else if (tipo === "danger") {
        alerta.classList.add("alert-danger");

        iconeAlerta.setAttribute(
            "href",
            "#exclamation-triangle-fill"
        );
    } else if (tipo === "warning") {
        alerta.classList.add("alert-warning");

        iconeAlerta.setAttribute(
            "href",
            "#info-fill"
        );
    }

    mensagemAlerta.textContent = mensagem;

    setTimeout( () => {
        alerta.classList.add("d-none");
    }, 1500);
}