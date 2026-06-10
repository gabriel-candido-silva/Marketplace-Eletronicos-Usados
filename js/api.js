"use strict"

const BASE_URL = "https://base-back-dwpz.onrender.com";


export async function getAnunciados() {
  const response = await fetch(`${BASE_URL}/produtos?ativo=true`);
  if (!response.ok) {
    throw new Error("Erro ao buscar anunciados");
  }
  return response.json();
}

export async function criarAnunciado(anuncio) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
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

export async function exibirAnunciados() {
  const anunciados = await getAnunciados();

  let template = document.querySelector(".template-produtos");

  template.replaceChildren();

  anunciados.forEach((item) => {
    const cardAnunciado = ` <div class="template-produto" data-id = ${item.id}>
                <div class="card-produto">
                    <img src="https://placehold.co/600x400" alt="imagem do produto" class="img-card">
                    <p>Produto:</p>
                    <p>Tipo:</p>
                    <p>Preço:</p>
                    <p>Estado de Uso:</p>

                    <div class="layout-botoes">
                        <button class="style-button">Editar Anunciado</button>
                        <button class="style-button">Excluir Anunciado</button>
                    </div>

                </div>
            </div>`;

    template.innerHTML += cardAnunciado;
  });
}

