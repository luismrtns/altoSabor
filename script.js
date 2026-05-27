import { abrirCardapioPorClique, abrirRestauranteCompartilhado } from './js/cardapio.js'
import { abrirCarrinho, adicionarPratoAoCarrinho, esconderCheckout, fecharCarrinho, fecharCarrinhoPorFora, manipularItemCarrinho } from './js/carrinho.js'
import { selecionarCategoria } from './js/categorias.js'
import { compartilharCardapio } from './js/compartilhar.js'
import { alternarFormaPagamento, alternarTipoPedido, calcularTroco, finalizarPedido } from './js/checkout.js'
import { atualizarHeaderNoScroll } from './js/header.js'
import { abrirModalPratoPorClique, aumentarQuantidadeModal, diminuirQuantidadeModal, fecharModalPrato, fecharModalPratoPorFora } from './js/modalPrato.js'
import { voltarParaRestaurantes } from './js/navegacao.js'
import { renderizarRestaurantes } from './js/renderRestaurantes.js'

renderizarRestaurantes()
abrirRestauranteCompartilhado()

document.getElementById('inputBusca').addEventListener('input', (event) => {
    renderizarRestaurantes(event.target.value)
})

document.getElementById('btnVoltarRestaurantes').addEventListener('click', voltarParaRestaurantes)
document.getElementById('containerRestaurantes').addEventListener('click', abrirCardapioPorClique)
document.getElementById('containerCategorias').addEventListener('click', selecionarCategoria)
document.getElementById('containerPratos').addEventListener('click', abrirModalPratoPorClique)

document.getElementById('btnFecharModalPrato').addEventListener('click', fecharModalPrato)
document.getElementById('modalPrato').addEventListener('click', fecharModalPratoPorFora)
document.getElementById('btnAumentar').addEventListener('click', aumentarQuantidadeModal)
document.getElementById('btnDiminuir').addEventListener('click', diminuirQuantidadeModal)
document.getElementById('btnAdicionarCarrinho').addEventListener('click', adicionarPratoAoCarrinho)

document.getElementById('btnAbrirCarrinho').addEventListener('click', abrirCarrinho)
document.getElementById('btnFecharCarrinho').addEventListener('click', fecharCarrinho)
document.getElementById('modalCarrinho').addEventListener('click', fecharCarrinhoPorFora)
document.getElementById('listaItensCarrinho').addEventListener('click', manipularItemCarrinho)
document.getElementById('btnRevisarPedido').addEventListener('click', esconderCheckout)
document.getElementById('btnFinalizarPedido').addEventListener('click', finalizarPedido)

document.querySelectorAll('input[name="tipoPedido"]').forEach((radio) => {
    radio.addEventListener('change', alternarTipoPedido)
})

document.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
    radio.addEventListener('change', alternarFormaPagamento)
})

document.getElementById('inputTroco').addEventListener('input', calcularTroco)
document.getElementById('btnCompartilharCardapio').addEventListener('click', compartilharCardapio)
window.addEventListener('scroll', atualizarHeaderNoScroll)
