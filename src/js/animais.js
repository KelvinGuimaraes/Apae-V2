let audioAtual = null; 

function mostrarGrupo(grupo) {
  const grupos = document.querySelectorAll('.grupo');
  
  grupos.forEach(g => g.style.display = 'none'); 
  document.getElementById(grupo).style.display = 'flex'; 
}

function tocarSom(caminhoSom) {
  if (!caminhoSom || caminhoSom === '#') {
    alert("Som não disponível ainda.");
    return;
  }

  
  if (audioAtual) {
    audioAtual.pause();
    audioAtual.currentTime = 0;
  }

  
  audioAtual = new Audio(caminhoSom);
  audioAtual.play();
}