import { exibirAnunciadosAdmin, exibirAnunciadosCliente, registrarAnuncio, excluirAnuncio } from "./api.js";
import { abrirLoginDoPainel } from "./abrirLogin.js";
import { autenticarAdmin } from "./autenticarAdmin.js";

const temTemplateAdmin = document.querySelector(".template-produto");
const temTemplateCliente = document.querySelector(".template-produto-cliente");

abrirLoginDoPainel();
autenticarAdmin();

if (temTemplateAdmin) {
  exibirAnunciadosAdmin();
  registrarAnuncio();
  excluirAnuncio();
}

if (temTemplateCliente) {
  exibirAnunciadosCliente();
}
