let restauranteAtivo = null
let carrinho = []

function renderizarRestaurantes() {
    const container = document.getElementById('containerRestaurantes')
    container.innerHTML = ''

    restaurantes.forEach((restaurante) => {
        const card = document.createElement('div')
        card.className = 'border-2 flex flex-col gap-2 bg-branco/30 backdrop-blur border-preto/5 text-preto rounded p-4 shadow-xl transition-all duration-200'
        card.innerHTML = `
            <div class="h-40 flex items-center justify-center mb-2">
                <img class="h-full object-contain" src="${restaurante.logo}" alt="${restaurante.nome}">
            </div>

            <div class="flex items-center gap-2 my-1">
                <h3 class="text-xl font-bold font-inter">${restaurante.nome}</h3>
                <p class="text-preto/80 flex items-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                        <path d="M234.29,114.85l-45,38.83L203,211.75a16.4,16.4,0,0,1-24.5,17.82L128,198.49,77.47,229.57A16.4,16.4,0,0,1,53,211.75l13.76-58.07-45-38.83A16.46,16.46,0,0,1,31.08,86l59-4.76,22.76-55.08a16.36,16.36,0,0,1,30.27,0l22.75,55.08,59,4.76a16.46,16.46,0,0,1,9.37,28.86Z"></path>
                    </svg>
                    ${restaurante.avaliacao}
                </p>
            </div>

            <p class="text-preto/80 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                    <path d="M200,75.64V40a16,16,0,0,0-16-16H72A16,16,0,0,0,56,40V76a16.08,16.08,0,0,0,6.41,12.8L114.67,128,62.4,167.2A16.07,16.07,0,0,0,56,180v36a16,16,0,0,0,16,16H184a16,16,0,0,0,16-16V180.36a16,16,0,0,0-6.36-12.77L141.26,128l52.38-39.59A16.05,16.05,0,0,0,200,75.64Z"></path>
                </svg>
                ${restaurante.tempo}
            </p>

            <p class="text-preto/80 text-sm flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#BD122C" viewBox="0 0 256 256">
                    <path d="M128,16a88.1,88.1,0,0,0-88,88c0,75.3,80,132.17,83.41,134.55a8,8,0,0,0,9.18,0C136,236.17,216,179.3,216,104A88.1,88.1,0,0,0,128,16Zm0,56a32,32,0,1,1-32,32A32,32,0,0,1,128,72Z"></path>
                </svg>
                ${restaurante.endereco}
            </p>

            <p class="text-preto/80 text-sm flex items-center gap-1">
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
    if(btn) abrirCardapio(+btn.dataset.id)
})

document.getElementById('containerPratos').addEventListener('click', (event) => {
    const btn = event.target.closest('.btnAdicionarPrato');
    if(btn) abrirModalPrato(+btn.dataset.id)
})

function renderizarCategorias(categoriaAtiva = 'Todos'){
    const container = document.getElementById('containerCategorias');
    container.innerHTML = ''

    restauranteAtivo.categorias.forEach((categoria)=>{
        const btn = document.createElement('button');
        const ativo = categoria === categoriaAtiva

        btn.className = `py-2 px-4 border-1 border-vermelho rounded-full text-md font-semibold cursor-pointer transition-all duration-200 whitespace-nowrap
            ${ativo ? 'bg-vermelho text-branco' : 'bg-branco/10 backdrop-blur-lg text-preto/80 hover:text-branco hover:bg-vermelho2'}`;

        btn.textContent = categoria

        btn.addEventListener('click', () => {
            renderizarCategorias(categoria)
            renderizarPratos(categoria)
        })

        container.appendChild(btn)
    })
}

function renderizarPratos(categoriaAtiva = 'Todos'){
    const container = document.getElementById('containerPratos');
    container.innerHTML = ''

    const pratosFiltrados = categoriaAtiva === 'Todos'
        ? restauranteAtivo.pratos : restauranteAtivo.pratos.filter(p => p.categoria === categoriaAtiva)

    pratosFiltrados.forEach(prato => {
        const card = document.createElement('div')
        card.className = 'h-full items-stretch border border-preto/10 bg-branco/30 backdrop-blur shadow-lg text-preto rounded-lg p-3 flex flex-col gap-2'

        card.innerHTML = `
               <div class="flex flex-row md:flex-col gap-3">
        
                    <!-- IMAGEM -->
                    <div class="w-28 h-28 md:w-full md:h-36 shrink-0">
                        <img 
                            src="${prato.imagem}" 
                            alt="${prato.nome}" 
                            class="w-full h-full object-cover rounded-lg">
                    </div>
            
                    <!-- INFO -->
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
    })
}

