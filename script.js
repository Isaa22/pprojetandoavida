// OPERAÇÃO FUTURO 2027 - SISTEMA DE PISTAS
// Múltiplas contagens + coleta de evidências

// Configuração dos eventos com datas diferentes
const eventos = [
    {
        id: 'event1',
        dataAlvo: new Date(2027, 0, 1, 0, 0, 0),
        diasElement: 'event1-days',
        horasElement: 'event1-hours',
        minutosElement: 'event1-minutes',
        segundosElement: 'event1-seconds'
    },
    {
        id: 'event2',
        dataAlvo: new Date(2027, 0, 15, 0, 0, 0),
        diasElement: 'event2-days',
        horasElement: 'event2-hours',
        minutosElement: 'event2-minutes',
        segundosElement: 'event2-seconds'
    },
    {
        id: 'event3',
        dataAlvo: new Date(2027, 1, 1, 0, 0, 0),
        diasElement: 'event3-days',
        horasElement: 'event3-hours',
        minutosElement: 'event3-minutes',
        segundosElement: 'event3-seconds'
    },
    {
        id: 'event4',
        dataAlvo: new Date(2027, 3, 15, 0, 0, 0),
        diasElement: 'event4-days',
        horasElement: 'event4-hours',
        minutosElement: 'event4-minutes',
        segundosElement: 'event4-seconds'
    }
];

// Pistas do caso
const pistas = {
    1: { texto: "🔬 EVIDÊNCIA #001: Luvas de látex → Número 24", coletada: false },
    2: { texto: "📸 EVIDÊNCIA #002: Foto da placa → Número 07", coletada: false },
    3: { texto: "📝 EVIDÊNCIA #003: Manuscrito rasgado → Número 12", coletada: false },
    4: { texto: "💻 EVIDÊNCIA #004: Arquivo criptografado → 2027", coletada: false }
};

// Controle de pistas coletadas
let pistasColetadas = 0;

// Função para calcular tempo restante
function calcularTempoRestante(dataAlvo) {
    const agora = new Date();
    let diferenca = dataAlvo - agora;
    
    if (diferenca < 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0, expirado: true };
    }
    
    return {
        dias: Math.floor(diferenca / (1000 * 60 * 60 * 24)),
        horas: Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutos: Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60)),
        segundos: Math.floor((diferenca % (1000 * 60)) / 1000),
        expirado: false
    };
}

// Atualizar todas as contagens
function atualizarTodasContagens() {
    eventos.forEach(evento => {
        const tempo = calcularTempoRestante(evento.dataAlvo);
        
        const diasEl = document.getElementById(evento.diasElement);
        const horasEl = document.getElementById(evento.horasElement);
        const minutosEl = document.getElementById(evento.minutosElement);
        const segundosEl = document.getElementById(evento.segundosElement);
        
        if (diasEl) diasEl.textContent = tempo.dias;
        if (horasEl) horasEl.textContent = tempo.horas.toString().padStart(2, '0');
        if (minutosEl) minutosEl.textContent = tempo.minutos.toString().padStart(2, '0');
        if (segundosEl) segundosEl.textContent = tempo.segundos.toString().padStart(2, '0');
    });
}

// Função para coletar pista ao clicar
function coletaPista(pistaId) {
    if (pistas[pistaId].coletada) return;
    
    pistas[pistaId].coletada = true;
    pistasColetadas++;
    
    // Adicionar ao painel do detetive
    const panelNotes = document.getElementById('panelNotes');
    const novaPista = document.createElement('div');
    novaPista.className = 'pista-coletada';
    novaPista.innerHTML = `✅ ${pistas[pistaId].texto}`;
    panelNotes.appendChild(novaPista);
    
    // Remover placeholder se existir
    const placeholder = panelNotes.querySelector('.note-placeholder');
    if (placeholder) placeholder.remove();
    
    // Efeito visual no card
    const card = document.querySelector(`.event-card[data-pista-id="${pistaId}"]`);
    if (card) {
        card.style.borderLeft = '4px solid #4c4';
        const clueBox = card.querySelector('.clue-box');
        if (clueBox) clueBox.style.opacity = '0.7';
    }
    
    // Animação de coleta
    console.log(`%c🔍 PISTA #${pistaId} COLETADA!`, 'color: #8c8; font-size: 11px');
}

// Revelar mensagem final
function revelarMensagem() {
    if (pistasColetadas < 4) {
        alert(`⚠️ VOCÊ AINDA NÃO COLETOU TODAS AS PISTAS!\n\nPistas coletadas: ${pistasColetadas}/4\nInvestigue cada evidência clicando nas caixas de pista.`);
        return;
    }
    
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // Registrar no console
    console.log('%c🏆 CASO RESOLVIDO! 2027 REVELADO! 🏆', 'color: gold; font-size: 14px');
}

// Fechar modal
function fecharModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Atualizar ano no rodapé
function atualizarAno() {
    const anoElement = document.getElementById('anoAtual');
    if (anoElement) anoElement.textContent = new Date().getFullYear();
}

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
    atualizarTodasContagens();
    atualizarAno();
    
    // Configurar clique nas pistas
    for (let i = 1; i <= 4; i++) {
        const clueBox = document.querySelector(`.event-card[data-pista-id="${i}"] .clue-box`);
        if (clueBox) {
            clueBox.addEventListener('click', (e) => {
                e.stopPropagation();
                coletaPista(i);
            });
        }
    }
    
    // Botão revelar
    const revealBtn = document.getElementById('revealBtn');
    if (revealBtn) revealBtn.addEventListener('click', revelarMensagem);
    
    // Fechar modal
    const closeBtn = document.querySelector('.modal-close');
    if (closeBtn) closeBtn.addEventListener('click', fecharModal);
    window.addEventListener('click', (e) => {
        const modal = document.getElementById('successModal');
        if (e.target === modal) fecharModal();
    });
    
    // Atualizar contagem a cada segundo
    setInterval(atualizarTodasContagens, 1000);
    
    // Efeito de entrada
    const cards = document.querySelectorAll('.event-card');
    cards.forEach((card, i) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = '0.4s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, i * 100);
    });
    
    console.log('%c🔍 SISTEMA INVESTIGATIVO INICIADO', 'color: #b44; font-size: 12px;');
    console.log('%cClique nas caixas de PISTA em cada card para coletar as evidências!', 'color: #b88; font-size: 11px');
});
