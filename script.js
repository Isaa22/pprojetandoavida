// SISTEMA DE MÚLTIPLAS CONTAGENS PARA 2027
// Cada evento tem seu próprio alvo de data

// Configuração dos eventos com datas diferentes
// (Você pode ajustar cada data individualmente)
const eventos = [
    {
        id: 'event1',
        nome: 'ANÁLISE FORENSE 001',
        dataAlvo: new Date(2027, 0, 1, 0, 0, 0),  // 01/01/2027
        diasElement: 'event1-days',
        horasElement: 'event1-hours',
        minutosElement: 'event1-minutes',
        segundosElement: 'event1-seconds'
    },
    {
        id: 'event2',
        nome: 'PROTOCOLO DE SEGURANÇA',
        dataAlvo: new Date(2027, 0, 15, 0, 0, 0), // 15/01/2027
        diasElement: 'event2-days',
        horasElement: 'event2-hours',
        minutosElement: 'event2-minutes',
        segundosElement: 'event2-seconds'
    },
    {
        id: 'event3',
        nome: 'CÁLCULO PERICIAL',
        dataAlvo: new Date(2027, 1, 1, 0, 0, 0),  // 01/02/2027
        diasElement: 'event3-days',
        horasElement: 'event3-hours',
        minutosElement: 'event3-minutes',
        segundosElement: 'event3-seconds'
    },
    {
        id: 'event4',
        nome: 'DOCUMENTAÇÃO OFICIAL',
        dataAlvo: new Date(2027, 2, 1, 0, 0, 0),  // 01/03/2027
        diasElement: 'event4-days',
        horasElement: 'event4-hours',
        minutosElement: 'event4-minutes',
        segundosElement: 'event4-seconds'
    }
];

// Função para calcular e formatar o tempo restante
function calcularTempoRestante(dataAlvo) {
    const agora = new Date();
    let diferenca = dataAlvo - agora;
    
    if (diferenca < 0) {
        return {
            dias: 0,
            horas: 0,
            minutos: 0,
            segundos: 0,
            expirado: true
        };
    }
    
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    return {
        dias: dias,
        horas: horas,
        minutos: minutos,
        segundos: segundos,
        expirado: false
    };
}

// Função para atualizar todos os eventos
function atualizarTodasContagens() {
    eventos.forEach(evento => {
        const tempo = calcularTempoRestante(evento.dataAlvo);
        
        // Atualizar elementos HTML
        const diasElement = document.getElementById(evento.diasElement);
        const horasElement = document.getElementById(evento.horasElement);
        const minutosElement = document.getElementById(evento.minutosElement);
        const segundosElement = document.getElementById(evento.segundosElement);
        
        if (diasElement) diasElement.textContent = tempo.dias;
        if (horasElement) horasElement.textContent = tempo.horas.toString().padStart(2, '0');
        if (minutosElement) minutosElement.textContent = tempo.minutos.toString().padStart(2, '0');
        if (segundosElement) segundosElement.textContent = tempo.segundos.toString().padStart(2, '0');
        
        // Se o evento expirou, adicionar classe visual
        const eventCard = document.querySelector(`.event-card:has(#${evento.diasElement})`);
        if (eventCard && tempo.expirado) {
            eventCard.style.opacity = '0.7';
            eventCard.style.borderColor = '#888';
            const tag = eventCard.querySelector('.evidence-tag');
            if (tag && tag.textContent !== '✅ EVENTO CONCLUÍDO') {
                tag.textContent = '✅ EVENTO CONCLUÍDO';
                tag.style.color = '#8b8';
            }
        }
    });
}

// Atualizar ano no rodapé
function atualizarAno() {
    const anoElement = document.getElementById('anoAtual');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }
}

// Função para registrar no console (estilo investigação)
function logInvestigacao() {
    console.log('%c🔍 SISTEMA PERICIAL ATIVADO', 'color: #b44; font-size: 14px; font-weight: bold;');
    console.log('%cMúltiplos eventos de contagem regressiva para 2027', 'color: #b68b8b; font-size: 12px;');
    console.log('%cCada card possui sua própria data alvo', 'color: #b68b8b; font-size: 12px;');
    eventos.forEach(e => {
        console.log(`  📌 ${e.nome}: ${e.dataAlvo.toLocaleDateString('pt-BR')}`);
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Atualizar todas as contagens imediatamente
    atualizarTodasContagens();
    atualizarAno();
    logInvestigacao();
    
    // Configurar intervalo para atualizar a cada segundo
    setInterval(atualizarTodasContagens, 1000);
    
    // Atualizar quando a página ficar visível novamente
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            atualizarTodasContagens();
        }
    });
    
    // Efeito de animação suave na entrada dos cards
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 120);
    });
});
