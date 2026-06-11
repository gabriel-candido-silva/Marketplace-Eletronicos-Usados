"use strict"

import { uploadParaCloudinary } from "./cloudinary.js";

const BASE_URL = "https://base-back-dwpz.onrender.com";


export async function getAnunciados() {
  const response = await fetch(`${BASE_URL}/produtos`);
  if (!response.ok) {
    throw new Error("Erro ao buscar anunciados");
  }
  return response.json();
}

export async function criarAnunciado(anuncio) {
  const token = localStorage.getItem("token");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(anuncio),
  };

  const response = await fetch(`${BASE_URL}/produtos`, options);

  if (!response.ok) {
    throw new Error("Erro ao criar anuncio");
  }

  return response.json();
}

export async function atualizarAnunciado(id, anuncio) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(anuncio),
  };

  const response = await fetch(`${BASE_URL}/produtos/${id}`, options);

  if (!response.ok) {
    throw new Error("Erro ao atualizar anunciado");
  }

  return response.json();
}

export async function deletarAnunciado(id) {
  const options = {
    method: "DELETE",
  };

  const response = await fetch(`${BASE_URL}/produtos/${id}`, options);

  if (!response.ok) {
    throw new Error("Erro ao deletar anuncio");
  }

  return true;
}

export async function exibirAnunciadosAdmin() {
  const anunciados = await getAnunciados();

  let template = document.querySelector(".template-produto");


  anunciados.forEach((item) => {
    const cardAnunciado = `<div class="card-produto" data-id = ${item.id}>
                    <img src=" ${item.imagemUrl}" alt="imagem do produto" class="img-card">
                    <p>Produto: ${item.nome}</p>
                    <p>descrição: ${item.descricao}</p>
                    <p>Preço: ${item.preco}</p>

                    <div class="layout-botoes">
                        <button class="style-button">Editar Anunciado</button>
                        <button class="style-button">Excluir Anunciado</button>
                    </div>

                </div>
            </div>`;

    template.innerHTML += cardAnunciado;
  });
}

export async function exibirAnunciadosCliente() {
  const anunciados = await getAnunciados();

  let template = document.querySelector(".template-produto-cliente");


  anunciados.forEach((item) => {
    const cardAnunciado = `<div class="card-produto" data-id = ${item.id}>
                    <img src=" ${item.imagemUrl}" alt="imagem do produto" class="img-card">
                    <p>Produto: ${item.nome}</p>
                    <p>descrição: ${item.descricao}</p>
                    <p>Preço: ${item.preco}</p>

                    <div class="layout-botoes">
                        <button class="style-button">Comprar ${item.nome}</button>
                    </div>

                </div>
            </div>`;

    template.innerHTML += cardAnunciado;
  });
}

export function abrirLoginDoPainel() {
  const linkAdmin = document.querySelector("#button-admin");

  if (linkAdmin) {
    linkAdmin.addEventListener("click", (event) => {
      event.preventDefault();
      window.location.href = "login.html";
    });
  }
}

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

export function registrarAnuncio() {
  const form = document.querySelector("#formAnuncio");

  if (form) {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const rawData = Object.fromEntries(formData);

      const input = document.getElementById("preview-input");
      let fotoUrl = document.getElementById("preview-image").src;

      // Bloco if para envio ao Cloudinary
      if (input && input.files && input.files[0]) {
        try {
          fotoUrl = await uploadParaCloudinary(input.files[0]);
          console.log("Upload automático concluído:", fotoUrl);
        } catch (error) {
          console.error("Erro no upload automático:", error);
          alert("Não foi possível enviar a foto para a nuvem.");
        }
      }

      const anuncio = {
        nome: rawData.nome,
        slug: rawData.slug,
        descricao: rawData.descricao,
        preco: rawData.preco,
        precoAntigo: rawData.preco,
        categoriaId: 1,
        imagemUrl: fotoUrl,
        galeria: [fotoUrl],
        estoque: 1,
        ativo: true,
        emDestaque: true,
        ordemDestaque: 1,
        criadoEm: new Date().toISOString(),
        atualizadoEm: new Date().toISOString(),
      };

      try {
        await criarAnunciado(anuncio);
        alert("Anuncio salvo com sucesso!");
        form.reset();
      } catch (error) {
        console.error("Erro ao postar anuncio:", error);
        alert("Não foi possível postar o anuncio.");
      }
    });
  }
}

