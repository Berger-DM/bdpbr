document.addEventListener("DOMContentLoaded", async function () {
  const pages = [
    { file: "introducao.html", subnavId: "introducao-subnav" },
    {
      file: "criacao-de-personagens.html",
      subnavId: "criacao-de-personagens-subnav",
    },
    { file: "regras.html", subnavId: "regras-subnav" },
    { file: "tarefas-complexas.html", subnavId: "tarefas-complexas-subnav" },
    { file: "conflito-social.html", subnavId: "conflito-social-subnav" },
    { file: "combate.html", subnavId: "combate-subnav" },
    {
      file: "carreiras-e-habilidades.html",
      subnavId: "carreiras-e-habilidades-subnav",
    },
    {
      file: "melhorando-seu-personagem.html",
      subnavId: "melhorando-seu-personagem-subnav",
    },
    {
      file: "armas-armaduras-e-equipamento.html",
      subnavId: "armas-armaduras-e-equipamento-subnav",
    },
    { file: "magia.html", subnavId: "magia-subnav" },
    { file: "narrando-aventuras.html", subnavId: "narrando-aventuras-subnav" },
    {
      file: "amigos-inimigos-e-monstros.html",
      subnavId: "amigos-inimigos-e-monstros-subnav",
    },
    {
      file: "ferramentas-e-tabelas.html",
      subnavId: "ferramentas-e-tabelas-subnav",
    },
    { file: "creditos.html", subnavId: "creditos-subnav" },
  ];

  for (const { file, subnavId } of pages) {
    console.log(`Loading subnav for: ${file} (${subnavId})`);

    try {
      const response = await fetch(`/pages/${file}`);
      if (!response.ok) {
        console.warn(`Failed to load ${file}`);
        continue;
      }

      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      const subnav = document.getElementById(subnavId);
      if (!subnav) {
        console.warn(`Subnav element '${subnavId}' not found.`);
        continue;
      }

      let headerIndex = 0;
      const headers = [...doc.querySelectorAll("h1, h2")].filter(
        (header, index) => header.tagName !== "H1" || index !== 0
      );

      headers.forEach((header) => {
        let id = header.id;
        if (!id) {
          id = `${file.replace(".html", "")}-header-${headerIndex++}`;
          header.id = id; // Ensure it has an ID in the parsed document
        } else {
          id = id.replace(".html", "");
        }

        noExtFile = file.replace(".html", "");

        const link = document.createElement("li");
        link.innerHTML = `<a href="index.html?page=${noExtFile}#${id}">${header.textContent}</a>`;
        subnav.appendChild(link);
        console.log(`Added link to ${id}: ${link.innerHTML}`);
      });

      console.log(
        `Subnav loaded: ${subnavId} (${headers.length} headers found)`
      );

      // Hide/show the subnav arrow
      const subheaderArrow = subnav.previousElementSibling;
      subheaderArrow.style.display =
        subnav.children.length === 0 ? "none" : "inline-block";
    } catch (error) {
      console.error(`Error loading subnav for ${file}:`, error);
    }
  }
});

// Restore missing functions
function toggleSubnav(subnavId) {
  console.log("Toggling subnav:", subnavId);
  const subnav = document.getElementById(subnavId);
  if (subnav) {
    subnav.classList.toggle("expanded");
  }
}

function toggleDetails(event, subnavId) {
  event.preventDefault();
  const details = event.target.closest("details");
  if (details) {
    details.open = !details.open;
  }
}

function pamonha(subnavId) {
  toggleSubnav(subnavId);
}
