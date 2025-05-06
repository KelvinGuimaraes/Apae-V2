const display = document.getElementById("display");
let realExpression = "";
let displayExpression = "";

function appendToDisplay(input) {
  const operadores = ["+", "-", "*", "/"];
  const operadoresDisplay = { "*": "×", "/": "÷" };

  const lastChar = realExpression.slice(-1);

  // Verificar se o input é um operador
  if (operadores.includes(input)) {
    if (realExpression === "" || operadores.includes(lastChar)) {
      return; // não permite operadores repetidos ou no início
    }
    realExpression += input;
    displayExpression += operadoresDisplay[input] || input; // mostra símbolo bonito
  } else {
    realExpression += input;
    displayExpression += input;
  }

  display.value = displayExpression;
}

function clearDisplay() {
  realExpression = "";
  displayExpression = "";
  display.value = "";
}

function calculate() {
  try {
    const result = eval(realExpression);
    display.value = result;
    realExpression = result.toString();
    displayExpression = result.toString();
  } catch (error) {
    display.value = "Erro";
    realExpression = "";
    displayExpression = "";
  }
}
