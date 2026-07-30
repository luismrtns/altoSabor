import {
    adicionarItemCarrinho,
    aumentarItemCarrinho,
    diminuirItemCarrinho,
    getCarrinho,
    getPratoAtivo,
    getQtdPedido,
    getRestauranteAtivo,
    limparCarrinho,
    removerItemCarrinho
} from './estado.js'
import { fecharModalPrato } from './modalPrato.js'
import { mostrarConfirmacao } from './modalMensagem.js'

// Atualiza visualmente a lista de itens do carrinho e recalcula o total.
export function atualizarCarrinho(){
    const carrinho = getCarrinho()
    const lista = document.getElementById('listaItensCarrinho')
    const totalCarrinho = document.getElementById('valorTotalCarrinho')

    lista.innerHTML = ''

    if(carrinho.length === 0){
        lista.innerHTML = `
            <div class="cart-empty flex-1 flex flex-col items-center justify-center text-center px-6 py-12">
                <div class="cart-empty-icon mb-5">
                <svg xmlns="http://www.w3.org/2000/svg" width="34" height="34" fill="#C73E2B" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM80,140a12,12,0,1,1,12,12A12,12,0,0,1,80,140Zm78.66,48.43a8,8,0,0,1-11.09,2.23C141.07,186.34,136,184,128,184s-13.07,2.34-19.57,6.66a8,8,0,0,1-8.86-13.32C108,171.73,116.06,168,128,168s20,3.73,28.43,9.34A8,8,0,0,1,158.66,188.43ZM164,152a12,12,0,1,1,12-12A12,12,0,0,1,164,152Zm16.44-57.34-48,32a8,8,0,0,1-8.88,0l-48-32a8,8,0,1,1,8.88-13.32L128,110.39l43.56-29a8,8,0,0,1,8.88,13.32Z"></path>
                </svg>
                </div>
                <h3 class="font-inter text-xl font-bold text-cacau">Sua comanda está vazia</h3>
                <p class="text-sm text-preto/55 mt-2 max-w-60">Escolha um prato do cardápio para começar seu pedido.</p>
            </div>
        `;
        totalCarrinho.textContent = 'R$ 0,00'
        return
    }

    let valorTotal = 0
    const nomeRestaurantePedido = carrinho[0].nomeRestaurante

    const resumoRestaurante = document.createElement('div')
    resumoRestaurante.className = 'cart-restaurant-label flex items-center justify-between gap-3 text-sm text-preto/65 py-3'
    resumoRestaurante.innerHTML = `<span>Pedido em</span><strong class="font-inter text-cacau text-right">${nomeRestaurantePedido}</strong>`
    lista.appendChild(resumoRestaurante)

    carrinho.forEach((item, index) => {
        valorTotal += item.precoTotal

        const div = document.createElement('div')
        div.className = 'cart-item flex flex-col gap-4'
        div.innerHTML = `
            <div class="flex items-start gap-3">
                <span class="cart-quantity-stamp shrink-0">${item.quantidade}x</span>
                <div class="min-w-0 flex-1 flex flex-col">
                    <span class="font-inter font-bold text-cacau leading-tight">${item.nome}</span>
                    <span class="text-preto/50 text-xs mt-1">R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} por unidade</span>
                    ${item.observacao ? `<span class="cart-observation text-xs mt-2">“${item.observacao}”</span>` : ''}
                </div>
                <button class="btnRemoverItem cart-remove-button cursor-pointer flex items-center justify-center shrink-0" data-index="${index}" aria-label="Remover ${item.nome}" title="Remover item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="fill-current" viewBox="0 0 256 256">
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
                    </svg>
                </button>
            </div>
            <div class="flex items-center justify-between gap-3 pl-12">
                <span class="font-inter font-extrabold text-paprica">R$ ${item.precoTotal.toFixed(2).replace('.', ',')}</span>
                <div class="cart-stepper flex items-center gap-3">
                    <button class="btnDiminuirItem bg-mel/20 text-cacau w-8 h-8 rounded-lg flex items-center justify-center font-bold cursor-pointer hover:bg-mel/35 transition-all" data-index="${index}" aria-label="Diminuir quantidade de ${item.nome}">-</button>
                    <span class="font-bold text-cacau min-w-4 text-center">${item.quantidade}</span>
                    <button class="btnAumentarItem bg-cacau text-branco w-8 h-8 rounded-lg flex items-center justify-center font-bold cursor-pointer hover:bg-caju transition-all" data-index="${index}" aria-label="Aumentar quantidade de ${item.nome}">+</button>
                </div>
            </div>
        `
        lista.appendChild(div)
    })
    totalCarrinho.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
}

