const form = document.querySelector("form");

// nao posso me esquecer dos eventos de cada input

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const emailErro = document.getElementById("emailErro");
const senha = document.getElementById("senha");
const senhaRepet = document.getElementById("senhaRepet");
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

const validarSenha = (senhaValue => {
    return {
        min: senhaValue.length >= 8,
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
    const senhaValue = senha.value.trim();
    const senhaRepetValue = senhaRepet.value.trim();
    
    // todas as regras com true ou false
    const validacoes = validarSenha(senhaValue);
    for (let regra in validacoes) {
        if (validacoes[regra]) {
            regras[regra].classList.add("ok");
        } else {
            regras[regra].classList.remove("ok");
        }
    }
    
    // validar senha
    const senhaOK = Object.values(validacoes).every(v => v);

    // validar email
    const emailOK = validaEmail(emailValue);
    if (emailValue === "") {
        emailErro.style.display = "none";
    } else {
        emailErro.style.display = emailOK ? "none" : "block";
    }

    // validar confirmação de senha
    const senhaIgual = senhaValue === senhaRepetValue && senhaRepetValue !== "";
    if (senhaRepetValue === "") {
        senhaErro.style.display = "none";
    } else { // se a senha nao for igual, mostre erro (block)
        senhaErro.style.display = senhaIgual ? "none" : "block";
    }

    const nomeOK = nomeValue !== "";

    const tudoOK = senhaOK && senhaIgual && emailOK && nomeOK;

    botao.disabled = !tudoOK;
};

// eventos dos inputs, cada input vai fazer realizar outro evento de validação de tudo
nome.addEventListener("input", validarTudo);
email.addEventListener("input", validarTudo);
senha.addEventListener("input", validarTudo);
senhaRepet.addEventListener("input", validarTudo);

form.addEventListener("submit", (e) => {
    validarTudo(); // ultima chamada pra validar tudo antes do submit

    if (botao.disabled) {
        e.preventDefault(); // impede comportmnt padrão
    }
});


