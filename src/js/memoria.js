const container = document.querySelector(".tabuleiro");
const botoaReiniciar = document.querySelector("button");
let cartas;
let primeiraCarta = "";
let segundaCarta = "";

botoaReiniciar.addEventListener("click", () => location.reload());

let items = [
  { nome: "gato", imagem: "../images/animais/gato.jpg" },
  { nome: "cachorro", imagem: "../images/animais/cachorro.jpg" },
  { nome: "coelho", imagem: "../images/animais/coelho.jpg" },
  { nome: "elefante", imagem: "../images/animais/elefante.jpg" },
  { nome: "girafa", imagem: "../images/animais/girafa.jpg" },
  { nome: "leao", imagem: "../images/animais/leao.jpg" },
  { nome: "tigre", imagem: "../images/animais/tigre.jpg" },
  { nome: "baleia", imagem: "../images/animais/baleia.jpg" },
  { nome: "peixe", imagem: "../images/animais/peixe.jpg" },
  { nome: "hamster", imagem: "../images/animais/hamster.jpg" },
  { nome: "papagaio", imagem: "../images/animais/papagaio.jpg" },
  { nome: "cavalo", imagem: "../images/animais/cavalo.jpg" },
  { nome: "cavalo marinho", imagem: "../images/animais/cavalo marinho.jpg" },
  { nome: "galinha", imagem: "../images/animais/galinha.jpg" },
  { nome: "vaca", imagem: "../images/animais/vaca.jpg" },
  { nome: "porco", imagem: "../images/animais/porco.jpg" },
  { nome: "pato", imagem: "../images/animais/pato.jpg" },
  { nome: "ovelha", imagem: "../images/animais/ovelha.jpg" },
  { nome: "macaco", imagem: "../images/animais/macaco.jpg" },
  { nome: "onca", imagem: "../images/animais/onca.jpg" },
  { nome: "golfinho", imagem: "../images/animais/golfinho.jpg" },
  { nome: "tubarao", imagem: "../images/animais/tubarao.jpg" },
  { nome: "estrela", imagem: "../images/animais/estrela.jpg" },
  { nome: "polvo", imagem: "../images/animais/polvo.jpg" }
];

function criarCartas() {
  let itemsDuplicados = [...items, ...items];
  let animais = itemsDuplicados.sort(() => Math.random() - 0.5);

  animais.map((animal) => {
    container.innerHTML += `
  <div class="carta" data-carta="${animal.nome}">
    <div class="atras">?</div>
    <div class="frente">
      <img src="${animal.imagem}" width="180" height="180" />
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
      if (primeiraCarta == "") {
        carta.classList.add("carta-virada");
        primeiraCarta = carta;
      } else if (segundaCarta == "") {
        carta.classList.add("carta-virada");
        segundaCarta = carta;
        checarCartas(carta);
      }
    });
  });
}
virarCarta();

function checarCartas() {
  const primeiroAnimal = primeiraCarta.getAttribute("data-carta");
  const segundoAnimal = segundaCarta.getAttribute("data-carta");

  if (primeiroAnimal == segundoAnimal) {
    primeiraCarta = "";
    segundaCarta = "";
  } else {
    setTimeout(() => {
      primeiraCarta.classList.remove("carta-virada");
      segundaCarta.classList.remove("carta-virada");

      primeiraCarta = "";
      segundaCarta = "";
    }, 600);
  }
}