// Contagem regressiva para 2027 - Perícia Criminal
// Versão com modal interativo

// Variáveis globais
let valoresAtuais = {
    dias: 0,
    horas: 0,
    minutos: 0,
    segundos: 0
};

// Referências para elementos do modal
const modal = document.getElementById('modal');
const modalClose = document.querySelector('.modal-close');
const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalValorAtual = document.getElementById('modalValorAtual');
const modalUnidade = document.getElementById('modalUnidade');
const modalPorcentagem = document.getElementById('modalPorcentagem');
const progressBar = document.getElementById('progressBar');
const modalDecorrido = document.getElementById('modalDecorrido');
const modalDecorridoUnidade = document.getElementById('modalDecorridoUnidade');

// Mapeamento de ícones e títulos por tipo
const configModal = {
    dias: {
        icone: '📅',
        titulo: 'PROTOCOLO: D-365',
        unidade: 'DIAS',
        unidadeDecorrido: 'DIAS',
        max: 365
    },
    horas: {
        icone: '⏰',
        titulo: 'PROTOCOLO: H-24',
        unidade: 'HORAS',
        unidadeDecorrido: 'HORAS',
        max: 24
    },
    minutos: {
        icone: '⏱️',
        titulo: 'PROTOCOLO: M-60',
        unidade: 'MINUTOS',
        unidadeDecorrido: 'MINUTOS',
        max: 60
    },
    segundos: {
        icone: '⚡',
        titulo: 'PROTOCOLO: S-60',
        unidade: 'SEGUNDOS',
        unidadeDecorrido: 'SEGUNDOS',
        max: 60
    }
};

// Função principal que calcula e atualiza a contagem
function atualizarContagem() {
    const dataAlvo = new Date(2027, 0, 1, 0, 0, 0);
    const agora = new Date();
    const inicioDoAno = new Date(agora.getFullYear(), 0, 1, 0, 0, 0);
    
    let diferenca = dataAlvo - agora;
    
    if (diferenca < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        const relatorio = document.querySelector('.relatorio');
        if (relatorio && !document.querySelector('.evento-finalizado')) {
            const msgFinal = document.createElement('div');
            msgFinal.className = 'evento-finalizado';
            msgFinal.style.cssText = 'color: #d66; font-weight: bold; margin-top: 10px; text-align: center;';
            msgFinal.innerHTML = '🎯 OPERAÇÃO CONCLUÍDA • ANO 2027 INICIADO 🎯';
            relatorio.parentNode.insertBefore(msgFinal, relatorio.nextSibling);
        }
        return;
    }
    
    // Cálculos principais
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    // Armazenar valores atuais
    valoresAtuais = { dias, horas, minutos, segundos };
    
    // Formatação e atualização
    document.getElementById('days').textContent = dias.toString().padStart(2, '0');
    document.getElementById('hours').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = segundos.toString().padStart(2, '0');
    
    // Efeito nos segundos
    const segundosElement = document.getElementById('seconds');
    if (segundosElement) {
        segundosElement.style.opacity = '0.9';
        setTimeout(() => {
            if (segundosElement) segundosElement.style.opacity = '1';
        }, 100);
    }
    
    // Efeito de atenção
    const container = document.querySelector('.container');
    if (dias < 30 && dias > 0) {
        container.style.borderColor = '#b44';
        container.style.boxShadow = '0 0 15px rgba(180, 68, 68, 0.3)';
    } else if (container) {
        container.style.borderColor = 'rgba(128, 0, 32, 0.5)';
        container.style.boxShadow = 'none';
    }
}

// Função para calcular porcentagem restante
function calcularPorcentagem(valorAtual, maximo) {
    const porcentagem = (valorAtual / maximo) * 100;
    return Math.min(100, Math.max(0, porcentagem)).toFixed(1);
}

// Função para calcular tempo decorrido desde o início do ano (em relação ao total)
function calcularTempoDecorrido(tipo, valorAtual, maximo) {
    // Para dias: mostra quantos dias já se passaram do ano
    if (tipo === 'dias') {
        const agora = new Date();
        const inicioAno = new Date(agora.getFullYear(), 0, 1);
        const diasPassados = Math.floor((agora - inicioAno) / (1000 * 60 * 60 * 24));
        return diasPassados;
    }
    // Para outros, mostra o complemento (quanto já passou do ciclo atual)
    return maximo - valorAtual;
}

// Função para abrir o modal com os dados do card clicado
function abrirModal(tipo) {
    const config = configModal[tipo];
    if (!config) return;
    
    const valorAtual = valoresAtuais[tipo];
    const maximo = config.max;
    
    // Atualizar ícone e título
    modalIcon.textContent = config.icone;
    modalTitle.textContent = config.titulo;
    
    // Valor atual
    modalValorAtual.textContent = valorAtual;
    modalUnidade.textContent = config.unidade;
    
    // Porcentagem restante
    const porcentagem = calcularPorcentagem(valorAtual, maximo);
    modalPorcentagem.textContent = `${porcentagem}%`;
    progressBar.style.width = `${porcentagem}%`;
    
    // Tempo decorrido (interpretação forense)
    let decorrido;
    if (tipo === 'dias') {
        decorrido = calcularTempoDecorrido(tipo, valorAtual, maximo);
        modalDecorrido.textContent = decorrido;
        modalDecorridoUnidade.textContent = 'DIAS DO ANO ATUAL';
    } else {
        decorrido = calcularTempoDecorrido(tipo, valorAtual, maximo);
        modalDecorrido.textContent = decorrido;
        modalDecorridoUnidade.textContent = `${config.unidade} DECORRIDOS NESTE CICLO`;
    }
    
    // Exibir modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

// Fechar modal
function fecharModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Atualizar ano no rodapé
function atualizarAno() {
    const anoElement = document.getElementById('anoAtual');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }
}

// Configurar eventos de clique nos cards
function configurarCards() {
    const cards = document.querySelectorAll('.card-evidence');
    cards.forEach(card => {
        const tipo = card.getAttribute('data-tipo');
        card.addEventListener('click', () => {
            abrirModal(tipo);
        });
    });
}

// Log de investigação
function logInvestigacao() {
    console.log('%c🔍 PERÍCIA CRIMINAL ATIVADA - MODO INTERATIVO', 'color: #b44; font-size: 14px; font-weight: bold;');
    console.log('%cSistema de contagem regressiva para 2027 com modal interativo', 'color: #b68b8b; font-size: 12px;');
    console.log('%cClique em qualquer card para ver detalhes forenses', 'color: #b68b8b; font-size: 12px;');
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    atualizarContagem();
    atualizarAno();
    configurarCards();
    logInvestigacao();
    
    // Intervalo para atualização a cada segundo
    setInterval(atualizarContagem, 1000);
    
    // Eventos do modal
    modalClose.addEventListener('click', fecharModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            fecharModal();
        }
    });
    
    // Atualização ao voltar para a aba
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            atualizarContagem();
        }
    });
    
    // Animação de entrada dos cards
    const cards = document.querySelectorAll('.card-evidence');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease-out';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
