import { ValidarNome, ValidarDescricao, ValidarPreco, ValidarEstoque, ValidarCategoria } from "../../validators/crudValidator.js";

const NovoForm = document.getElementById("novoProduto");

const NomeNovoProduto = document.getElementById("NomeNovoProduto");
const NovaDescricao = document.getElementById("NovaDescricao");
const NovoPreco = document.getElementById("NovoPreco");
const NovoEstoque = document.getElementById("NovoEstoque");
const NovaCategoria = document.getElementById("NovaCategoria");

const NovoProdutoErro = document.getElementById("NovoProdutoErro");
const NovaDescricaoErro = document.getElementById("NovaDescricaoErro");
const NovoPrecoErro = document.getElementById("NovoPrecoErro");
const NovoEstoqueErro = document.getElementById("NovoEstoqueErro");
const NovaCategoriaErro = document.getElementById("NovaCategoriaErro");

const ButtonNovo = document.getElementById("ButtonNovo");

function validarTudo () {
    const nomeValue = NomeNovoProduto.value.trim();
    const descricaoValue = NovaDescricao.value.trim();
    const precoValue = NovoPreco.value.trim();
    const estoqueValue = NovoEstoque.value.trim();
    const categoriaValue = NovaCategoria.value.trim();

    const nomeOK = ValidarNome(nomeValue);
    if (nomeValue === "") {
        NovoProdutoErro.style.display = "none";
    } else {
        NovoProdutoErro.style.display = nomeOK ? "none" : "block";
    }

    const descricaoOK = ValidarDescricao(descricaoValue);
    if (descricaoValue === "") {
        NovaDescricaoErro.style.display = "none";
    } else {
        NovaDescricaoErro.style.display = descricaoOK ? "none" : "block";
    }

    const precoOK = ValidarPreco(precoValue);
    if (precoValue === "") {
        NovoPrecoErro.style.display = "none";
    } else {
        NovoPrecoErro.style.display = precoOK ? "none" : "block";
    }

    const estoqueOK = ValidarEstoque(estoqueValue);
    if (estoqueValue === "") {
        NovoEstoqueErro.style.display = "none";
    } else {
        NovoEstoqueErro.style.display = estoqueOK ? "none" : "block";
    }

    const categoriaOK = ValidarCategoria(categoriaValue);
    if (categoriaValue === "") {
        NovaCategoriaErro.style.display = "none";
    } else {
        NovaCategoriaErro.style.display = categoriaOK ? "none" : "block";
    }

    const TudoOK = nomeOK && descricaoOK && precoOK && estoqueOK && categoriaOK;

    ButtonNovo.disabled = !TudoOK;
} 

NomeNovoProduto.addEventListener("input", validarTudo);
NovaDescricao.addEventListener("input", validarTudo);
NovoPreco.addEventListener("input", validarTudo);
NovoEstoque.addEventListener("input", validarTudo);
NovaCategoria.addEventListener("input", validarTudo);
