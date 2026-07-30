// Esconde as telas principais e mostra apenas a tela recebida por parâmetro.
export function mostrarTela(tela){
    document.getElementById('telaRestaurantes').classList.add('hidden');
    document.getElementById('telaCardapio').classList.add('hidden');

    document.getElementById(tela).classList.remove('hidden');
}

// Volta da tela de cardápio para a lista de restaurantes.
export function voltarParaRestaurantes() {
    mostrarTela('telaRestaurantes')
    window.history.pushState({}, '', window.location.pathname)
    window.scrollTo({ top: 0, behavior: 'auto' })
}