let pratoAtivo = null
let qtdPedido = 1
function abrirModalPrato(id) {
    pratoAtivo = restauranteAtivo.pratos.find(p => p.id === id)
    qtdPedido = 1

    document.getElementById('modalPratoImagem').src = pratoAtivo.imagem
    document.getElementById('modalPratoNome').textContent = pratoAtivo.nome
    document.getElementById('modalPratoDescricao').textContent = pratoAtivo.descricao
    document.getElementById('modalPratoPreco').textContent = `R$ ${pratoAtivo.preco.toFixed(2).replace('.', ',')}`
    document.getElementById('quantidadeModal').textContent = qtdPedido

    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    modal.classList.remove('hidden')

    setTimeout(() => {
        conteudo.classList.remove('translate-y-full', 'md:scale-90', 'md:opacity-0')
        conteudo.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100')
    }, 10)
}

function fecharModalPrato(){
    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    conteudo.classList.remove('translate-y-0', 'md:scale-100', 'md:opacity-100')
    conteudo.classList.add('translate-y-full', 'md:scale-90', 'md:opacity-0')

    setTimeout(() => {
        modal.classList.add('hidden')
    }, 300)
}

document.getElementById('btnFecharModalPrato').addEventListener('click', fecharModalPrato)

document.getElementById('modalPrato').addEventListener('click', (event) => {
    if(event.target === document.getElementById('modalPrato')){
        fecharModalPrato()
    }
})

document.getElementById('btnAumentar').addEventListener('click', () => {
    qtdPedido++
    document.getElementById('quantidadeModal').textContent = qtdPedido
})

document.getElementById('btnDiminuir').addEventListener('click', () => {
    if (qtdPedido > 1) {
        qtdPedido--
        document.getElementById('quantidadeModal').textContent = qtdPedido
    }
    contadorCarrinho()
})