// Atualiza o contador de itens no botão do carrinho.
export function contadorCarrinho(){
    const carrinho = getCarrinho()
    const badge = document.getElementById('contador')
    const bntCarrinho = document.getElementById('btnAbrirCarrinho')
    const totalItens = carrinho.reduce((acumulador, item) => acumulador + item.quantidade, 0)

    if(totalItens > 0){
        badge.textContent = totalItens
        badge.classList.remove('hidden')

        bntCarrinho.classList.add('scale-110')
        setTimeout(() => {
            bntCarrinho.classList.remove('scale-110')
        }, 300)
    }else{
        badge.classList.add('hidden')
    }
}

// Controla remover, aumentar e diminuir itens dentro do carrinho.
export function manipularItemCarrinho(event) {
    const btnRemover = event.target.closest('.btnRemoverItem')
    const btnAumentar = event.target.closest('.btnAumentarItem')
    const btnDiminuir = event.target.closest('.btnDiminuirItem')

    if(btnRemover){
        removerItemCarrinho(+btnRemover.dataset.index)
    }

    if(btnAumentar){
        aumentarItemCarrinho(+btnAumentar.dataset.index)
    }

    if(btnDiminuir){
        diminuirItemCarrinho(+btnDiminuir.dataset.index)
    }

    if(btnRemover || btnAumentar || btnDiminuir){
        atualizarCarrinho()
        contadorCarrinho()
    }
}

// Recolhe os campos do checkout para o cliente conseguir revisar o pedido.
export function esconderCheckout(){
    const campos = document.getElementById('camposCheckout')
    campos.classList.remove('opacity-100', 'translate-y-0')
    campos.classList.add('hidden', 'opacity-0', 'translate-y-4')
    document.getElementById('btnFinalizarPedido').textContent = 'Continuar'
}

// Abre o carrinho e reseta a área de checkout para o estado inicial.
export function abrirCarrinho(){
    atualizarCarrinho()
    esconderCheckout()

    document.getElementById('camposCheckout').classList.add('hidden');
    document.getElementById('inputEndereco').value = '';
    document.getElementById('numeroCasa').value = '';
    document.querySelector('input[name="tipoPedido"][value="Entrega"]').checked = true;
    document.getElementById('camposEndereco').classList.remove('hidden');

    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    modal.classList.remove('hidden')
    setTimeout(() => {
        conteudo.classList.remove('translate-x-full')
    }, 10)
}

// Fecha o carrinho lateral com a animação de saída.
export function fecharCarrinho(){
    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    conteudo.classList.add('translate-x-full')

    setTimeout(() => {
        modal.classList.add('hidden')
    },300)
}

// Fecha o carrinho quando o usuário clica fora do painel lateral.
export function fecharCarrinhoPorFora(event) {
    if(event.target === document.getElementById('modalCarrinho')) fecharCarrinho()
}

// Adiciona o prato atual ao carrinho com quantidade e observação.
export async function adicionarPratoAoCarrinho(event) {
    event.stopPropagation()

    const pratoAtivo = getPratoAtivo()
    const restauranteAtivo = getRestauranteAtivo()
    const carrinho = getCarrinho()

    if(!pratoAtivo) return

    const observacao = document.getElementById('observacaoPrato').value.trim()
    const itemDeOutroRestaurante = carrinho.length > 0 && carrinho[0].idRestaurante !== restauranteAtivo.id

    if(itemDeOutroRestaurante){
        const confirmarTroca = await mostrarConfirmacao(
            'Trocar restaurante?',
            `Seu carrinho tem itens de ${carrinho[0].nomeRestaurante}. Deseja limpar o carrinho para pedir em ${restauranteAtivo.nome}?`,
            'Limpar carrinho'
        )

        if(!confirmarTroca) return

        limparCarrinho()
        atualizarCarrinho()
        contadorCarrinho()
    }

    adicionarItemCarrinho({
        idRestaurante: restauranteAtivo.id,
        nomeRestaurante: restauranteAtivo.nome,
        idPrato: pratoAtivo.id,
        nome: pratoAtivo.nome,
        precoUnitario: pratoAtivo.preco,
        quantidade: getQtdPedido(),
        precoTotal: pratoAtivo.preco * getQtdPedido(),
        observacao
    })

    contadorCarrinho()
    fecharModalPrato()
}
