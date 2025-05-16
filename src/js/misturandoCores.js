// funcao do 3 botoes audio
var clicouBotaoA = false;
let clicouBotaoB = false;
let clicouBotaoC = false;

function A() {
  clicouBotaoA = true;
  document.getElementById("azul").play();
  checkDoubleClick();
}

function C() {
  clicouBotaoC = true;
  document.getElementById("vermelho").play();
  checkDoubleClick();
}

function B() {
  clicouBotaoB = true;
  document.getElementById("amarelo").play();
  checkDoubleClick();
}
// funcao para verde
function checkDoubleClick() {
  if (clicouBotaoA && clicouBotaoB) {
    setTimeout(function () {
      document.getElementById("resultado").style.display = "block";
      document.getElementById("resultado").style.backgroundColor = "green";
      document.getElementById("resultado").querySelector("p").innerText =
        "Verde";
      document.getElementById("verde").play();
    }, 1300);
    resetClicks();
    return;
  }
  // funcao para roxo
  if (clicouBotaoA && clicouBotaoC) {
    setTimeout(function () {
      document.getElementById("resultado").style.display = "block";
      document.getElementById("resultado").style.backgroundColor = "purple";
      document.getElementById("resultado").querySelector("p").innerText =
        "roxo";
      document.getElementById("roxo").play();
    }, 1300);
    resetClicks();
    return;
  }
  // funcao para laranja
  if (clicouBotaoC && clicouBotaoB) {
    setTimeout(function () {
      document.getElementById("resultado").style.display = "block";
      document.getElementById("resultado").style.backgroundColor = "orange";
      document.getElementById("resultado").querySelector("p").innerText =
        "laranja";
      document.getElementById("laranja").play();
    }, 1300);
    resetClicks();
    return;
  }
}
// Resetar variáveis
let clicoureset = false;
function reset() {
  clicoureset = true;
  clicouBotaoA = false;
  clicouBotaoB = false;
  clicouBotaoC = false;

  document.getElementById("resultado").style.backgroundColor = "#f8f8ff";
  document.getElementById("resultado").querySelector("p").innerText =
    "resultado";
  resetClicks(1);
  return;
}
