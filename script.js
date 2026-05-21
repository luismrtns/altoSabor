let restauranteAtivo = null
let carrinho = []

// Converte um horário no formato "HH:MM" para minutos desde o começo do dia.
function horarioParaMinutos(horario) {
    const [horas, minutos] = horario.split(':').map(Number)
    return (horas * 60) + minutos
}

// Verifica se o restaurante está aberto agora e retorna o texto/classe do selo.
function obterStatusRestaurante(restaurante) {
    const [abertura, fechamento] = restaurante.horario.split(' - ')
    const agora = new Date()
    const minutosAgora = (agora.getHours() * 60) + agora.getMinutes()
    const minutosAbertura = horarioParaMinutos(abertura)
    const minutosFechamento = horarioParaMinutos(fechamento)

    const aberto = minutosFechamento > minutosAbertura
        ? minutosAgora >= minutosAbertura && minutosAgora < minutosFechamento
        : minutosAgora >= minutosAbertura || minutosAgora < minutosFechamento

    return {
        aberto,
        texto: aberto ? 'Aberto agora' : 'Fechado',
        classe: aberto ? 'bg-green-100 text-green-700' : 'bg-red-100 text-vermelho'
    }
}

// Monta os cards da tela inicial com todos os restaurantes cadastrados.
function renderizarRestaurantes() {
    const container = document.getElementById('containerRestaurantes')
    container.innerHTML = ''

    restaurantes.forEach((restaurante) => {
        const status = obterStatusRestaurante(restaurante)
        const card = document.createElement('div')
        card.className = 'border-2 flex flex-col gap-2 bg-branco/30 backdrop-blur border-preto/5 text-preto rounded p-4 shadow-xl transition-all duration-200'
        card.innerHTML = `
            <div class="h-40 flex items-center justify-center mb-2">
                <img class="h-full object-contain" src="${restaurante.logo}" alt="${restaurante.nome}">
            </div>

            <div class="flex items-center justify-between gap-2 my-1">
                <h3 class="text-xl font-bold font-inter">${restaurante.nome}</h3>
                <span class="${status.classe} text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">${status.texto}</span>
            </div>

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

// Esconde as telas principais e mostra apenas a tela recebida por parâmetro.
function mostrarTela(tela){
    document.getElementById('telaRestaurantes').classList.add('hidden');
    document.getElementById('telaCardapio').classList.add('hidden');

    document.getElementById(tela).classList.remove('hidden');
}

// Volta da tela de cardápio para a lista de restaurantes.
document.getElementById('btnVoltarRestaurantes').addEventListener('click', () => {
    mostrarTela('telaRestaurantes')
})

// Carrega os dados do restaurante selecionado e abre a tela do cardápio.
function abrirCardapio(id){
    restauranteAtivo = restaurantes.find(r => r.id === id);
    const status = obterStatusRestaurante(restauranteAtivo)

    document.getElementById('logoCardapio').src = restauranteAtivo.logo;
    document.getElementById('nomeCardapio').textContent = restauranteAtivo.nome;
    document.getElementById('statusCardapio').textContent = status.texto;
    document.getElementById('statusCardapio').className = `${status.classe} text-xs font-bold px-3 py-1 rounded-full w-fit`;
    document.getElementById('notaCardapio').textContent = restauranteAtivo.avaliacao;
    document.getElementById('tempoTexto').textContent = restauranteAtivo.tempo
    document.getElementById('enderecoTexto').textContent = restauranteAtivo.endereco
    document.getElementById('horarioTexto').textContent = restauranteAtivo.horario
    document.getElementById('containerCategorias').innerHTML = '';

    renderizarCategorias();
    renderizarPratos();
    mostrarTela('telaCardapio');
}

// Detecta clique no botão "Ver Cardápio" usando delegação de eventos.
document.getElementById('containerRestaurantes').addEventListener('click', (event) => {
    const btn = event.target.closest('.btnVerCardapio');
    if(btn) abrirCardapio(+btn.dataset.id)
})

// Detecta clique no botão de adicionar prato e abre o modal do item.
document.getElementById('containerPratos').addEventListener('click', (event) => {
    const btn = event.target.closest('.btnAdicionarPrato');
    if(btn) abrirModalPrato(+btn.dataset.id)
})

// Renderiza as categorias do restaurante e atualiza o botão ativo com slider.
function renderizarCategorias(categoriaAtiva = 'Todos') {
    const container = document.getElementById('containerCategorias');

    container.className = `flex gap-4 items-center justify-center mb-8 p-2 rounded-full shadow-md`

    container.classList.add('relative', 'z-0');

    if (container.innerHTML === '') {

        const slider = document.createElement('div');
        slider.id = 'sliderCategoria';
        slider.className = 'absolute bg-vermelho rounded-full transition-all duration-300 ease-in-out -z-10';
        container.appendChild(slider);

        restauranteAtivo.categorias.forEach((categoria, index) => {
            const btn = document.createElement('button');

            btn.className = 'btn-categoria relative py-2 px-4 text-md font-semibold cursor-pointer transition-colors duration-300 whitespace-nowrap opacity-0 translate-y-4 rounded-full';
            btn.dataset.categoria = categoria;
            btn.textContent = categoria;

            // Filtra os pratos quando uma categoria é selecionada.
            btn.addEventListener('click', (event) => {
                renderizarCategorias(categoria);
                renderizarPratos(categoria);
                event.target.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });

            container.appendChild(btn);

            setTimeout(() => {
                btn.classList.remove('opacity-0', 'translate-y-4');
            }, 10 + (index * 50));
        });
    }

    const botoes = container.querySelectorAll('.btn-categoria');
    const slider = document.getElementById('sliderCategoria');

    botoes.forEach(btn => {
        if (btn.dataset.categoria === categoriaAtiva) {
            // BOTÃO ATIVO: Letra branca e fundo transparente para podermos ver o slider que virá para trás dele
            btn.classList.add('text-branco', 'bg-transparent');
            btn.classList.remove('text-preto/80', 'bg-branco/10', 'backdrop-blur-lg');

            // CÁLCULO MATEMÁTICO DO DESLIZE:
            setTimeout(() => {
                slider.style.left = `${btn.offsetLeft}px`;      // Posição X exata do botão
                slider.style.top = `${btn.offsetTop}px`;        // Posição Y exata do botão
                slider.style.width = `${btn.offsetWidth}px`;    // Largura dinâmica (ex: 'Pizzas' é maior que 'Sucos')
                slider.style.height = `${btn.offsetHeight}px`;  // Altura do botão
            }, 10);

        } else {
            btn.classList.add('text-preto/80', 'bg-branco/10', 'backdrop-blur-lg');
            btn.classList.remove('text-branco', 'bg-transparent');
        }
    });
}

// Mostra os pratos do restaurante, filtrando pela categoria selecionada.
function renderizarPratos(categoriaAtiva = 'Todos'){
    const container = document.getElementById('containerPratos');
    container.innerHTML = ''

    const pratosFiltrados = categoriaAtiva === 'Todos'
        ? restauranteAtivo.pratos : restauranteAtivo.pratos.filter(p => p.categoria === categoriaAtiva)

    pratosFiltrados.forEach((prato, index) => {
        const card = document.createElement('div')
        card.className = 'border border-preto/10 bg-branco/30 backdrop-blur shadow-lg text-preto rounded-lg p-3 flex flex-col gap-2 opacity-0 translate-x-8 transition-all duration-500 h-full'

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
        setTimeout(() => {
            card.classList.remove('opacity-0', 'translate-x-8');
        }, 10 + (index * 50));
    })
}

let pratoAtivo = null
let qtdPedido = 1

// Preenche e exibe o modal com os detalhes do prato escolhido.
function abrirModalPrato(id) {
    pratoAtivo = restauranteAtivo.pratos.find(p => p.id === id)
    qtdPedido = 1

    document.getElementById('modalPratoImagem').src = pratoAtivo.imagem
    document.getElementById('modalPratoNome').textContent = pratoAtivo.nome
    document.getElementById('modalPratoDescricao').textContent = pratoAtivo.descricao
    document.getElementById('modalPratoPreco').textContent = `R$ ${pratoAtivo.preco.toFixed(2).replace('.', ',')}`
    document.getElementById('quantidadeModal').textContent = qtdPedido
    document.getElementById('observacaoPrato').value = ''

    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    modal.classList.remove('hidden')

    setTimeout(() => {
        conteudo.classList.remove('translate-y-full', 'md:scale-90', 'md:opacity-0')
        conteudo.classList.add('translate-y-0', 'md:scale-100', 'md:opacity-100')
    }, 10)
}

// Fecha o modal do prato com a animação de saída.
function fecharModalPrato(){
    const modal = document.getElementById('modalPrato')
    const conteudo = document.getElementById('conteudoModalPrato')

    conteudo.classList.remove('translate-y-0', 'md:scale-100', 'md:opacity-100')
    conteudo.classList.add('translate-y-full', 'md:scale-90', 'md:opacity-0')

    setTimeout(() => {
        modal.classList.add('hidden')
    }, 300)
}

// Fecha o modal do prato pelo botão de fechar.
document.getElementById('btnFecharModalPrato').addEventListener('click', fecharModalPrato)

// Fecha o modal do prato quando o usuário clica fora do conteúdo.
document.getElementById('modalPrato').addEventListener('click', (event) => {
    if(event.target === document.getElementById('modalPrato')){
        fecharModalPrato()
    }
})

// Aumenta a quantidade do prato dentro do modal.
document.getElementById('btnAumentar').addEventListener('click', () => {
    qtdPedido++
    document.getElementById('quantidadeModal').textContent = qtdPedido
})

// Diminui a quantidade do prato no modal, sem deixar ficar menor que 1.
document.getElementById('btnDiminuir').addEventListener('click', () => {
    if (qtdPedido > 1) {
        qtdPedido--
        document.getElementById('quantidadeModal').textContent = qtdPedido
    }
    contadorCarrinho()
})

// Atualiza visualmente a lista de itens do carrinho e recalcula o total.
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
    const nomeRestaurantePedido = carrinho[0].nomeRestaurante

    const resumoRestaurante = document.createElement('div')
    resumoRestaurante.className = 'text-sm text-gray-600 bg-red-50 border border-red-100 rounded-lg p-3'
    resumoRestaurante.innerHTML = `Pedido em <strong class="text-vermelho">${nomeRestaurantePedido}</strong>`
    lista.appendChild(resumoRestaurante)

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

// Controla remover, aumentar e diminuir itens dentro do carrinho.
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

// Abre o carrinho e reseta a área de checkout para o estado inicial.
function abrirCarrinho(){
    atualizarCarrinho()
    const campos = document.getElementById('camposCheckout')
    campos.classList.remove('opacity-100', 'translate-y-0')
    campos.classList.add('hidden', 'opacity-0', 'translate-y-4')
    document.getElementById('btnFinalizarPedido').textContent = 'Continuar'

    document.getElementById('camposCheckout').classList.add('hidden');
    document.getElementById('inputEndereco').value = '';
    document.getElementById('numeroCasa').value = '';
    document.querySelector('input[name="tipoPedido"][value="Entrega"]').checked = true;
    document.getElementById('camposEndereco').classList.remove('hidden');

    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    modal.classList.remove('hidden')
    setTimeout(() => {
        conteudo.classList.remove('translate-x-full')
    }, 10)
}

// Fecha o carrinho lateral com a animação de saída.
function fecharCarrinho(){
    const modal = document.getElementById('modalCarrinho')
    const conteudo = document.getElementById('conteudoCarrinho')

    conteudo.classList.add('translate-x-full')

    setTimeout(() => {
        modal.classList.add('hidden')
    },300)
}

// Abre o carrinho ao clicar no botão do cabeçalho.
document.getElementById('btnAbrirCarrinho').addEventListener('click', () => {
    console.log('clicou no carrinho')
    abrirCarrinho()
})

// Fecha o carrinho ao clicar no botão de fechar.
document.getElementById('btnFecharCarrinho').addEventListener('click', fecharCarrinho)

// Fecha o carrinho quando o usuário clica fora do painel lateral.
document.getElementById('modalCarrinho').addEventListener('click', (event) => {
    if(event.target === document.getElementById('modalCarrinho')) fecharCarrinho()
})

// Atualiza o contador de itens no botão do carrinho.
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

// Adiciona o prato atual ao carrinho com quantidade e observação.
document.getElementById('btnAdicionarCarrinho').addEventListener('click', (event) => {
    event.stopPropagation()
    if(!pratoAtivo) return
    const observacao = document.getElementById('observacaoPrato').value.trim()
    const itemDeOutroRestaurante = carrinho.length > 0 && carrinho[0].idRestaurante !== restauranteAtivo.id

    if(itemDeOutroRestaurante){
        const confirmarTroca = confirm(`Seu carrinho tem itens de ${carrinho[0].nomeRestaurante}. Deseja limpar o carrinho para pedir em ${restauranteAtivo.nome}?`)

        if(!confirmarTroca) return

        carrinho = []
        atualizarCarrinho()
        contadorCarrinho()
    }

    const itemPedido = {
        idRestaurante: restauranteAtivo.id,
        nomeRestaurante: restauranteAtivo.nome,
        idPrato: pratoAtivo.id,
        nome: pratoAtivo.nome,
        precoUnitario: pratoAtivo.preco,
        quantidade: qtdPedido,
        precoTotal: pratoAtivo.preco * qtdPedido,
        observacao
    }

    carrinho.push(itemPedido)

    contadorCarrinho()
    fecharModalPrato()
})

// Primeiro abre o checkout; no segundo clique valida os dados e envia ao WhatsApp.
document.getElementById('btnFinalizarPedido').addEventListener('click', () => {
    if(carrinho.length === 0) return
    if(restauranteAtivo && !obterStatusRestaurante(restauranteAtivo).aberto){
        alert('Este estabelecimento está fechado no momento.')
        return
    }
    const campos = document.getElementById('camposCheckout')

    if(campos.classList.contains('hidden')){
        campos.classList.remove('hidden')
        setTimeout(() => {
            campos.classList.remove('opacity-0', 'translate-y-4')
            campos.classList.add('opacity-100', 'translate-y-0')
            document.getElementById('btnFinalizarPedido').textContent = 'Enviar pelo WhatsApp'
        }, 10)
        return
    }

    const nome = document.getElementById('nomePessoa').value
    const tipoPedido = document.querySelector('input[name="tipoPedido"]:checked')
    const endereco = document.getElementById('inputEndereco').value
    const numeroEndereco = document.getElementById('numeroCasa').value
    const pagamento = document.querySelector('input[name="pagamento"]:checked')
    let trocoMsg = ''

    if(!nome){
        alert('Por favor, insira seu nome!')
        return
    }

    if(!tipoPedido){
        alert('Por favor, escolha entrega ou retirada!')
        return
    }

    if(tipoPedido.value === 'Entrega' && !endereco){
        alert('Por favor, insira um endereço!')
        return
    }

    if(!pagamento){
        alert('Por favor, escolha uma forma de pagamento!')
        return
    }

    const pagamentoSelecionado = pagamento.value

    if(pagamentoSelecionado === 'Dinheiro'){
        const valorPago = parseFloat(document.getElementById('inputTroco').value)
        const totalCarrinho = carrinho.reduce((acc, item) => acc + item.precoTotal, 0)

        if(!valorPago || valorPago < totalCarrinho){
            alert('Por favor, informe um valor de troco válido e maior que o preço do pedido.')
            return;
        }

        const valorTroco = valorPago - totalCarrinho
        trocoMsg = `%0A*Troco para:* R$ ${valorPago.toFixed(2).replace('.', ',')} (Levar R$ ${valorTroco.toFixed(2).replace('.', ',')} de troco)`;
    }

    const telefone = restauranteAtivo.whatsapp;
    let texto = `*Novo Pedido!*%0A%0A`;
    let total = 0;

    carrinho.forEach(item => {
        texto += `${item.quantidade}x ${item.nome} - R$ ${item.precoTotal.toFixed(2).replace('.', ',')}%0A`;
        if(item.observacao){
            texto += `_Obs: ${item.observacao}_%0A`
        }
        total += item.precoTotal;
    });

    texto += `%0A*Cliente:* ${nome}`
    texto += `%0A*Tipo:* ${tipoPedido.value}`;
    if(tipoPedido.value === 'Entrega'){
        texto += `%0A*Endereço:* ${endereco}, Nº: ${numeroEndereco}`;
    }else{
        texto += `%0A*Retirada em:* ${restauranteAtivo.endereco}`;
    }
    texto += `%0A*Pagamento:* ${pagamentoSelecionado}`;
    texto += trocoMsg
    texto += `%0A%0A*Total:* R$ ${total.toFixed(2).replace('.', ',')}`;

    window.open(`https://wa.me/${telefone}?text=${texto}`, '_blank');

    carrinho = []
    atualizarCarrinho()
    contadorCarrinho()
    document.getElementById('btnFinalizarPedido').textContent = 'Continuar'
    fecharCarrinho()
})

const radiosTipoPedido = document.querySelectorAll('input[name="tipoPedido"]');
const camposEndereco = document.getElementById('camposEndereco');

// Alterna entre entrega e retirada, mostrando ou escondendo o endereço.
radiosTipoPedido.forEach(radio => {
    radio.addEventListener('change', (event) => {
        if(event.target.value === 'Retirada'){
            camposEndereco.classList.add('hidden')
            document.getElementById('inputEndereco').value = ''
            document.getElementById('numeroCasa').value = ''
        }else{
            camposEndereco.classList.remove('hidden')
        }
    })
})

const radiosPagamento = document.querySelectorAll('input[name="pagamento"]');
const containerTroco = document.getElementById('containerTroco');
const inputTroco = document.getElementById('inputTroco');
const textoTrocoCalculado = document.getElementById('textoTrocoCalculado');

// Mostra ou esconde o campo de troco de acordo com a forma de pagamento.
radiosPagamento.forEach(radio => {
    radio.addEventListener('change', (event) => {
        if (event.target.value === 'Dinheiro') {
            containerTroco.classList.remove('hidden');
            containerTroco.classList.add('flex');
        } else {
            containerTroco.classList.add('hidden');
            containerTroco.classList.remove('flex');
            // limpa os dados se a pessoa mudar para Pix ou Cartão
            inputTroco.value = '';
            textoTrocoCalculado.textContent = '';
        }
    });
});

// Calcula o troco em tempo real enquanto o usuário digita o valor pago.
inputTroco.addEventListener('input', (event) => {
    // calcula o total do carrinho varrendo o array na memória
    const totalPedido = carrinho.reduce((acumulador, item) => acumulador + item.precoTotal, 0);
    const valorPago = parseFloat(event.target.value);

    // se o campo estiver vazio ou o usuário digitar texto inválido, apaga a mensagem
    if (isNaN(valorPago) || valorPago <= 0) {
        textoTrocoCalculado.textContent = '';
        return;
    }

    // Validação matemática
    if (valorPago < totalPedido) {
        textoTrocoCalculado.textContent = 'Valor insuficiente para cobrir o pedido.';
        textoTrocoCalculado.className = 'text-sm font-bold text-vermelho';
    } else if (valorPago === totalPedido) {
        textoTrocoCalculado.textContent = 'Não precisa de troco.';
        textoTrocoCalculado.className = 'text-sm font-bold text-gray-500';
    } else {
        const troco = valorPago - totalPedido;
        textoTrocoCalculado.textContent = `O entregador levará R$ ${troco.toFixed(2).replace('.', ',')} de troco.`;
        textoTrocoCalculado.className = 'text-sm font-bold text-green-600';
    }
});

// Muda a cor do logo no topo quando a página é rolada.
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
