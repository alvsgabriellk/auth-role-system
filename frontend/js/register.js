const form = document.querySelector("form");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const emailErro = document.getElementById("emailErro");
const senha = document.getElementById("senha");
const senhaRepet = document.getElementById("senhaRepet");
const senhaErro = document.getElementById("senhaErro");


const botao = document.querySelector("button=[type='submit']");

const regras = {
    min: document.getElementById("min"),
    maius: document.getElementById("maius"),
    minus: document.getElementById("minus"),
    numero: document.getElementById("numero"),
    simbolo: document.getElementById("simbolo")
};

botao.disabled = true;

const validarSenha = (senhaValue => {
    return {
        min: senhaValue >= 8,
        maius: /[A-Z]/.test(senhaValue),
        minus: /[a-z]/.test(senhaValue),
        numero: /[0-9]/.test(senhaValue),
        simbolo: /[^A-Za-z0-9]/.test(senhaValue)
    };
});

const validaEmail = (emailValue) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)
};

const validarTudo = () => {
    const nomeValue = nome.value.trim();
    const emailValue = email.value.trim();
    const emailErroValue = emailErro.value.trim();
    const senhaValue = senha.value.trim();
    const senhaErroValue = senhaErro.value.trim();
    const senhaRepetValue = senhaRepet.value.trim();
    
}