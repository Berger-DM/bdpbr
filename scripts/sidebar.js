document.addEventListener("DOMContentLoaded", function () {
  fetch("/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-placeholder").innerHTML = data;
    })
    .catch((error) => console.error("Error loading navigation:", error));
});

function toggleSidebar() {
  const sidebar = document.getElementById("nav-table");
  const body = document.body;
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
    sidebar.style.height = "100vh";
    sidebar.style.overflowY = "scroll";
    body.classList.add("no-scroll");
  } else {
    sidebar.style.display = "none";
    body.classList.remove("no-scroll");
    sidebar.style.height = "auto";
    sidebar.style.overflowY = "hidden";
  }
}

// function updateLinks() {
//   const navLinks = document.querySelectorAll("#nav-list a");
//   navLinks.forEach((link) => {
//     link.addEventListener("click", function (event) {
//       event.preventDefault();
//       const [page, fragment] = this.getAttribute("href")
//         .split("=")[1]
//         .split("#");
//       loadPage(page, fragment);
//       history.pushState(
//         { page, fragment },
//         "",
//         `?page=${page}${fragment ? `#${fragment}` : ""}`
//       );
//     });
//   });
// }
