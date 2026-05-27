import { getRestauranteAtivo } from './estado.js'
import { renderizarPratos } from './pratos.js'

// Renderiza as categorias do restaurante e atualiza o botão ativo com slider.
export function renderizarCategorias(categoriaAtiva = 'Todos') {
    const restauranteAtivo = getRestauranteAtivo()
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
            btn.classList.add('text-branco', 'bg-transparent');
            btn.classList.remove('text-preto/80', 'bg-branco/10', 'backdrop-blur-lg');

            setTimeout(() => {
                slider.style.left = `${btn.offsetLeft}px`;
                slider.style.top = `${btn.offsetTop}px`;
                slider.style.width = `${btn.offsetWidth}px`;
                slider.style.height = `${btn.offsetHeight}px`;
            }, 10);

        } else {
            btn.classList.add('text-preto/80', 'bg-branco/10', 'backdrop-blur-lg');
            btn.classList.remove('text-branco', 'bg-transparent');
        }
    });
}

// Filtra os pratos quando uma categoria é selecionada.
export function selecionarCategoria(event) {
    const btn = event.target.closest('.btn-categoria')
    if(!btn) return

    const categoria = btn.dataset.categoria
    renderizarCategorias(categoria)
    renderizarPratos(categoria)
    btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}
