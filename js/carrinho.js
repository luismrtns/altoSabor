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
            <p class="text-gray-500 text-xl flex items-center justify-center gap-2 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#8F3326" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM80,140a12,12,0,1,1,12,12A12,12,0,0,1,80,140Zm78.66,48.43a8,8,0,0,1-11.09,2.23C141.07,186.34,136,184,128,184s-13.07,2.34-19.57,6.66a8,8,0,0,1-8.86-13.32C108,171.73,116.06,168,128,168s20,3.73,28.43,9.34A8,8,0,0,1,158.66,188.43ZM164,152a12,12,0,1,1,12-12A12,12,0,0,1,164,152Zm16.44-57.34-48,32a8,8,0,0,1-8.88,0l-48-32a8,8,0,1,1,8.88-13.32L128,110.39l43.56-29a8,8,0,0,1,8.88,13.32Z"></path>
                </svg>
                O seu carrinho está vazio.
            </p>
        `;
        totalCarrinho.textContent = 'R$ 0,00'
        return
    }

    let valorTotal = 0
    const nomeRestaurantePedido = carrinho[0].nomeRestaurante

    const resumoRestaurante = document.createElement('div')
    resumoRestaurante.className = 'text-sm text-gray-600 bg-red-50 border border-red-100 rounded-lg p-3'
    resumoRestaurante.innerHTML = `Pedido em <strong class="text-vermelho">${nomeRestaurantePedido}</strong>`
    lista.appendChild(resumoRestaurante)

    carrinho.forEach((item, index) => {
        valorTotal += item.precoTotal

        const div = document.createElement('div')
        div.className = 'text-xl'
        div.innerHTML = `
            <div class="flex flex-col">
                <span class="font-bold text-gray-800">${item.quantidade}x ${item.nome}</span>
                <span class="text-gray-500 text-sm">R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} cada</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold text-vermelho">R$ ${item.precoTotal.toFixed(2).replace('.', ',')}</span>
                <button class="btnRemoverItem text-gray-400 hover:text-vermelho font-bold cursor-pointer flex items-center" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="fill-vermelho p-1 hover:fill-vermelho2" viewBox="0 0 256 256">
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
                    </svg>
                </button>
                <div class="flex items-center gap-3">
                    <button class="btnDiminuirItem bg-red-100 text-vermelho w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-red-200 transition-all" data-index="${index}">-</button>
                    <span class="font-bold text-gray-800">${item.quantidade}</span>
                    <button class="btnAumentarItem bg-vermelho text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-vermelho2 transition-all" data-index="${index}">+</button>
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
