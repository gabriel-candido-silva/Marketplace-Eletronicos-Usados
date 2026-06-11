"use strict"

const BASE_URL = "https://base-back-dwpz.onrender.com";


export async function getAnunciados() {
  const response = await fetch(`${BASE_URL}/produtos`);
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


