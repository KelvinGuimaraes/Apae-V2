const container = document.querySelector(".tabuleiro");
const botoaReiniciar = document.querySelector("button");
let cartas;
let primeiraCarta = "";
let segundaCarta = "";

botoaReiniciar.addEventListener("click", () => location.reload());

let items = [
  { nome: "gato", imagem: "/src/images/animais/gato.jpg" },
  { nome: "cachorro", imagem: "/src/images/animais/cachorro.jpg" },
  { nome: "coelho", imagem: "/src/images/animais/coelho.jpg" },
  { nome: "elefante", imagem: "/src/images/animais/elefante.jpg" },
  { nome: "girafa", imagem: "/src/images/animais/girafa.jpg" },
  { nome: "leão", imagem: "/src/images/animais/leão.jpg" },
  { nome: "tigre", imagem: "/src/images/animais/tigre.jpg" },
  { nome: "baleia", imagem: "/src/images/animais/baleia.jpg" },
  { nome: "peixe", imagem: "/src/images/animais/peixe.jpg" },
  { nome: "hamster", imagem: "/src/images/animais/hamster.jpg" },
  { nome: "cavalo", imagem: "/src/images/animais/cavalo.jpg" },
  { nome: "cavalo marinho", imagem: "/src/images/animais/cavalo marinho.jpg" },
  { nome: "galinha", imagem: "/src/images/animais/galinha.jpg" },
  { nome: "vaca", imagem: "/src/images/animais/vaca.jpg" },
  { nome: "porco", imagem: "/src/images/animais/porco.jpg" },
  { nome: "pato", imagem: "/src/images/animais/pato.jpg" },
  { nome: "ovelha", imagem: "/src/images/animais/ovelha.jpg" },
  { nome: "macaco", imagem: "/src/images/animais/macaco.jpg" },
  { nome: "onça", imagem: "/src/images/animais/onça.jpg" },
  { nome: "golfinho", imagem: "/src/images/animais/golfinho.jpg" },
  { nome: "tubarão", imagem: "/src/images/animais/tubarão.jpg" },
  { nome: "estrela", imagem: "/src/images/animais/estrela.jpg" },
  { nome: "polvo", imagem: "/src/images/animais/polvo.jpg" },
  { nome: "papagaio", imagem: "/src/images/animais/papagaio.jpg" }
];

function tocarSom(nomeAnimal) {
  const audio = new Audio(encodeURI(`/src/audio/animais/${nomeAnimal}.mp3`));
  audio.play();
}

function tocarSomSucesso() {
  const audio = new Audio("/src/audio/efeito_acerto.mp3");
  audio.play();
}

function sortearItensParaRodada(qtdPares = 12) {
  // Embaralha o array original e pega apenas a quantidade desejada
  const itensEmbaralhados = [...items].sort(() => Math.random() - 0.5);
  return itensEmbaralhados.slice(0, qtdPares);
}

function criarCartas() {
  container.innerHTML = ""; // Limpa o tabuleiro antes de criar novas cartas
  let itensRodada = sortearItensParaRodada(12);
  let itemsDuplicados = [...itensRodada, ...itensRodada];
  let animais = itemsDuplicados.sort(() => Math.random() - 0.5);

  animais.map((animal) => {
    container.innerHTML += `
      <div class="carta" data-carta="${animal.nome}">
        <div class="atras">?</div>
        <div class="frente">
          <img src="${animal.imagem}" width="160" height="160" />
        </div>
      </div>
    `;
  });
}
criarCartas();

function virarCarta() {
  cartas = document.querySelectorAll(".carta");

  cartas.forEach((carta) => {
    carta.addEventListener("click", () => {
      if (carta === primeiraCarta) return;

      if (primeiraCarta == "") {
        carta.classList.add("carta-virada");
        primeiraCarta = carta;
        tocarSom(primeiraCarta.getAttribute("data-carta"));
      } else if (segundaCarta == "") {
        carta.classList.add("carta-virada");
        segundaCarta = carta;
        tocarSom(segundaCarta.getAttribute("data-carta"));
        checarCartas();
      }
    });
  });
}
virarCarta();

function checarCartas() {
  const primeiroAnimal = primeiraCarta.getAttribute("data-carta");
  const segundoAnimal = segundaCarta.getAttribute("data-carta");

  if (primeiroAnimal === segundoAnimal && primeiraCarta !== segundaCarta) {
    confetti({
      particleCount: 300,
      spread: 120,
      origin: { y: 0.6 }
    });

    tocarSomSucesso();

    primeiraCarta = "";
    segundaCarta = "";

    function tocarSomSucessoFinal() {
      const audio = new Audio("/src/audio/efeito-vitória.mp3");
      audio.play();
    }

    // Verifica se todas as cartas foram encontradas
    setTimeout(() => {
      const cartasViradas = document.querySelectorAll('.carta-virada');
      if (cartasViradas.length === 24) { // 12 pares = 24 cartas
        tocarSomSucessoFinal();
        document.querySelector('.tabuleiro').style.display = 'none';
        document.getElementById('mensagem-parabens').style.display = 'block';
        document.getElementById('btn-reiniciar').onclick = () => location.reload();
      }
    }, 400);

  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("carta-virada");
      segundaCarta.classList.remove("carta-virada");

      primeiraCarta = "";
      segundaCarta = "";
    }, 600);
  }
}