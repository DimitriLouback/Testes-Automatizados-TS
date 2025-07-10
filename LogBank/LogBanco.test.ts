import { validarEntrada, checarSeDentroDoHorario, contarEntradasValidas } from './LogBanco';

describe('validarEntrada', () => {
    it('deve validar(parse) uma entrada corretamente', () => {
        const linha = '[2025-07-09 11:23:45] - Abertura da Porta OK';
        const date = validarEntrada(linha);
        expect(date).not.toBeNull();
        expect(date?.getFullYear()).toBe(2025);
        expect(date?.getHours()).toBe(11);
    });

    it('deve retornar null por formato inválido', () => {
        const linha = '[2025-07-09 11:23:45] - Porta Aberta';
        expect(validarEntrada(linha)).toBeNull();
    });

    it('deve retornar null por data inválida', () => {
        const linha = '[data-inválida] - Abertura da Porta OK';
        expect(validarEntrada(linha)).toBeNull();
    });
});

describe('checarSeDentroDoHorario', () => {
    it('Deve retornar true pelo tempo dentro do horário de trabalho', () => {
        const date = new Date('2025-07-09T10:00:00');
        expect(checarSeDentroDoHorario(date)).toBe(true);
    });

    it('Deve retornar false por estar antes do horário de trabalho', () => {
        const date = new Date('2025-07-09T09:59:59');
        expect(checarSeDentroDoHorario(date)).toBe(false);
    });

    it('Deve retornar false por estar depois do horário de trabalho', () => {
        const date = new Date('2025-07-09T16:00:01');
        expect(checarSeDentroDoHorario(date)).toBe(false);
    });
});

describe('contarEntradasValidas', () => {
    it('Deve contar apenas entradas válidas dentro do horário de trabalho', () => {
        const linhas = [
            '[2025-07-09 09:59:59] - Abertura da Porta OK', // inválido (cedo)
            '[2025-07-09 10:00:00] - Abertura da Porta OK', // válido
            '[2025-07-09 12:30:00] - Abertura da Porta OK', // válido
            '[2025-07-09 16:00:00] - Abertura da Porta OK', // válido
            '[2025-07-09 16:00:01] - Abertura da Porta OK', // inválido (tarde)
            '[2025-07-09 14:15:00] - Porta Aberta',         // inválido (entrada incorreta)
        ];
        const contador = contarEntradasValidas(linhas);
        expect(contador).toBe(3);
    });
});