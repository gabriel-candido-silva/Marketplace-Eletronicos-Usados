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
  const token = localStorage.getItem("token");

  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem("token");

  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
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
                        <button class="style-button btn-editar">Editar Anunciado</button>
                        <button class="btn-delete">Excluir Anunciado</button>
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

export function registrarAnuncio() {
  const form = document.querySelector("#formAnuncio");

  if (!form) {
    return;
  }

  let produtoEmEdicaoId = null;
  const submitButton = document.getElementById("submit-button");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const rawData = Object.fromEntries(formData);

    const input = document.getElementById("preview-input");
    let fotoUrl = document.getElementById("preview-image").src;

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
      if (produtoEmEdicaoId) {
        await atualizarAnunciado(produtoEmEdicaoId, anuncio);
        alert("Anúncio atualizado com sucesso!");
        window.location.reload();
      } else {
        await criarAnunciado(anuncio);
        alert("Anúncio salvo com sucesso!");
        window.location.reload();
      }

      form.reset();
      document.getElementById("preview-image").src = "img/upload-icon (1).svg";
      produtoEmEdicaoId = null;
      if (submitButton) {
        submitButton.textContent = "Publicar anúncio";
      }
    } catch (error) {
      console.error("Erro ao salvar anúncio:", error);
      alert("Não foi possível salvar o anúncio.");
    }
  });

  const template = document.querySelector(".template-produto");

  if (template) {
    template.addEventListener("click", async (event) => {
      if (!event.target.classList.contains("btn-editar")) {
        return;
      }

      const card = event.target.closest(".card-produto");
      const id = card?.dataset.id;

      if (!id) {
        return;
      }

      try {
        const response = await fetch(`${BASE_URL}/produtos/${id}`);
        if (!response.ok) {
          throw new Error("Erro ao buscar anúncio");
        }

        const item = await response.json();
        produtoEmEdicaoId = item.id;

        form.nome.value = item.nome || "";
        form.slug.value = item.slug || "";
        form.descricao.value = item.descricao || "";
        form.preco.value = item.preco || "";

        if (item.imagemUrl) {
          document.getElementById("preview-image").src = item.imagemUrl;
        }

        if (submitButton) {
          submitButton.textContent = "Atualizar anúncio";
        }

        window.scrollTo({ top: 0, behavior: "smooth" });
      } catch (error) {
        console.error("Erro ao carregar anúncio para edição:", error);
        alert("Não foi possível carregar o anúncio para edição.");
      }
    });
  }
}

export function excluirAnuncio() {
  const template = document.querySelector(".template-produto");

  if (!template) {
    return;
  }

  template.addEventListener("click", async (event) => {
    if (!event.target.classList.contains("btn-delete")) {
      return;
    }

    const card = event.target.closest(".card-produto");
    const id = card?.dataset.id;

    if (!id) {
      return;
    }

    if (!confirm("Tem certeza que deseja deletar este anúncio?")) {
      return;
    }

    try {
      await deletarAnunciado(id);
      alert("O anúncio foi deletado com sucesso!");
      location.reload();
    } catch (error) {
      console.error("Erro ao deletar anúncio:", error);
      alert("Não foi possível deletar o anúncio.");
    }
  });
}

