// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   const page = urlParams.get("page") || "home";

//   fetch(`/pages/${page}.html`)
//     .then((response) => response.text())
//     .then((data) => {
//       document.getElementById("content-placeholder").innerHTML = data;
//     })
//     .catch((error) => console.error("Error loading content:", error));
// });

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") || "home";

  function loadPage(page) {
    fetch(`/pages/${page}.html`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("content-placeholder").innerHTML = data;
        updateLinks();
      })
      .catch((error) => console.error("Error loading content:", error));
  }

  function updateLinks() {
    const navLinks = document.querySelectorAll("#nav-list a");
    navLinks.forEach((link) => {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const page = this.getAttribute("href").split("=")[1];
        loadPage(page);
        updateTitle(page);
        history.pushState({ page }, "", `?page=${page}`);
      });
    });

    const subnavLinks = document.querySelectorAll(".subnav a");
    subnavLinks.forEach((link) => {
      console.log("Adding subnav link:", link);
      link.addEventListener("click", function (event) {
        event.preventDefault();
        const targetId = this.getAttribute("href").substring(1);
        document
          .getElementById(targetId)
          .scrollIntoView({ behavior: "smooth" });
      });
    });
  }

  function updateTitle(page) {
    const baseTitle = "[BR]ock, Dodge, Parry - ";
    let title;
    switch (page) {
      case "home":
        title = "Home";
        break;
      case "introducao":
        title = "Introdução";
        break;
      case "criacao-de-personagens":
        title = "Criação de Personagens";
        break;
      case "regras":
        title = "Regras";
        break;
      case "tarefas-complexas":
        title = "Tarefas Complexas";
        break;
      case "combate":
        title = "Combate";
        break;
      case "conflito-social":
        title = "Conflito Social";
        break;
      case "carreiras-e-habilidades":
        title = "Carreiras & Habilidades";
        break;
      case "melhorando-seu-personagem":
        title = "Melhorando seu Personagem";
        break;
      case "armas-armaduras-e-equipamento":
        title = "Armas, Armaduras & Equipamento";
        break;
      case "magia":
        title = "Magia";
        break;
      case "narrando-aventuras":
        title = "Narrando Aventuras";
        break;
      case "amigos-inimigos-e-monstros":
        title = "Amigos, Inimigos & Monstros";
        break;
      case "ferramentas-e-tabelas":
        title = "Ferramentas & Tabelas";
        break;
      case "creditos":
        title = "Créditos";
        break;
      default:
        title = "BDP Tradução";
    }
    document.title = baseTitle + title;
  }

  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  });

  loadPage(page);
});
