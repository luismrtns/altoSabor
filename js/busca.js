// Remove acentos e deixa o texto em minúsculas para facilitar a busca.
export function normalizarTexto(texto) {
    return texto
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
}

// Verifica se o restaurante combina com o termo buscado.
export function restauranteCombinaComBusca(restaurante, termoBusca) {
    if(!termoBusca) return true

    const textosBusca = [
        restaurante.nome,
        restaurante.endereco,
        ...restaurante.categorias,
        ...restaurante.pratos.flatMap(prato => [prato.nome, prato.descricao, prato.categoria])
    ]

    return textosBusca.some(texto => normalizarTexto(texto).includes(termoBusca))
}
