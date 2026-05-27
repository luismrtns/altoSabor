import { getRestauranteAtivo } from './estado.js'
import { mostrarAviso } from './modalMensagem.js'

// Compartilha o link direto do cardápio ou copia para a área de transferência.
export async function compartilharCardapio(){
    const restauranteAtivo = getRestauranteAtivo()
    if(!restauranteAtivo) return

    const url = `${window.location.origin}${window.location.pathname}?restaurante=${restauranteAtivo.id}`
    const texto = `Veja o cardápio de ${restauranteAtivo.nome} no Alto Sabor.`

    if(navigator.share){
        await navigator.share({
            title: restauranteAtivo.nome,
            text: texto,
            url
        })
        return
    }

    await navigator.clipboard.writeText(url)
    await mostrarAviso('Link copiado!', 'O link do cardápio foi copiado!')
}
