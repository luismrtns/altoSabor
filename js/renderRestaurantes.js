import { restaurantes } from '../data.js'
import { normalizarTexto, restauranteCombinaComBusca } from './busca.js'
import { obterStatusRestaurante } from './statusRestaurante.js'

// Monta os cards da tela inicial com os restaurantes filtrados pela busca.
export function renderizarRestaurantes(termo = '') {
    const container = document.getElementById('containerRestaurantes')
    const mensagemVazia = document.getElementById('mensagemBuscaVazia')
    const termoBusca = normalizarTexto(termo.trim())
    const restaurantesFiltrados = restaurantes.filter(restaurante => restauranteCombinaComBusca(restaurante, termoBusca))

    container.innerHTML = ''
    mensagemVazia.classList.toggle('hidden', restaurantesFiltrados.length > 0)

    restaurantesFiltrados.forEach((restaurante) => {
        const status = obterStatusRestaurante(restaurante)
        const card = document.createElement('div')
        card.className = 'border-2 flex flex-col gap-2 bg-branco/30 backdrop-blur border-preto/5 text-preto rounded-lg p-4 shadow-xl transition-all duration-200'
        card.innerHTML = `
            <div class="flex items-center gap-4">
                <div class="w-28 h-28 flex items-center justify-center shrink-0">
                    <img class="w-full h-full object-contain" src="${restaurante.logo}" alt="${restaurante.nome}">
                </div>

                <div class="flex-1 flex flex-col gap-3">
                    <div class="flex flex-col items-start gap-2">
                        <h3 class="text-xl font-bold font-inter">${restaurante.nome}</h3>
                        <span class="${status.classe} text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">${status.texto}</span>
                    </div>

                    <div class="flex flex-col gap-2">
                        <p class="text-preto/80 text-sm flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#B84A34" viewBox="0 0 256 256">
                                <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                            </svg>
                            ${restaurante.avaliacao}
                        </p>

                        <p class="text-preto/80 text-sm flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#B84A34" viewBox="0 0 256 256">
                                <path d="M216,120a41,41,0,0,0-6.6.55l-5.82-15.14A55.64,55.64,0,0,1,216,104a8,8,0,0,0,0-16H196.88L183.47,53.13A8,8,0,0,0,176,48H144a8,8,0,0,0,0,16h26.51l9.23,24H152c-18.5,0-33.5,4.31-43.37,12.46a16,16,0,0,1-16.76,2.07c-10.58-4.81-73.29-30.12-73.8-30.26a8,8,0,0,0-5,15.19S68.57,109.4,79.6,120.4A55.67,55.67,0,0,1,95.43,152H79.2a40,40,0,1,0,0,16h52.12a31.91,31.91,0,0,0,30.74-23.1,56,56,0,0,1,26.59-33.72l5.82,15.13A40,40,0,1,0,216,120ZM40,168H62.62a24,24,0,1,1,0-16H40a8,8,0,0,0,0,16Zm176,16a24,24,0,0,1-15.58-42.23l8.11,21.1a8,8,0,1,0,14.94-5.74L215.35,136l.65,0a24,24,0,0,1,0,48Z"></path>
                            </svg>
                            ${restaurante.tempo}
                        </p>

                        <p class="text-preto/80 text-sm flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#B84A34" viewBox="0 0 256 256">
                                <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                            </svg>
                            ${restaurante.endereco}
                        </p>
                    </div>
                </div>
            </div>

            <button
                class="btnVerCardapio bg-vermelho text-white px-4 py-2 rounded-full mt-3 w-full cursor-pointer transition-all duration-200 hover:bg-vermelho2"
                data-id="${restaurante.id}">
                Ver Cardápio
            </button>
        `

        container.appendChild(card)
    })
}
