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

