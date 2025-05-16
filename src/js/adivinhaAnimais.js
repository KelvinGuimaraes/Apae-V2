const allItems = [
    { palavra: "Baleia", imagem: "../images/animais/baleia.jpeg", acertado: false },
    { palavra: "Cavalo Marinho", imagem: "../images/animais/cavalo marinho.jpeg", acertado: false },
    { palavra: "Cavalo", imagem: "../images/animais/cavalo.jpeg", acertado: false },
    { palavra: "Coelho", imagem: "../images/animais/coelho.jpeg", acertado: false },
    { palavra: "Elefante", imagem: "../images/animais/elefante.jpeg", acertado: false },
    { palavra: "Estrela", imagem: "../images/animais/estrela.jpeg", acertado: false },
    { palavra: "Galinha", imagem: "../images/animais/galinha.jpeg", acertado: false },
    { palavra: "Girafa", imagem: "../images/animais/girafa.jpeg", acertado: false },
    { palavra: "Gato", imagem: "../images/animais/gato.jpeg", acertado: false },
    { palavra: "Cachorro", imagem: "../images/animais/cachorro.jpeg", acertado: false },
    { palavra: "Golfinho", imagem: "../images/animais/golfinho.jpeg", acertado: false }, 
    { palavra: "Hamster", imagem: "../images/animais/hamster.jpeg", acertado: false },
    { palavra: "Leão", imagem: "../images/animais/leão.jpeg", acertado: false },
    { palavra: "Macaco", imagem: "../images/animais/macaco.jpeg", acertado: false },
    { palavra: "Onça", imagem: "../images/animais/onça.jpeg", acertado: false },
    { palavra: "Ovelha", imagem: "../images/animais/ovelha.jpeg", acertado: false },
    { palavra: "Pato", imagem: "../images/animais/pato.jpeg", acertado: false },
    { palavra: "Peixe", imagem: "../images/animais/peixe.jpeg", acertado: false },
    { palavra: "Polvo", imagem: "../images/animais/polvo.jpeg", acertado: false },
    { palavra: "Porco", imagem: "../images/animais/porco.jpeg", acertado: false },
    { palavra: "Tigre", imagem: "../images/animais/tigre.jpeg", acertado: false },
    { palavra: "Tubarão", imagem: "../images/animais/tubarão.jpeg", acertado: false },
    { palavra: "Vaca", imagem: "../images/animais/vaca.jpeg", acertado: false }
];

// Variáveis do jogo
let currentItem = null;
let score = 0;
let items = [...allItems];
let lastWrongItem = null; // Guarda o último item errado
const audioCorrect = new Audio('../audio/soletrando/efeito-acerto.mp3');
const audioWrong = new Audio('../audio/soletrando/efeito-erro.mp3');
const audioFinish = new Audio('../audio/soletrando/efeito-vitoria.mp3');

// Função para síntese de voz
function speak(text) {
    if ('speechSynthesis' in window) {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'pt-BR';
        utterance.rate = 0.9;
        speechSynthesis.speak(utterance);
    }
}

// Centraliza o jogo na tela
function centerGame() {
    const container = document.getElementById('game-container');
    if (!container) return;
    container.style.position = 'fixed';
    container.style.top = '50%';
    container.style.left = '50%';
    container.style.transform = 'translate(-50%, -50%)';
    container.style.textAlign = 'center';
}

// Pega a próxima palavra não acertada
function getNextItem() {
    // Primeiro tenta o último item errado
    if (lastWrongItem && !lastWrongItem.acertado) {
        return lastWrongItem;
    }
    // Depois pega qualquer item não acertado
    const availableItems = items.filter(item => !item.acertado);
    return availableItems[Math.floor(Math.random() * availableItems.length)];
}

// Verifica se o jogo acabou
function checkGameEnd() {
    return items.every(item => item.acertado);
}

// Finaliza o jogo
function endGame() {
    audioFinish.play();
    speak("Parabéns! Você acertou todas as palavras!");
    document.getElementById('game-message').textContent = "Fim do jogo! Todas as palavras foram acertadas!";
    document.getElementById('items-container').innerHTML = '';
    
    // Botão de reinício
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Jogar Novamente';
    restartBtn.onclick = () => {
        items = allItems.map(item => ({ ...item, acertado: false }));
        score = 0;
        lastWrongItem = null;
        initGame();
    };
    document.getElementById('items-container').appendChild(restartBtn);
}

// Atualiza o jogo
function updateGame() {
    if (checkGameEnd()) {
        endGame();
        return;
    }

    const messageEl = document.getElementById('game-message');
    const itemsContainer = document.getElementById('items-container');
    
    currentItem = getNextItem();
    messageEl.textContent = `Encontre: ${currentItem.palavra}`;
    itemsContainer.innerHTML = '';
    
    let shuffledItems = [...items] // Pega TODOS os 23 itens
        .sort(() => Math.random() - 0.5) // Embaralha
        .slice(0, 6); // Pega 6 aleatórios
    
    // Garante que o item atual está incluso
    if (!shuffledItems.includes(currentItem)) {
        shuffledItems[0] = currentItem;
    }
    
    speak(`Onde está ${currentItem.palavra}?`);
    
    // Cria os cards
    shuffledItems.forEach(item => {
        const card = document.createElement('div');
        card.style.margin = '10px';
        card.style.display = 'inline-block';
        
        const img = document.createElement('img');
        img.src = item.imagem;
        img.alt = item.palavra;
        img.style.width = '100px';
        img.style.height = '100px';
        img.style.objectFit = 'cover';
        img.style.cursor = 'pointer';
        
        img.addEventListener('click', () => {
            if (item === currentItem) {
                item.acertado = true;
                score++;
                audioCorrect.play();
                messageEl.textContent = 'Correto!';
                lastWrongItem = null; // Reseta o último erro
                speak('Muito bem!');
                setTimeout(updateGame, 800);
            } else {
                audioWrong.play();
                messageEl.textContent = 'Errado! Tente novamente';
                lastWrongItem = currentItem; // Guarda o item errado
                setTimeout(updateGame, 800);
            }
        });
        
        card.appendChild(img);
        itemsContainer.appendChild(card);
    });
}

// Inicializa o jogo
function initGame() {
    // Cria elementos da interface
    const container = document.createElement('div');
    container.id = 'game-container';
    document.body.appendChild(container);
    
    const messageEl = document.createElement('div');
    messageEl.id = 'game-message';
    messageEl.style.fontSize = '24px';
    messageEl.style.marginBottom = '20px';
    container.appendChild(messageEl);
    
    const scoreEl = document.createElement('div');
    scoreEl.id = 'game-score';
    scoreEl.style.fontSize = '20px';
    scoreEl.style.marginBottom = '20px';
    container.appendChild(scoreEl);
    
    const itemsContainer = document.createElement('div');
    itemsContainer.id = 'items-container';
    itemsContainer.style.maxWidth = '500px';
    container.appendChild(itemsContainer);
    
    centerGame();
    updateGame();
}

// Quando a página carrega
window.addEventListener('DOMContentLoaded', () => {
    audioCorrect.src = 'correct.mp3';
    audioWrong.src = 'wrong.mp3';
    audioFinish.src = 'finish.mp3';
    speechSynthesis.getVoices();
    initGame();
});