import { exibirAnunciadosAdmin, exibirAnunciadosCliente, registrarAnuncio, abrirLoginDoPainel, autenticarAdmin } from "./api.js";

const temTemplateAdmin = document.querySelector(".template-produto");
const temTemplateCliente = document.querySelector(".template-produto-cliente");

abrirLoginDoPainel();
autenticarAdmin();

if (temTemplateAdmin) {
  exibirAnunciadosAdmin();
  registrarAnuncio();
}

if (temTemplateCliente) {
  exibirAnunciadosCliente();
}
