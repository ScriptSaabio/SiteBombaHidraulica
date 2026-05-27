import { usuarios } from "./usuarios.js";
import { produtos } from "./produtos.js";

// /* ELEMENTOS LOGIN */

const elemento = {
  email: document.querySelector("#email"),
  senha: document.querySelector("#senha"),
  form: document.querySelector("#formLogin"),
  button: document.querySelector("#botao-login"),
};
// Seleciona os elementos do HTML e guarda em um objeto para facilitar o uso

// /* LOGIN */

if (elemento.form) {
  // Verifica se o formulário existe na página

  elemento.form.addEventListener("submit", (event) => {
    // Escuta o envio do formulário

    event.preventDefault();
    // Impede o recarregamento padrão da página

    loginValido(
      elemento.email.value,
      elemento.senha.value
    );
    // Envia email e senha digitados para a função de validação
  });
}

function loginValido(email, senha) {
  // Função responsável por validar o login

  const usuarioEncontrado = usuarios.find((usuario) => {
    // Procura um usuário na lista

    return (
      usuario.usuario === email &&
      usuario.senha === senha
    );
    // Verifica se email e senha conferem
  });

  if (usuarioEncontrado) {
    // Se encontrou o usuário

    localStorage.setItem(
      "usuarioLogado",
      JSON.stringify(usuarioEncontrado)
    );
    // Salva os dados do usuário no navegador

    setTimeout(() => {
      // Espera 1,5 segundos antes de entrar

      window.location.href = "admin.html";
      // Redireciona para a página admin

    }, 1500);

  } else {
    // Caso usuário ou senha estejam errados

    alert("Usuário ou senha inválidos! Por favor, tente novamente.");
    // Exibe mensagem de erro
  }
}

// /* LOGOUT */

function logout() {
  // Função de sair da conta

  localStorage.removeItem("usuarioLogado");
  // Remove o usuário salvo no navegador

  window.location.href = "index.html";
  // Redireciona para a página inicial
}

// /* MENU ATIVO AUTOMÁTICO */

document.addEventListener("DOMContentLoaded", () => {
  // Executa quando o HTML terminar de carregar

  const links = document.querySelectorAll("nav a");
  // Seleciona todos os links do menu

  const paginaAtual =
    window.location.pathname.split("/").pop() || "index.html";
  // Descobre qual página está aberta

  links.forEach((link) => {
    // Percorre cada link do menu

    const href = link
      .getAttribute("href")
      .replace("./", "");
    // Pega o href do link

    if (href === paginaAtual) {
      // Se o link for da página atual

      link.classList.add("active");
      // Adiciona a classe active

    } else {

      link.classList.remove("active");
      // Remove a classe active dos outros links
    }
  });
});

// /* BOTÕES SAIBA MAIS */

const botoes = document.querySelectorAll(".card .botao");
// Seleciona todos os botões dentro dos cards

botoes.forEach((botao) => {
  // Percorre cada botão

  botao.addEventListener("click", () => {
    // Detecta clique no botão

    const idBotao = botao.id;
    // Pega o id do botão clicado

    switch (idBotao) {
      // Verifica qual botão foi clicado

      case "bomba1":
        alert("Bombas de Alta Pressão: ideais para prédios e grandes sistemas.");
        break;

      case "bomba2":
        alert("Bombas Submersíveis: desenvolvidas para operar dentro da água.");
        break;

      case "bomba3":
        alert("Manutenção especializada para todos os modelos de bombas.");
        break;

      default:
        alert("Em breve mais informações sobre este produto.");
    }
  });
});

// /* ROLAGEM SUAVE MENU */

const linksMenu = document.querySelectorAll("nav a");
// Seleciona os links do menu

linksMenu.forEach((link) => {
  // Percorre os links

  link.addEventListener("click", () => {
    // Quando clicar em um link

    document.documentElement.style.scrollBehavior = "smooth";
    // Ativa rolagem suave da página
  });
});

// /* PROTEÇÃO DE PÁGINAS */

const paginasProtegidas = [
  "admin.html"
];
// Lista de páginas protegidas

const paginaProtegidaAtual =
  window.location.pathname.split("/").pop();
// Descobre a página atual

const usuarioLogado =
  localStorage.getItem("usuarioLogado");
// Verifica se existe usuário salvo no navegador

if (
  paginasProtegidas.includes(paginaProtegidaAtual) &&
  !usuarioLogado
) {
  // Se a página for protegida e não houver login

  window.location.href = "login.html";
  // Redireciona para a tela de login
}

// /* DISPONIBILIZA LOGOUT */

window.logout = logout;
// Torna a função logout acessível no HTML


/* CONSULTAR PRODUTO */

const btnMenu = document.querySelector(".menu-btn");

const boasVindas = document.querySelector("#boasVindas");

const pesquisaProduto = document.querySelector("#pesquisaProduto");

const btnPesquisar = document.querySelector("#btnPesquisar");

const campoPesquisa = document.querySelector("#campoPesquisa");

const resultadoPesquisa = document.querySelector("#resultadoPesquisa");

/* MOSTRA PESQUISA */

btnMenu.addEventListener("click", () => {

    boasVindas.style.display = "none";

    pesquisaProduto.style.display = "flex";

});

/* PESQUISAR */

btnPesquisar.addEventListener("click", () => {

    const valorPesquisa =
        campoPesquisa.value.toLowerCase();

    resultadoPesquisa.innerHTML = "";

    /* FILTRA PRODUTOS */

    const produtosEncontrados = produtos.filter((produto) => {

        return (
            produto.nome.toLowerCase().includes(valorPesquisa) ||
            produto.id.toString().includes(valorPesquisa)
        );

    });

    /* NENHUM PRODUTO */

    if(produtosEncontrados.length === 0){

        resultadoPesquisa.innerHTML = `
            <p>Nenhum produto encontrado.</p>
        `;

        return;
    }

    /* MOSTRA PRODUTOS */

    produtosEncontrados.forEach((produto) => {

        resultadoPesquisa.innerHTML += `
          <div class="card-produto">

            <img src="${produto.imagem}" alt="${produto.nome}">

            <h3>${produto.nome}</h3>

            <p>${produto.descricao}</p>

            <strong>Preço: R$ ${produto.preco}</strong>

          </div>
        `;

    });

});