// Contagem regressiva para 2026 - Perícia Criminal
// Atualização em tempo real

// Função principal que calcula e atualiza a contagem
function atualizarContagem() {
    // Data alvo: 1º de janeiro de 2026 às 00:00:00
    const dataAlvo = new Date(2026, 0, 1, 0, 0, 0);
    const agora = new Date();
    
    // Calcula a diferença em milissegundos
    let diferenca = dataAlvo - agora;
    
    // Se a data já passou, mostrar zeros
    if (diferenca < 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        
        // Adicionar mensagem de evento concluído
        const relatorio = document.querySelector('.relatorio');
        if (relatorio && !document.querySelector('.evento-finalizado')) {
            const msgFinal = document.createElement('div');
            msgFinal.className = 'evento-finalizado';
            msgFinal.style.cssText = 'color: #d66; font-weight: bold; margin-top: 10px; text-align: center;';
            msgFinal.innerHTML = '🎯 OPERAÇÃO CONCLUÍDA • ANO 2026 INICIADO 🎯';
            relatorio.parentNode.insertBefore(msgFinal, relatorio.nextSibling);
        }
        return;
    }
    
    // Cálculos de tempo
    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);
    
    // Formatação com dois dígitos
    const diasFormatado = dias.toString().padStart(2, '0');
    const horasFormatado = horas.toString().padStart(2, '0');
    const minutosFormatado = minutos.toString().padStart(2, '0');
    const segundosFormatado = segundos.toString().padStart(2, '0');
    
    // Atualiza os elementos HTML
    document.getElementById('days').textContent = diasFormatado;
    document.getElementById('hours').textContent = horasFormatado;
    document.getElementById('minutes').textContent = minutosFormatado;
    document.getElementById('seconds').textContent = segundosFormatado;
    
    // Efeito visual nos segundos (piscar suave)
    const segundosElement = document.getElementById('seconds');
    if (segundosElement) {
        segundosElement.style.opacity = '0.9';
        setTimeout(() => {
            if (segundosElement) segundosElement.style.opacity = '1';
        }, 100);
    }
    
    // Adiciona classe de atenção quando faltar menos de 30 dias
    const container = document.querySelector('.container');
    if (dias < 30 && dias > 0) {
        container.style.borderColor = '#b44';
        container.style.boxShadow = '0 0 15px rgba(180, 68, 68, 0.3)';
    } else if (container) {
        container.style.borderColor = 'rgba(128, 0, 32, 0.5)';
        container.style.boxShadow = 'none';
    }
}

// Função para atualizar o ano no rodapé
function atualizarAno() {
    const anoElement = document.getElementById('anoAtual');
    if (anoElement) {
        anoElement.textContent = new Date().getFullYear();
    }
}

// Função para adicionar efeito de digitação no título (opcional)
function adicionarEfeitoDigital() {
    const titulo = document.querySelector('h1');
    if (titulo && !titulo.hasAttribute('data-animado')) {
        titulo.setAttribute('data-animado', 'true');
        // Pequeno efeito de digitação sutil
        const textoOriginal = titulo.textContent;
        titulo.style.opacity = '0';
        setTimeout(() => {
            titulo.style.transition = 'opacity 0.8s';
            titulo.style.opacity = '1';
        }, 200);
    }
}

// Função para registrar logs de investigação (console)
function logInvestigacao() {
    console.log('%c🔍 PERÍCIA CRIMINAL ATIVADA', 'color: #b44; font-size: 14px; font-weight: bold;');
    console.log('%cSistema de contagem regressiva para 2026 em tempo real', 'color: #b68b8b; font-size: 12px;');
    console.log('%cProtocolo de segurança ativo • Modo investigação', 'color: #b68b8b; font-size: 12px;');
}

// Inicialização completa quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a contagem imediatamente
    atualizarContagem();
    atualizarAno();
    adicionarEfeitoDigital();
    logInvestigacao();
    
    // Configura o intervalo para atualização a cada segundo
    setInterval(atualizarContagem, 1000);
    
    // Adiciona listeners para verificar quando a página voltar a ficar visível
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            atualizarContagem(); // Atualização imediata ao retornar à aba
        }
    });
    
    // Pequeno efeito de carregamento para os cards
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

// Exportar função para debug (opcional, mas útil)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { atualizarContagem };
}
