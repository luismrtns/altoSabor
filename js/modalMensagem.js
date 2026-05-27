// Abre um modal personalizado para avisos e confirmações.
function abrirMensagem({ titulo, texto, confirmarTexto = 'Entendi', cancelarTexto = 'Cancelar', mostrarCancelar = false }) {
    return new Promise((resolve) => {
        const modal = document.getElementById('modalMensagem')
        const conteudo = document.getElementById('conteudoModalMensagem')
        const tituloElemento = document.getElementById('tituloModalMensagem')
        const textoElemento = document.getElementById('textoModalMensagem')
        const btnConfirmar = document.getElementById('btnConfirmarMensagem')
        const btnCancelar = document.getElementById('btnCancelarMensagem')

        tituloElemento.textContent = titulo
        textoElemento.textContent = texto
        btnConfirmar.textContent = confirmarTexto
        btnCancelar.textContent = cancelarTexto
        btnCancelar.classList.toggle('hidden', !mostrarCancelar)

        const fechar = (resultado) => {
            conteudo.classList.remove('opacity-100', 'scale-100')
            conteudo.classList.add('opacity-0', 'scale-95')

            setTimeout(() => {
                modal.classList.add('hidden')
                btnConfirmar.onclick = null
                btnCancelar.onclick = null
                modal.onclick = null
                resolve(resultado)
            }, 200)
        }

        btnConfirmar.onclick = () => fechar(true)
        btnCancelar.onclick = () => fechar(false)
        modal.onclick = (event) => {
            if(event.target === modal) fechar(false)
        }

        modal.classList.remove('hidden')

        setTimeout(() => {
            conteudo.classList.remove('opacity-0', 'scale-95')
            conteudo.classList.add('opacity-100', 'scale-100')
        }, 10)
    })
}

// Mostra um aviso simples sem usar alert do navegador.
export function mostrarAviso(titulo, texto) {
    return abrirMensagem({ titulo, texto })
}

// Mostra uma confirmação personalizada no lugar do confirm do navegador.
export function mostrarConfirmacao(titulo, texto, confirmarTexto = 'Confirmar') {
    return abrirMensagem({
        titulo,
        texto,
        confirmarTexto,
        cancelarTexto: 'Cancelar',
        mostrarCancelar: true
    })
}
