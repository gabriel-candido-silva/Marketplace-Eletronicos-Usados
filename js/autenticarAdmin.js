const BASE_URL = "https://base-back-dwpz.onrender.com";

export function autenticarAdmin() {
  const formLogin = document.querySelector("#formLogin");

  if (!formLogin) {
    return;
  }

  formLogin.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(formLogin);
    const email = formData.get("email");
    const senha = formData.get("senha");

    try {
      const response = await fetch(`${BASE_URL}/entrar`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const dados = await response.json();
      localStorage.setItem("token", dados.accessToken);
      localStorage.setItem("usuario", JSON.stringify(dados.user));
      window.location.href = "admin.html";
    } catch (error) {
      console.error("Erro ao autenticar admin:", error);
      alert("Falha no login. Verifique se os dados estão corretos.");
    }
  });
}
