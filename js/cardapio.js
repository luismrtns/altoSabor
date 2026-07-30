import { restaurantes } from '../data.js'
import { setRestauranteAtivo } from './estado.js'
import { mostrarTela } from './navegacao.js'
import { obterStatusRestaurante } from './statusRestaurante.js'
import { renderizarCategorias } from './categorias.js'
import { renderizarPratos } from './pratos.js'

// Carrega os dados do restaurante selecionado e abre a tela do cardápio.
export function abrirCardapio(id){
    const restauranteAtivo = restaurantes.find(r => r.id === id);
    if(!restauranteAtivo) return

    setRestauranteAtivo(restauranteAtivo)

    const status = obterStatusRestaurante(restauranteAtivo)
    const novaUrl = `${window.location.pathname}?restaurante=${id}`
    window.history.pushState({},'', novaUrl)

    document.getElementById('logoCardapio').src = restauranteAtivo.logo;
    document.getElementById('nomeCardapio').textContent = restauranteAtivo.nome;
    document.getElementById('statusCardapio').textContent = status.texto;
    document.getElementById('statusCardapio').className = `status-badge ${status.classe} text-xs font-bold px-3 py-1 w-fit`;
    document.getElementById('notaCardapio').textContent = restauranteAtivo.avaliacao;
    document.getElementById('tempoTexto').textContent = restauranteAtivo.tempo
    document.getElementById('enderecoTexto').textContent = restauranteAtivo.endereco
    document.getElementById('containerCategorias').innerHTML = '';

    renderizarCategorias();
    renderizarPratos();
    mostrarTela('telaCardapio');
    window.scrollTo({ top: 0, behavior: 'auto' })
}

// Abre o cardápio quando o usuário clica em "Ver Cardápio".
export function abrirCardapioPorClique(event) {
    const btn = event.target.closest('.btnVerCardapio');
    if(btn) abrirCardapio(+btn.dataset.id)
}

// Abre direto um restaurante quando a URL vem com ?restaurante=ID.
export function abrirRestauranteCompartilhado(){
    const parametros = new URLSearchParams(window.location.search)
    const idRestaurante = +parametros.get('restaurante')

    if(idRestaurante && restaurantes.some(restaurante => restaurante.id === idRestaurante)){
        abrirCardapio(idRestaurante)
    }
}
