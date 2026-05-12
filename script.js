let restauranteAtivo = null
let carrinho = []

function renderizarRestaurantes() {
    const container = document.getElementById('containerRestaurantes')
    container.innerHTML = ''

    restaurantes.forEach((restaurante) => {
        const card = document.createElement('div')
        card.className = 'border flex flex-col gap-2 bg-white/5 backdrop-blur-lg border-branco/20 text-branco rounded p-4 hover:shadow-[5px_5px_0_rgba(189,18,44,1)] transition-all duration-200'
        card.innerHTML = `
            <div class="h-40 flex items-center justify-center mb-2">
                <img class="h-full object-contain" src="${restaurante.logo}" alt="${restaurante.nome}">
            </div>

            <div class="flex items-center gap-2 my-1">
                <h3 class="text-xl font-bold font-inter">${restaurante.nome}</h3>
                <p class="text-branco/80 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                        <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                    </svg>
                    ${restaurante.avaliacao}
                </p>
            </div>

            <p class="text-branco/80 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                    <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.08,16.08,0,0,0,6.41,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16,16,0,0,0-6.36-12.77L141.26,128l52.38-39.59A16.05,16.05,0,0,0,200,75.64Z"></path>
                </svg>
                ${restaurante.tempo}
            </p>

            <p class="text-branco/80 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                    <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                </svg>
                ${restaurante.endereco}
            </p>

            <p class="text-branco/80 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                    <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm56,112H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"></path>
                </svg>
                ${restaurante.horario}
            </p>

            <button 
                class="btnVerCardapio bg-vermelho text-white px-4 py-2 rounded-full mt-3 w-full cursor-pointer transition-all duration-200 hover:bg-vermelho2"
                data-id="${restaurante.id}">
                Ver Cardápio
            </button>
        `

        container.appendChild(card)
    })
}
renderizarRestaurantes()

function mostrarTela(tela){
    document.getElementById('telaRestaurantes').classList.add('hidden');
    document.getElementById('telaCardapio').classList.add('hidden');

    document.getElementById(tela).classList.remove('hidden');
}

function abrirCardapio(id){
    restauranteAtivo = restaurantes.find(r => r.id === id);

    document.getElementById('logoCardapio').src = restauranteAtivo.logo;
    document.getElementById('nomeCardapio').textContent = restauranteAtivo.nome;
    document.getElementById('notaCardapio').textContent = restauranteAtivo.avaliacao;
    document.getElementById('tempoTexto').textContent = restauranteAtivo.tempo
    document.getElementById('enderecoTexto').textContent = restauranteAtivo.endereco
    document.getElementById('horarioTexto').textContent = restauranteAtivo.horario

    renderizarCategorias()
    renderizarPratos()
    mostrarTela('telaCardapio')
}

document.getElementById('containerRestaurantes').addEventListener('click', (event) => {
    const btn = event.target.closest('.btnVerCardapio');
    if(!btn) return

    const id = +btn.dataset.id
    abrirCardapio(id)
})

document.getElementById('.btnVoltarRestaurantes').addEventListener('click', () => {
    mostrarTela('telaRestaurantes')
})

function renderizarCategorias(categoriaAtiva = 'todos'){
    const container = document.getElementById('containerCategorias');
    container.innerHTML = ''

    restauranteAtivo.categorias.forEach((categoria)=>{
        const btn = document.createElement('button');
        const ativo = categoria === categoriaAtiva

        btn.className = `px-4 rounded-full text-sm font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap
            ${ativo ? 'bg-vermelho text-branco' : 'bg-branco/10 text-branco/80 hover:bg-vermelho2'}`;

        btn.textContent = categoria
        btn.dataset.categoria = categoria

        btn.addEventListener('click', () => {
            renderizarCategorias(categoria)
            renderizarPratos(categoria)
        })

        container.appendChild(btn)
    })
}

function renderizarPratos(categoriaAtiva = 'todos'){
    console.log('Categoria ativa:', JSON.stringify(categoriaAtiva))
    console.log('Pratos do restaurante:', restauranteAtivo.pratos)
    const container = document.getElementById('containerPratos');
    container.innerHTML = ''

    const pratosFiltrados = categoriaAtiva === 'todos'
        ? restauranteAtivo.pratos : restauranteAtivo.pratos.filter(p => p.categoria === categoriaAtiva)
    console.log('Pratos filtrados:', pratosFiltrados)


    pratosFiltrados.forEach(prato => {
        const card = document.createElement('div')
        card.className = 'border border-branco/20 bg-white/5 backdrop-blur-lg text-branco rounded p-3 flex flex-col gap-2'


        card.innerHTML = `
            <div class="h-32 flex items-center justify-center rounded overflow-hidden">
                <img src="${prato.imagem}" alt="${prato.nome}" class="h-full w-full object-cover">
            </div>

            <h3 class="font-bold font-inter">${prato.nome}</h3>
            <p class="text-branco/70 text-sm">${prato.descricao}</p>
            <p class="text-vermelho font-bold">R$ ${prato.preco.toFixed(2).replace('.', ',')}</p>

            <button 
                class="btnAdicionarPrato bg-vermelho text-white px-4 py-2 rounded-full w-full cursor-pointer transition-all duration-200 hover:bg-vermelho2"
                data-id="${prato.id}">
                + Adicionar
            </button>
        `

        container.appendChild(card)
    })
}