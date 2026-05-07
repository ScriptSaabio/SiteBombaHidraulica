/* MENU ATIVO AUTOMÁTICO */
document.addEventListener("DOMContentLoaded", function () {

    const links = document.querySelectorAll("nav a");
    const paginaAtual = window.location.pathname.split("/").pop();

    links.forEach(link => {
        const href = link.getAttribute("href");

        if (href === paginaAtual || (paginaAtual === "" && href === "index.html")) {
            link.classList.add("active");
        }
    });

});


/* ALERTA BOTÕES SAIBA MAIS */
const botoes = document.querySelectorAll(".card button");

botoes.forEach(botao => {
    botao.addEventListener("click", function () {
        alert("Em breve mais informações sobre este produto.");
    });
});


/* ROLAGEM SUAVE DO MENU */
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener("click", function () {
        document.body.style.scrollBehavior = "smooth";
    });
});