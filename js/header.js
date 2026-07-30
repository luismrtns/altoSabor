// Reforça o fundo e a sombra do cabeçalho quando a página é rolada.
export function atualizarHeaderNoScroll() {
    const header = document.getElementById('header')
    header.classList.toggle('header-scrolled', window.scrollY > 16)
}
