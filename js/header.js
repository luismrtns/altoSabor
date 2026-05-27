// Muda a cor do logo no topo quando a página é rolada.
export function atualizarHeaderNoScroll() {
    const logo = document.getElementById('logo');
    const svg = document.getElementById('svg');

    if (window.scrollY > 50) {
        logo.classList.replace('text-branco', 'text-vermelho');
        svg.classList.replace('fill-branco', 'fill-vermelho');
    } else {
        logo.classList.replace('text-vermelho', 'text-branco');
        svg.classList.replace('fill-vermelho', 'fill-branco');
    }
}
