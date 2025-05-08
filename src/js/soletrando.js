const palavras = [
  { palavra: "amarelo", imagem: "../images/soletrando/amarelo.jpeg" },
  { palavra: "vermelho", imagem: "../images/soletrando/vermelho.jpeg" },
  { palavra: "azul", imagem: "../images/soletrando/azul.jpeg" },
  { palavra: "casa", imagem: "../images/soletrando/casa.jpeg" },
  { palavra: "carro", imagem: "../images/soletrando/carro.jpeg" },
  { palavra: "bola", imagem: "../images/soletrando/bola.jpeg" },
  { palavra: "mamãe", imagem: "../images/soletrando/mamãe.jpeg" },
  { palavra: "papai", imagem: "../images/soletrando/papai.jpeg" },
  { palavra: "gato", imagem: "../images/soletrando/gato.jpeg" },
  { palavra: "cachorro", imagem: "../images/soletrando/cachorro.jpeg" },
  { palavra: "peixe", imagem: "../images/soletrando/peixe.jpeg" },
  // Adicionar os outros aqui
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
    setTimeout(reiniciarJogo, 2000); // Reinicia após 2 segundos
    return;
  }

  const palavraAtual = palavras[indiceAtual];
  
  const cardImagem = document.querySelector(".card-img ");
  cardImagem.src = palavraAtual.imagem; // Define o caminho da imagem
  cardImagem.alt = `Imagem da palavra ${palavraAtual.palavra}`; // Texto alternativo

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

        btn.dataset.used = "true";
        btn.disabled = true;
        btn.style.opacity = "0.5";
        btn.style.transform = "scale(0.95)";

        if (tentativa.length === palavraAtual.palavra.length) {
          if (tentativa === palavraAtual.palavra) {
            tentativaTexto.textContent = "✅ Correto! Próxima palavra...";
            tentativaTexto.classList.add("correto");
            indiceAtual++;
            setTimeout(iniciarRodada, 1500);
          } else {
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
