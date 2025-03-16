document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const page = urlParams.get("page") || "home";

  function loadPage(page, fragment) {
    fetch(`/pages/${page}.html`)
      .then((response) => response.text())
      .then((data) => {
        document.getElementById("content-placeholder").innerHTML = data;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }
      })
      .catch((error) => console.error("Error loading content:", error));
  }

  window.addEventListener("popstate", function (event) {
    if (event.state && event.state.page) {
      loadPage(event.state.page);
    }
  });

  loadPage(page);
});
