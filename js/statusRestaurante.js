// Converte um horário no formato "HH:MM" para minutos desde o começo do dia.
function horarioParaMinutos(horario) {
    const [horas, minutos] = horario.split(':').map(Number)
    return (horas * 60) + minutos
}

// Verifica se o restaurante está aberto agora e retorna o texto/classe do selo.
export function obterStatusRestaurante(restaurante) {
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
        texto: aberto ? `Aberto até ${fechamento}` : `Fechado, abre às ${abertura}`,
        classe: aberto ? 'bg-folha/15 text-folha' : 'bg-paprica/10 text-paprica'
    }
}
