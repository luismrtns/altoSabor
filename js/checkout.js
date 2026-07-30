import { getCarrinho, getRestauranteAtivo, limparCarrinho } from './estado.js'
import { atualizarCarrinho, contadorCarrinho, fecharCarrinho } from './carrinho.js'
import { mostrarAviso } from './modalMensagem.js'
import { obterStatusRestaurante } from './statusRestaurante.js'

// Primeiro abre o checkout; no segundo clique valida os dados e envia ao WhatsApp.
export async function finalizarPedido() {
    const carrinho = getCarrinho()
    const restauranteAtivo = getRestauranteAtivo()

    if(carrinho.length === 0) return

    if(restauranteAtivo && !obterStatusRestaurante(restauranteAtivo).aberto){
        await mostrarAviso('Estabelecimento fechado', 'Este estabelecimento está fechado no momento.')
        return
    }

    const campos = document.getElementById('camposCheckout')

    if(campos.classList.contains('hidden')){
        campos.classList.remove('hidden')
        setTimeout(() => {
            campos.classList.remove('opacity-0', 'translate-y-4')
            campos.classList.add('opacity-100', 'translate-y-0')
            document.getElementById('btnFinalizarPedido').textContent = 'Enviar pelo WhatsApp'
        }, 10)
        return
    }

    const nome = document.getElementById('nomePessoa').value
    const tipoPedido = document.querySelector('input[name="tipoPedido"]:checked')
    const endereco = document.getElementById('inputEndereco').value
    const numeroEndereco = document.getElementById('numeroCasa').value
    const pagamento = document.querySelector('input[name="pagamento"]:checked')
    let trocoMsg = ''

    if(!nome){
        await mostrarAviso('Nome obrigatório', 'Por favor, insira seu nome.')
        return
    }

    if(!tipoPedido){
        await mostrarAviso('Tipo do pedido', 'Por favor, escolha entrega ou retirada.')
        return
    }

    if(tipoPedido.value === 'Entrega' && !endereco){
        await mostrarAviso('Endereço obrigatório', 'Por favor, insira um endereço para entrega.')
        return
    }

    if(!pagamento){
        await mostrarAviso('Forma de pagamento', 'Por favor, escolha uma forma de pagamento.')
        return
    }

    const pagamentoSelecionado = pagamento.value

    if(pagamentoSelecionado === 'Dinheiro'){
        const valorPago = parseFloat(document.getElementById('inputTroco').value)
        const totalCarrinho = carrinho.reduce((acc, item) => acc + item.precoTotal, 0)

        if(!valorPago || valorPago < totalCarrinho){
            await mostrarAviso('Troco inválido', 'Informe um valor em dinheiro maior ou igual ao total do pedido.')
            return;
        }

        const valorTroco = valorPago - totalCarrinho
        trocoMsg = `%0A*Troco para:* R$ ${valorPago.toFixed(2).replace('.', ',')} (Levar R$ ${valorTroco.toFixed(2).replace('.', ',')} de troco)`;
    }

    const telefone = restauranteAtivo.whatsapp;
    let texto = `*Novo Pedido!*%0A%0A`;
    let total = 0;

    carrinho.forEach(item => {
        texto += `${item.quantidade}x ${item.nome} - R$ ${item.precoTotal.toFixed(2).replace('.', ',')}%0A`;
        if(item.observacao){
            texto += `_Obs: ${item.observacao}_%0A`
        }
        total += item.precoTotal;
    });

    texto += `%0A*Cliente:* ${nome}`
    texto += `%0A*Tipo:* ${tipoPedido.value}`;
    if(tipoPedido.value === 'Entrega'){
        texto += `%0A*Endereço:* ${endereco}, Nº: ${numeroEndereco}`;
    }else{
        texto += `%0A*Retirada em:* ${restauranteAtivo.endereco}`;
    }
    texto += `%0A*Pagamento:* ${pagamentoSelecionado}`;
    texto += trocoMsg
    texto += `%0A%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/${telefone}?text=${texto}`, '_blank');

    limparCarrinho()
    atualizarCarrinho()
    contadorCarrinho()
    document.getElementById('btnFinalizarPedido').textContent = 'Continuar'
    fecharCarrinho()
}

// Alterna entre entrega e retirada, mostrando ou escondendo o endereço.
export function alternarTipoPedido(event) {
    const camposEndereco = document.getElementById('camposEndereco')

    if(event.target.value === 'Retirada'){
        camposEndereco.classList.add('hidden')
        document.getElementById('inputEndereco').value = ''
        document.getElementById('numeroCasa').value = ''
    }else{
        camposEndereco.classList.remove('hidden')
    }
}

// Mostra ou esconde o campo de troco de acordo com a forma de pagamento.
export function alternarFormaPagamento(event) {
    const containerTroco = document.getElementById('containerTroco')
    const inputTroco = document.getElementById('inputTroco')
    const textoTrocoCalculado = document.getElementById('textoTrocoCalculado')

    if (event.target.value === 'Dinheiro') {
        containerTroco.classList.remove('hidden');
        containerTroco.classList.add('flex');
        return
    }

    containerTroco.classList.add('hidden');
    containerTroco.classList.remove('flex');
    inputTroco.value = '';
    textoTrocoCalculado.textContent = '';
}

// Calcula o troco em tempo real enquanto o usuário digita o valor pago.
export function calcularTroco(event) {
    const carrinho = getCarrinho()
    const textoTrocoCalculado = document.getElementById('textoTrocoCalculado')
    const totalPedido = carrinho.reduce((acumulador, item) => acumulador + item.precoTotal, 0);
    const valorPago = parseFloat(event.target.value);

    if (isNaN(valorPago) || valorPago <= 0) {
        textoTrocoCalculado.textContent = '';
        return;
    }

    if (valorPago < totalPedido) {
        textoTrocoCalculado.textContent = 'Valor insuficiente para cobrir o pedido.';
        textoTrocoCalculado.className = 'checkout-change-message text-sm font-bold text-vermelho';
    } else if (valorPago === totalPedido) {
        textoTrocoCalculado.textContent = 'Não precisa de troco.';
        textoTrocoCalculado.className = 'checkout-change-message text-sm font-bold text-gray-500';
    } else {
        const troco = valorPago - totalPedido;
        textoTrocoCalculado.textContent = `O entregador levará R$ ${troco.toFixed(2).replace('.', ',')} de troco.`;
        textoTrocoCalculado.className = 'checkout-change-message text-sm font-bold text-green-600';
    }
}
