export function abrirLoginDoPainel() {
  const linkAdmin = document.querySelector("#button-admin");

  if (linkAdmin) {
    linkAdmin.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }
}
