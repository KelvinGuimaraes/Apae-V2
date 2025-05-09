const palavras = [
  { palavra: "amarelo", imagem: "../images/soletrando/amarelo.jpeg", audioId: "../audio/soletrando/amarelo.mp3" },
  { palavra: "vermelho", imagem: "../images/soletrando/vermelho.jpeg", audioId: "../audio/soletrando/vermelho.mp3" },
  { palavra: "azul", imagem: "../images/soletrando/azul.jpeg", audioId: "../audio/soletrando/azul.mp3" },
  { palavra: "casa", imagem: "../images/soletrando/casa.jpeg", audioId: "../audio/soletrando/casa.mp3" },
  { palavra: "carro", imagem: "../images/soletrando/carro.jpeg", audioId: "../audio/soletrando/carro.mp3" },
  { palavra: "bola", imagem: "../images/soletrando/bola.jpeg", audioId: "../audio/soletrando/bola.mp3" },
  { palavra: "mamãe", imagem: "../images/soletrando/mamãe.jpeg", audioId: "../audio/soletrando/mamãe.mp3" },
  { palavra: "papai", imagem: "../images/soletrando/papai.jpeg", audioId: "../audio/soletrando/papai.mp3" },
  { palavra: "gato", imagem: "../images/soletrando/gato.jpeg", audioId: "../audio/soletrando/gato.mp3" },
  { palavra: "cachorro", imagem: "../images/soletrando/cachorro.jpeg", audioId: "../audio/soletrando/cachorro.mp3" },
  { palavra: "peixe", imagem: "../images/soletrando/peixe.jpeg", audioId: "../audio/soletrando/peixe.mp3" },
  // Adicionar os outros aqui (palavras, imagens e áudios)
];

let indiceAtual = 0;
let tentativa = "";

const container = document.createElement("div");
container.classList.add("soletrando-container");

const imagem = document.createElement("img");
imagem.classList.add("soletrando-imagem");

const botoesContainer = document.createElement("div");
botoesContainer.classList.add("soletrando-letras");

const tentativaTexto = document.createElement("p");
tentativaTexto.classList.add("feedback");

document.body.querySelector(".main").after(container);
container.append(botoesContainer, tentativaTexto);

document.querySelector(".card-figure").append(imagem);
container.append(imagem);

//converte letras acentuadas para simples
function normalizarLetra(letra) {
  const mapa = {
    'á': 'a',
    'à': 'a',
    'ã': 'a',
    'â': 'a',
    'é': 'e',
    'ê': 'e',
    'í': 'i',
    'ó': 'o',
    'ô': 'o',
    'õ': 'o',
    'ú': 'u',
    'ç': 'c',
  };
  return mapa[letra] || letra;
}

function reiniciarJogo() {
  indiceAtual = 0;
  // Embaralha a ordem das palavras para um novo jogo
  palavras.sort(() => 0.5 - Math.random());
  iniciarRodada();
}

function iniciarRodada() {
  botoesContainer.innerHTML = "";
  tentativa = "";
  tentativaTexto.textContent = "";
  tentativaTexto.className = "feedback";

  if (indiceAtual >= palavras.length) {  
    tentativaTexto.textContent =
      "🎉 Parabéns! Você completou todas as palavras! Reiniciando...";
    tentativaTexto.classList.add("correto");

    // TOCA SOM DE VITÓRIA
    const somVitoria = new Audio("../audio/soletrando/efeito-vitória.mp3");
    somVitoria.play();

    setTimeout(reiniciarJogo, 5000); // Reinicia após 5 segundos (tempo da musica terminar)
    return;
  }

  const palavraAtual = palavras[indiceAtual];
  const audio = new Audio(palavraAtual.audioId); // TOCA O ÁUDIO DA PALAVRA
  audio.play().catch((error) => {
    console.warn("Falha ao reproduzir o áudio:", error);
  });

  const cardImagem = document.querySelector(".card-img ");
  cardImagem.src = palavraAtual.imagem; // Define o caminho da imagem
  cardImagem.alt = `Imagem da palavra ${palavraAtual.palavra}`; // Texto alternativo

  // PERMITE REPRODUZIR O ÁUDIO AO CLICAR NA IMAGEM
  cardImagem.onclick = () => {
    const audioRepetir = new Audio(palavraAtual.audioId);
    audioRepetir.play();
  };

  const letras = palavraAtual.palavra.split("").sort(() => 0.5 - Math.random());

  letras.forEach((letra, index) => {
    const btn = document.createElement("button");
    btn.textContent = letra.toUpperCase();
    btn.classList.add("letra-btn");
    btn.dataset.index = index;
    btn.dataset.used = "false";

    btn.onclick = () => {
      if (
        btn.dataset.used === "false" &&
        !tentativaTexto.textContent.includes("✅")
      ) {
        tentativa += letra;
        tentativaTexto.textContent = tentativa.toUpperCase();

        // Normaliza a letra para som (ex: 'ã' -> 'a')
        const letraNormalizada = normalizarLetra(letra.toLowerCase());

        // TOCA O SOM DA LETRA NORMALIZADA
        const somLetra = new Audio(`../audio/letras/${letraNormalizada}.mp3`);
        somLetra.play().catch((error) => {
          console.warn(`Erro ao tocar som da letra '${letraNormalizada}':`, error);
        });

        btn.dataset.used = "true";
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.transform = "scale(0.95)";

        if (tentativa.length === palavraAtual.palavra.length) {
          if (tentativa === palavraAtual.palavra) {
          // TOCA SOM DE ACERTO
            const somAcerto = new Audio("../audio/soletrando/efeito_acerto.mp3");
            somAcerto.play();

            tentativaTexto.textContent = "✅ Correto! Próxima palavra...";
            tentativaTexto.classList.add("correto");
            indiceAtual++;
            setTimeout(iniciarRodada, 1500);
          } else {
            // TOCA SOM DE ERRO
            const somErro = new Audio("../audio/soletrando/efeito-erro.mp3");
            somErro.play();

            tentativaTexto.textContent = "❌ Tente novamente!";
            tentativaTexto.classList.add("errado");
            setTimeout(() => {
              document.querySelectorAll(".letra-btn").forEach((b) => {
                b.disabled = false;
                b.style.opacity = "1";
                b.style.transform = "scale(1)";
                b.dataset.used = "false";
              });
              tentativa = "";
              tentativaTexto.textContent = "";
              tentativaTexto.className = "feedback";
            }, 1500);
          }
        }
      }
    };
    botoesContainer.appendChild(btn);
  });
}

// Embaralha as palavras no início do jogo
palavras.sort(() => 0.5 - Math.random());
iniciarRodada();
