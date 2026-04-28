// script.js - Funcionalidade completa de coleta de pistas + contagem regressiva (tema perícia)
// Datas alvo para cada evidência (mantendo coerência com o estilo criminal)
const targetDates = [
    new Date(2027, 5, 24, 20, 0, 0).getTime(),   // 24/06/2027 -> pista 24
    new Date(2027, 6, 7, 12, 0, 0).getTime(),    // 07/07/2027 -> pista 07
    new Date(2027, 6, 12, 18, 30, 0).getTime(),  // 12/07/2027 -> pista 12
    new Date(2027, 8, 20, 9, 0, 0).getTime()     // 20/09/2027 -> pista 2027
];

// Estados das evidências (coletada ou não)
let evidencesCollected = [false, false, false, false];
let collectedValues = ["", "", "", ""];

// Mapeamento de cada evidência para o valor correto da pista
const evidencePistaMap = ["24", "07", "12", "2027"];

// Elementos DOM
const timerElements = [
    document.getElementById("timer0"),
    document.getElementById("timer1"),
    document.getElementById("timer2"),
    document.getElementById("timer3")
];
const collectedBadges = [
    document.getElementById("collected0"),
    document.getElementById("collected1"),
    document.getElementById("collected2"),
    document.getElementById("collected3")
];
const allButtons = document.querySelectorAll(".btn-evidence");
const cluesContainer = document.getElementById("cluesList");
const revealBtn = document.getElementById("revealBtn");
const finalMsgDiv = document.getElementById("finalMessage");

// Atualiza todos os contadores regressivos (igualmente ao modelo original)
function updateAllCountdowns() {
    const now = new Date().getTime();
    
    for (let i = 0; i < targetDates.length; i++) {
        const distance = targetDates[i] - now;
        
        if (distance < 0) {
            if (timerElements[i]) {
                timerElements[i].innerHTML = `⌛ PRAZO ENCERRADO`;
                timerElements[i].style.color = "#d99e7c";
            }
            continue;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (86400000)) / 3600000);
        const minutes = Math.floor((distance % 3600000) / 60000);
        const seconds = Math.floor((distance % 60000) / 1000);
        
        if (timerElements[i]) {
            timerElements[i].innerHTML = `${days}d ${hours.toString().padStart(2,'0')}h ${minutes.toString().padStart(2,'0')}m ${seconds.toString().padStart(2,'0')}s`;
        }
    }
}

// Atualiza o caderno do investigador com as pistas já coletadas
function updateInvestigationNotebook() {
    const collectedList = [];
    for (let i = 0; i < evidencesCollected.length; i++) {
        if (evidencesCollected[i]) {
            collectedList.push(collectedValues[i]);
        }
    }
    
    if (collectedList.length === 0) {
        cluesContainer.innerHTML = '<span class="placeholder">Nenhum vestígio coletado. Aperte os botões acima, detetive.</span>';
        return;
    }
    
    let html = '<span>🔎 VESTÍGIOS ARQUIVADOS: </span><br/>';
    collectedList.forEach(val => {
        html += `<span style="background:#631f2b; padding:0.2rem 0.7rem; margin:0.2rem; display:inline-block; border-radius:20px;">🕵️ ${val}</span> `;
    });
    cluesContainer.innerHTML = html;
}

// Coleta a evidência (pista)
function collectEvidence(index, pistaValue) {
    if (evidencesCollected[index]) {
        alert("⛔ Este vestígio já foi coletado e lacrado. Siga para a próxima evidência.");
        return;
    }
    
    // Marcar como coletado
    evidencesCollected[index] = true;
    collectedValues[index] = pistaValue;
    
    // Exibir badge
    if (collectedBadges[index]) {
        collectedBadges[index].classList.add("visible");
    }
    
    // Desabilitar botão visualmente
    const btn = allButtons[index];
    if (btn) {
        btn.disabled = true;
        btn.style.opacity = "0.6";
        btn.style.cursor = "default";
        btn.innerText = "✅ VESTÍGIO LACRADO";
    }
    
    updateInvestigationNotebook();
}

// Revelar relatório final (verifica se as 4 evidências foram coletadas)
function revealFinalReport() {
    const totalCollected = evidencesCollected.filter(v => v === true).length;
    
    if (totalCollected < 4) {
        finalMsgDiv.innerHTML = "⚠️ RELATÓRIO INCOMPLETO. Você deve coletar os 4 vestígios para emitir o laudo pericial final. ⚠️";
        finalMsgDiv.style.background = "#39161f";
        return;
    }
    
    // Verificar sequência correta (opcional, mas mantém imersão)
    if (collectedValues[0] !== "24" || collectedValues[1] !== "07" || collectedValues[2] !== "12" || collectedValues[3] !== "2027") {
        finalMsgDiv.innerHTML = "❌ OS VESTÍGIOS NÃO CORRESPONDEM AO CÓDIGO DE ACESSO. Operação comprometida.";
        return;
    }
    
    // MENSAGEM FINAL ÉPICA (tema perícia criminal)
    finalMsgDiv.innerHTML = `
        <div style="font-size:1.5rem; font-weight:800;">🔓 LAUDO FINAL – ACESSO AUTORIZADO 🔓</div>
        <p style="margin-top:12px;">
        🕵️‍♂️ <strong>OPERAÇÃO: VESTÍGIOS OCULTOS</strong> — Caso 2027 solucionado.<br><br>
        Os códigos <strong style="color:#f5aa7a;">24 • 07 • 12 • 2027</strong> abriram os arquivos secretos.<br>
        Conclusão: O criminoso utilizava técnicas avançadas de ocultação, mas as evidências coletadas na cena (luvas, impressão, manuscrito e arquivo criptografado) provam a identidade do mentor.<br><br>
        <span style="background:#7e2b38; padding:0.2rem 0.8rem; border-radius:30px;">✅ CASO ARQUIVADO • ENCERRADO PELA PERÍCIA CENTRAL ✅</span>
        </p>
    `;
    finalMsgDiv.style.background = "#2f1821e6";
    finalMsgDiv.style.border = "2px solid #bb5e72";
}

// Configurar eventos e iniciar timers
function init() {
    // Atualizar contagens a cada segundo
    updateAllCountdowns();
    setInterval(updateAllCountdowns, 1000);
    
    // Adicionar eventos aos botões de coletar evidência
    allButtons.forEach((btn, idx) => {
        const pistaVal = btn.getAttribute("data-pista");
        btn.addEventListener("click", () => {
            collectEvidence(idx, pistaVal);
        });
    });
    
    // Evento do botão de revelar
    revealBtn.addEventListener("click", revealFinalReport);
    
    // Estado inicial
    for (let i = 0; i < collectedBadges.length; i++) {
        if (collectedBadges[i]) collectedBadges[i].classList.remove("visible");
        if (allButtons[i]) {
            allButtons[i].disabled = false;
            allButtons[i].style.opacity = "1";
            allButtons[i].innerText = "🔍 COLETAR VESTÍGIO";
        }
    }
    evidencesCollected.fill(false);
    collectedValues.fill("");
    updateInvestigationNotebook();
    finalMsgDiv.innerHTML = "";
}

init();
