// CONTROLADOR DA PÁGINA

import { validarSenha, validarEmail, validarNome } from "../validators/registerValidator.js";
import { cadastrarUsuario } from "../services/authService.js";
import { mostrarAlerta } from "../ui/alerts.js";

const form = document.querySelector("form");

// a cada input ocorre um evento

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const senha = document.getElementById("senha");
const senhaRepet = document.getElementById("senhaRepet");

const emailErro = document.getElementById("emailErro");
const senhaErro = document.getElementById("senhaErro");

const botao = document.querySelector("button[type='submit']");

const regras = {
    min: document.getElementById("min"),
    maius: document.getElementById("maius"),
    minus: document.getElementById("minus"),
    numero: document.getElementById("numero"),
    simbolo: document.getElementById("simbolo")
};

botao.disabled = true;


function validarTudo () {
    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const senhaValue = senha.value.trim();
    const senhaRepetValue = senhaRepet.value.trim();

    const validacoes = validarSenha(senhaValue); // todas as regras com true ou false

    for (let regra in validacoes) {
        if (validacoes[regra]) { // pra cada regra true
            regras[regra].classList.add("ok"); // na regra que for igual as regras
        } else { // pra cada false
            regras[regra].classList.remove("ok");
        }
    }

    const nomeOK = validarNome(nomeValue);

    // todos tem que ser true, por isso tem validações
    const senhaOK = Object.values(validacoes).every(v => v); 

    const emailOK = validarEmail(emailValue);
    if (emailValue === "") {
        emailErro.style.display = "none";
    } else { 
        emailErro.style.display = emailOK ? "none" : "block"; // se der true, vai ficar como none
    } // se o email tiver inválido, mostre erro (block)

    // validar a confirmação de senha
    const senhaIgual = senhaValue === senhaRepetValue && senhaRepetValue !== "";
    if (senhaRepetValue === "") {
        senhaErro.style.display = "none";
    } else {
        senhaErro.style.display = senhaIgual ? "none" : "block";
    } // se a senha nao for igual, mostre erro (block)

    const tudoOK = nomeOK && senhaOK && emailOK && senhaIgual;

    botao.disabled = !tudoOK;
};


// eventos dos inputs, cada input vai fazer realizar outra validação de tudo
// evento individual, mas a função valida tudo mesmo
// mudou qualquer coisa?, revalida tudo 
nome.addEventListener("input", validarTudo); 
email.addEventListener("input", validarTudo);
senha.addEventListener("input", validarTudo);
senhaRepet.addEventListener("input", validarTudo);

form.addEventListener("submit", async (e) => {
    e.preventDefault(); // impede padrao( reiniciar form e etc)
    validarTudo();

    if (botao.disabled) {
        return
    }

    try {
        
        const resultado = await cadastrarUsuario({
            nome: nome.value,
            email: email.value,
            senha: senha.value
        });

        // erro conhecido da API
        if (!resultado.ok) {

            return mostrarAlerta(
                "danger",
                resultado.dados.erro
            );

        }

        mostrarAlerta("success", resultado.dados.msg);
        setTimeout(() => {
            window.location.href = "/templates/login.html";
        }, 1950);

    } catch (erro) {
        mostrarAlerta("warning", "Erro interno no servidor!")
    }

});



