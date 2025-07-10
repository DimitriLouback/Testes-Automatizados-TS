export function validarEntrada(entrada: string): Date | null {
    const regex = /^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] - Abertura da Porta OK$/; 
    const match = entrada.match(regex);
    if (!match) {
        return null;
    }

    const date = new Date(match[1].replace(' ', 'T'));
    if (isNaN(date.getTime())) {
        return null;
    }
    return date;
}

export function checarSeDentroDoHorario(date: Date): boolean {
    const hora = date.getHours();
    const minutos = date.getMinutes();
    const segundos = date.getSeconds();

    const tempoSegundos = hora * 3600 + minutos * 60 + segundos;
    const horarioAbertura = 10 * 3600; // 10:00:00
    const horarioFechamento = 16 * 3600; // 16:00:00

    return tempoSegundos >= horarioAbertura && tempoSegundos <= horarioFechamento;
}

export function contarEntradasValidas(entradas: string[]): number {
    let i = 0;
    for (const entrada of entradas) {
        const date = validarEntrada(entrada);
        if (date && checarSeDentroDoHorario(date)) {
            i++;
        }
    }
    return i;
}