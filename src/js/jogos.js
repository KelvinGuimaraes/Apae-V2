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

  const audioImageMap = [
    { audioId: "calculadora_player", imgClass: ".card.calculadora .audio-verde-img" },
    { audioId: "soletrando_player", imgClass: ".card.soletrando .audio-verde-img" },
    { audioId: "misturando_cores_player", imgClass: ".card.misturando-cores .audio-verde-img" },
    { audioId: "adivinhacao_player", imgClass: ".card.adivinhacao .audio-verde-img" },
    { audioId: "memoria_player", imgClass: ".card.memoria .audio-verde-img" },
  ];

  // Add click event listeners para todos os audio players
    audioImageMap.forEach(pair => {
        addClickListener(pair.audioId, pair.imgClass);
    });
});