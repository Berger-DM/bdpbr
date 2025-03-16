document.addEventListener("DOMContentLoaded", function () {
  fetch("/nav.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("nav-placeholder").innerHTML = data;

      // Add event listeners to each link in the nav-list
      const navLinks = document.querySelectorAll("#nav-list a");
      navLinks.forEach((link) => {
        link.addEventListener("click", function () {
          toggleSidebar();
        });
      });
    })
    .catch((error) => console.error("Error loading navigation:", error));
});

function toggleSidebar() {
  const sidebar = document.getElementById("nav-list");
  const body = document.body;
  if (sidebar.style.display === "none" || sidebar.style.display === "") {
    sidebar.style.display = "block";
    body.classList.add("no-scroll");
  } else {
    sidebar.style.display = "none";
    body.classList.remove("no-scroll");
  }
}