function atualizarCarrinho(){
    const lista = document.getElementById('listaItensCarrinho')
    const totalCarrinho = document.getElementById('valorTotalCarrinho')

    lista.innerHTML = ''

    if(carrinho.length === 0){
        lista.innerHTML = `
            <p class="text-gray-500 text-xl flex items-center justify-center gap-2 mt-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#991B1B" viewBox="0 0 256 256">
                <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24ZM80,140a12,12,0,1,1,12,12A12,12,0,0,1,80,140Zm78.66,48.43a8,8,0,0,1-11.09,2.23C141.07,186.34,136,184,128,184s-13.07,2.34-19.57,6.66a8,8,0,0,1-8.86-13.32C108,171.73,116.06,168,128,168s20,3.73,28.43,9.34A8,8,0,0,1,158.66,188.43ZM164,152a12,12,0,1,1,12-12A12,12,0,0,1,164,152Zm16.44-57.34-48,32a8,8,0,0,1-8.88,0l-48-32a8,8,0,1,1,8.88-13.32L128,110.39l43.56-29a8,8,0,0,1,8.88,13.32Z"></path>
                </svg>
                O seu carrinho está vazio.
            </p>
`;
        totalCarrinho.textContent = 'R$ 0,00'
        return
    }

    let valorTotal = 0

    carrinho.forEach((item, index) => {
        valorTotal += item.precoTotal

        const div = document.createElement('div')
        div.className = 'text-xl'
        div.innerHTML = `
            <div class="flex flex-col">
                <span class="font-bold text-gray-800">${item.quantidade}x ${item.nome}</span>
                <span class="text-gray-500 text-sm">R$ ${item.precoUnitario.toFixed(2).replace('.', ',')} cada</span>
            </div>
            <div class="flex items-center gap-3">
                <span class="font-bold text-vermelho">R$ ${item.precoTotal.toFixed(2).replace('.', ',')}</span>
                <button class="btnRemoverItem text-gray-400 hover:text-vermelho font-bold cursor-pointer flex items-center" data-index="${index}">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="fill-vermelho p-1 hover:fill-vermelho2" viewBox="0 0 256 256">
                        <path d="M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM112,168a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm0-120H96V40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8Z"></path>
                    </svg>
                </button>
                <div class="flex items-center gap-3">
                    <button class="btnDiminuirItem bg-red-100 text-vermelho w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-red-200 transition-all" data-index="${index}">−</button>
                    <span class="font-bold text-gray-800">${item.quantidade}</span>
                    <button class="btnAumentarItem bg-vermelho text-white w-8 h-8 rounded-full flex items-center justify-center font-bold cursor-pointer hover:bg-vermelho2 transition-all" data-index="${index}">+</button>
                </div>
            </div>
        `
        lista.appendChild(div)
    })
    totalCarrinho.textContent = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`
}

document.getElementById('listaItensCarrinho').addEventListener('click', (event) => {
    const btnRemover = event.target.closest('.btnRemoverItem')
    const btnAumentar = event.target.closest('.btnAumentarItem')
    const btnDiminuir = event.target.closest('.btnDiminuirItem')

    if(btnRemover){
        const index = +btnRemover.dataset.index
        carrinho.splice(index,1)
        atualizarCarrinho()
        contadorCarrinho()
    }

    if(btnAumentar){
        const index = +btnAumentar.dataset.index
        carrinho[index].quantidade++
        carrinho[index].precoTotal = carrinho[index].quantidade * carrinho[index].precoUnitario
        atualizarCarrinho()
        contadorCarrinho()
        return
    }

    if(btnDiminuir){
        const index = +btnDiminuir.dataset.index
        if(carrinho[index].quantidade > 1){
            carrinho[index].quantidade--
            carrinho[index].precoTotal = carrinho[index].precoUnitario * carrinho[index].quantidade
        }else{
            carrinho.splice(index,1) // se a quantidade for 0, o produto some do carrinho
        }
        contadorCarrinho()
        atualizarCarrinho()
        return
    }
})

function abrirCarrinho(){
    atualizarCarrinho()
    const campos = document.getElementById('camposCheckout')
    campos.classList.remove('opacity-100', 'translate-y-0')
    campos.classList.add('hidden', 'opacity-0', 'translate-y-4')

    document.getElementById('camposCheckout').classList.add('hidden');
    document.getElementById('inputEndereco').value = '';

    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    modal.classList.remove('hidden')
    setTimeout(() => {
        conteudo.classList.remove('translate-x-full')
    }, 10)
}

function fecharCarrinho(){
    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    conteudo.classList.add('translate-x-full')

    setTimeout(() => {
        modal.classList.add('hidden')
    },300)
}

document.getElementById('btnAbrirCarrinho').addEventListener('click', () => {
    console.log('clicou no carrinho')
    abrirCarrinho()
})
document.getElementById('btnFecharCarrinho').addEventListener('click', fecharCarrinho)

document.getElementById('modalCarrinho').addEventListener('click', (event) => {
    if(event.target === document.getElementById('modalCarrinho')) fecharCarrinho()
})

function contadorCarrinho(){
    const badge = document.getElementById('contador')
    const bntCarrinho = document.getElementById('btnAbrirCarrinho')

    const totalItens = carrinho.reduce((acumulador, item) => acumulador + item.quantidade, 0)

    if(totalItens > 0){
        badge.textContent = totalItens
        badge.classList.remove('hidden')

        bntCarrinho.classList.add('scale-110')
        setTimeout(() => {
            bntCarrinho.classList.remove('scale-110')
        }, 300)
    }else{
        badge.classList.add('hidden')
    }
}

document.getElementById('btnAdicionarCarrinho').addEventListener('click', (event) => {
    event.stopPropagation()
    if(!pratoAtivo) return

    const itemPedido = {
        idPrato: pratoAtivo.id,
        nome: pratoAtivo.nome,
        precoUnitario: pratoAtivo.preco,
        quantidade: qtdPedido,
        precoTotal: pratoAtivo.preco * qtdPedido
    }

    carrinho.push(itemPedido)

    contadorCarrinho()
    fecharModalPrato()
})

document.getElementById('btnFinalizarPedido').addEventListener('click', () => {
    console.log('clicou em finalizar')
    console.log('carrinho:', carrinho)
    console.log('campos:', document.getElementById('camposCheckout'))
    if(carrinho.length === 0) return
    const campos = document.getElementById('camposCheckout')

    if(campos.classList.contains('hidden')){
        campos.classList.remove('hidden')
        setTimeout(() => {
            campos.classList.remove('opacity-0', 'translate-y-4')
            campos.classList.add('opacity-100', 'translate-y-0')
        }, 10)
        return
    }

    const endereco = document.getElementById('inputEndereco').value
    const numeroEndereco = document.getElementById('numeroCasa').value
    const pagamento = document.querySelector('input[name="pagamento"]:checked')

    if(!endereco){
        alert('Por favor, insira um endereço!')
        return
    }

    if(!pagamento){
        alert('Por favor, insira um método pagamento!')
        return
    }

    const pagamentoSelecionado = pagamento.value

    const telefone = restauranteAtivo.whatsapp;
    let texto = `*Novo Pedido!*%0A%0A`;
    let total = 0;

    carrinho.forEach(item => {
        texto += `${item.quantidade}x ${item.nome} - R$ ${item.precoTotal.toFixed(2).replace('.', ',')}%0A`;
        total += item.precoTotal;
    });

    texto += `%0A*Endereço:* ${endereco}, Nº: ${numeroEndereco}`;
    texto += `%0A*Pagamento:* ${pagamentoSelecionado}`;
    texto += `%0A%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/${telefone}?text=${texto}`, '_blank');
})

window.addEventListener('scroll', () => {
    const logo = document.getElementById('logo');
    const svg = document.getElementById('svg');

    if (window.scrollY > 50) {
        // Quando descer a tela: muda para vermelho
        logo.classList.replace('text-branco', 'text-vermelho');
        svg.classList.replace('fill-branco', 'fill-vermelho');
    } else {
        // Quando voltar para o topo: volta para transparente/branco
        logo.classList.replace('text-vermelho', 'text-branco');
        svg.classList.replace('fill-vermelho', 'fill-branco');
    }
});