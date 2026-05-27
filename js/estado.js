let restauranteAtivo = null
let pratoAtivo = null
let qtdPedido = 1
let carrinho = []

export function getRestauranteAtivo() {
    return restauranteAtivo
}

export function setRestauranteAtivo(restaurante) {
    restauranteAtivo = restaurante
}

export function getPratoAtivo() {
    return pratoAtivo
}

export function setPratoAtivo(prato) {
    pratoAtivo = prato
}

export function getQtdPedido() {
    return qtdPedido
}

export function resetQtdPedido() {
    qtdPedido = 1
}

export function aumentarQtdPedido() {
    qtdPedido++
}

export function diminuirQtdPedido() {
    if(qtdPedido > 1) qtdPedido--
}

export function getCarrinho() {
    return carrinho
}

export function setCarrinho(novoCarrinho) {
    carrinho = novoCarrinho
}

export function limparCarrinho() {
    carrinho = []
}

export function adicionarItemCarrinho(item) {
    carrinho.push(item)
}

export function removerItemCarrinho(index) {
    carrinho.splice(index, 1)
}

export function aumentarItemCarrinho(index) {
    carrinho[index].quantidade++
    carrinho[index].precoTotal = carrinho[index].quantidade * carrinho[index].precoUnitario
}

export function diminuirItemCarrinho(index) {
    if(carrinho[index].quantidade > 1){
        carrinho[index].quantidade--
        carrinho[index].precoTotal = carrinho[index].precoUnitario * carrinho[index].quantidade
        return
    }

    removerItemCarrinho(index)
}
