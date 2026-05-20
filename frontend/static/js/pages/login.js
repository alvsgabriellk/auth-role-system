import { validarEmail, validarSenha } from "../validators/loginValidator.js";
import { autenticarUsuario } from "../services/authLoginService.js";
import { mostrarAlerta } from "../ui/alerts.js";

const form = document.querySelector("form");

const email = document.getElementById("email");
const senha = document.getElementById("senha");

const emailErro = document.getElementById("emailErro");
const senhaErro = document.getElementById("senhaErro");

const botao = document.querySelector("button[type='submit']");

botao.disabled = true;

function validarTudoOK () {
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();

    const emailOK = validarEmail(emailValue);
    if (emailValue === "") {
        emailErro.style.display = "none";
    } else {
        emailErro.style.display = emailOK ? "none" : "block";
    }

    const senhaOK = validarSenha(senhaValue);
    if (senhaValue === "") {
        senhaErro.style.display = "none";
    } else {
        senhaErro.style.display = senhaOK ? "none" : "block";
    }

    const tudoOK = emailOK && senhaOK;

    botao.disabled = !tudoOK;
}

email.addEventListener("input", validarTudoOK);
senha.addEventListener("input", validarTudoOK);

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (botao.disabled) {
        return
    }

    try {
        const resultado = await autenticarUsuario({
            email: email.value,
            senha: senha.value
        });

        if (resultado.verificacaoMsg) {
            mostrarAlerta("danger", resultado.verificacaoMsg);
        }

        if (resultado.msg) {
            senhaErro.style.display = "block";
            senhaErro.innerText = resultado.msg
            return;
        }

        setTimeout(() => {
            window.location.href ="/templates/crud.html";
        }, 2000);

    } catch(error) {
        mostrarAlerta("warning", "Erro interno no servidor!");
    }

    form.reset();
});