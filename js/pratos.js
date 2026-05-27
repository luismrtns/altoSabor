import { getRestauranteAtivo } from './estado.js'

// Mostra os pratos do restaurante, filtrando pela categoria selecionada.
export function renderizarPratos(categoriaAtiva = 'Todos'){
    const restauranteAtivo = getRestauranteAtivo()
    const container = document.getElementById('containerPratos');
    container.innerHTML = ''

    const pratosFiltrados = categoriaAtiva === 'Todos'
        ? restauranteAtivo.pratos : restauranteAtivo.pratos.filter(p => p.categoria === categoriaAtiva)

    pratosFiltrados.forEach((prato, index) => {
        const card = document.createElement('div')
        card.className = 'border border-preto/10 bg-branco/30 backdrop-blur shadow-lg text-preto rounded-lg p-3 flex flex-col gap-2 opacity-0 translate-x-8 transition-all duration-500 h-full'

        card.innerHTML = `
               <div class="flex flex-row md:flex-col gap-3">
                    <div class="w-28 h-28 md:w-full md:h-36 shrink-0">
                        <img
                            src="${prato.imagem}"
                            alt="${prato.nome}"
                            class="w-full h-full object-cover rounded-lg">
                    </div>

                    <div class="flex flex-col flex-1 justify-between">
                        <div class="flex flex-col gap-1">
                            <h3 class="font-bold font-inter">${prato.nome}</h3>
                            <p class="text-preto/80 text-sm line-clamp-2">${prato.descricao}</p>
                        </div>

                        <div class="flex items-center justify-between mt-2">
                            <p class="text-vermelho font-bold">R$ ${prato.preco.toFixed(2).replace('.', ',')}</p>

                            <button
                                class="btnAdicionarPrato bg-vermelho text-white w-8 h-8 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 hover:bg-vermelho2 shrink-0"
                                data-id="${prato.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FAF6ED" viewBox="0 0 256 256">
                                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm48-88a8,8,0,0,1-8,8H136v32a8,8,0,0,1-16,0V136H88a8,8,0,0,1,0-16h32V88a8,8,0,0,1,16,0v32h32A8,8,0,0,1,176,128Z"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
        `

        container.appendChild(card)
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-x-8');
        }, 10 + (index * 50));
    })
}
