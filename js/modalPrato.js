import {
    aumentarQtdPedido,
    diminuirQtdPedido,
    getQtdPedido,
    getRestauranteAtivo,
    resetQtdPedido,
    setPratoAtivo
} from './estado.js'

// Preenche e exibe o modal com os detalhes do prato escolhido.
export function abrirModalPrato(id) {
    const restauranteAtivo = getRestauranteAtivo()
    const pratoAtivo = restauranteAtivo.pratos.find(p => p.id === id)
    setPratoAtivo(pratoAtivo)
    resetQtdPedido()

    document.getElementById('modalPratoImagem').src = pratoAtivo.imagem
    document.getElementById('modalPratoNome').textContent = pratoAtivo.nome
    document.getElementById('modalPratoDescricao').textContent = pratoAtivo.descricao
    document.getElementById('modalPratoPreco').textContent = `R$ ${pratoAtivo.preco.toFixed(2).replace('.', ',')}`
    document.getElementById('quantidadeModal').textContent = getQtdPedido()
    document.getElementById('observacaoPrato').value = ''

    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    modal.classList.remove('hidden')

    setTimeout(() => {
        conteudo.classList.remove('translate-y-full', 'md:scale-90', 'md:opacity-0')
        conteudo.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100')
    }, 10)
}

// Abre o modal quando o usuário clica no botão de adicionar prato.
export function abrirModalPratoPorClique(event) {
    const btn = event.target.closest('.btnAdicionarPrato');
    if(btn) abrirModalPrato(+btn.dataset.id)
}

// Fecha o modal do prato com a animação de saída.
export function fecharModalPrato(){
    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    conteudo.classList.remove('translate-y-0', 'md:scale-100', 'md:opacity-100')
    conteudo.classList.add('translate-y-full', 'md:scale-90', 'md:opacity-0')

    setTimeout(() => {
        modal.classList.add('hidden')
    }, 300)
}

// Fecha o modal do prato quando o usuário clica fora do conteúdo.
export function fecharModalPratoPorFora(event) {
    if(event.target === document.getElementById('modalPrato')){
        fecharModalPrato()
    }
}

// Aumenta a quantidade do prato dentro do modal.
export function aumentarQuantidadeModal() {
    aumentarQtdPedido()
    document.getElementById('quantidadeModal').textContent = getQtdPedido()
}

// Diminui a quantidade do prato no modal, sem deixar ficar menor que 1.
export function diminuirQuantidadeModal() {
    diminuirQtdPedido()
    document.getElementById('quantidadeModal').textContent = getQtdPedido()
}
