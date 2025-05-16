const express = require("express");
const app = express();
const path = require("path");

// Serve static files from 'src/jogos'
app.use(express.static(path.join(__dirname, "src", "jogos")));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});

// Parte da voz
document.addEventListener("DOMContentLoaded", () => {
  const handleClick = (audio) => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  const addClickListener = (audioId, imgClass) => {
    const audio = document.getElementById(audioId);
    const img = document.querySelector(imgClass);

    img.addEventListener("click", () => {
      handleClick(audio);
    });
  };

  // Map audio IDs para as Image clases
  const audioImageMap = [
    { audioId: "/src/audio/jogos/calculadora.mp3", imgClass: ".calculadora" },
    { audioId: "/src/audio/jogos/soletrando.mp3", imgClass: ".soletrando" },
    { audioId: "/src/audio/jogos/misturandoCores.mp3", imgClass: ".misturando_cores" },
    { audioId: "/src/audio/jogos/adicinhacao.mp3", imgClass: ".adivinhacao" },
    { audioId: "/src/audio/jogos/memoria.mp3", imgClass: ".memoria" },
  ];

  // Add click event listeners para todos os audio players
  audioImageMap.forEach((pair) => {
    addClickListener(pair.audioId, pair.imgClass);
  });
});
