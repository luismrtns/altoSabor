import { restaurantes } from '../data.js'
import { normalizarTexto, restauranteCombinaComBusca } from './busca.js'
import { obterStatusRestaurante } from './statusRestaurante.js'

// Monta os cards da tela inicial com os restaurantes filtrados pela busca.
export function renderizarRestaurantes(termo = '') {
    const container = document.getElementById('containerRestaurantes')
    const mensagemVazia = document.getElementById('mensagemBuscaVazia')
    const termoBusca = normalizarTexto(termo.trim())
    const restaurantesFiltrados = restaurantes.filter(restaurante => restauranteCombinaComBusca(restaurante, termoBusca))
    const coresDestaque = ['#F0642F', '#F4B942', '#5B7A4D']

    container.innerHTML = ''
    mensagemVazia.classList.toggle('hidden', restaurantesFiltrados.length > 0)

    restaurantesFiltrados.forEach((restaurante, index) => {
        const status = obterStatusRestaurante(restaurante)
        const categorias = restaurante.categorias.filter(categoria => categoria !== 'Todos').slice(0, 2)
        const card = document.createElement('div')
        card.className = 'restaurant-card flex flex-col p-4 pt-5 text-preto'
        card.style.setProperty('--card-delay', `${index * 80}ms`)
        card.style.setProperty('--restaurant-accent', coresDestaque[index % coresDestaque.length])
        card.innerHTML = `
            <div class="flex items-start gap-4">
                <div class="restaurant-logo-shell w-24 h-24 md:w-28 md:h-28 p-2 flex items-center justify-center shrink-0">
                    <img class="w-full h-full object-contain transition-transform duration-300" src="${restaurante.logo}" alt="${restaurante.nome}">
                </div>

                <div class="min-w-0 flex-1 flex flex-col gap-3">
                    <div class="flex flex-col items-start gap-1.5">
                        <h3 class="text-xl leading-tight font-bold font-inter">${restaurante.nome}</h3>
                        <span class="status-badge ${status.classe} text-[11px] font-extrabold px-2.5 py-1 whitespace-nowrap">${status.texto}</span>
                    </div>

                    <div class="grid grid-cols-2 gap-x-3 gap-y-2">
                        <p class="text-preto/75 text-sm flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#C73E2B" viewBox="0 0 256 256">
                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                            </svg>
                            ${restaurante.avaliacao}
                        </p>

                        <p class="text-preto/75 text-sm flex items-center gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#C73E2B" viewBox="0 0 256 256">
                                <path d="M216,120a41,41,0,0,0-6.6.55l-5.82-15.14A55.64,55.64,0,0,1,216,104a8,8,0,0,0,0-16H196.88L183.47,53.13A8,8,0,0,0,176,48H144a8,8,0,0,0,0,16h26.51l9.23,24H152c-18.5,0-33.5,4.31-43.37,12.46a16,16,0,0,1-16.76,2.07c-10.58-4.81-73.29-30.12-73.8-30.26a8,8,0,0,0-5,15.19S68.57,109.4,79.6,120.4A55.67,55.67,0,0,1,95.43,152H79.2a40,40,0,1,0,0,16h52.12a31.91,31.91,0,0,0,30.74-23.1,56,56,0,0,1,26.59-33.72l5.82,15.13A40,40,0,1,0,216,120ZM40,168H62.62a24,24,0,1,1,0-16H40a8,8,0,0,0,0,16Zm176,16a24,24,0,0,1-15.58-42.23l8.11,21.1a8,8,0,1,0,14.94-5.74L215.35,136l.65,0a24,24,0,0,1,0,48Z"></path>
                            </svg>
                            ${restaurante.tempo}
                        </p>

                        <p class="col-span-2 text-preto/70 text-xs flex items-start gap-1.5">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#C73E2B" viewBox="0 0 256 256">
                                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                            </svg>
                            ${restaurante.endereco}
                        </p>
                    </div>
                </div>
            </div>

            <div class="flex flex-wrap gap-2 mt-4">
                ${categorias.map(categoria => `<span class="restaurant-tag px-2.5 py-1 text-[11px] font-bold">${categoria}</span>`).join('')}
            </div>

            <button
                class="btnVerCardapio primary-action group px-4 py-3 mt-4 w-full cursor-pointer font-bold flex items-center justify-between"
                data-id="${restaurante.id}">
                <span>Ver cardápio</span>
                <span aria-hidden="true" class="text-xl leading-none transition-transform duration-200 group-hover:translate-x-1">→</span>
            </button>
        `

        container.appendChild(card)
    })
}
