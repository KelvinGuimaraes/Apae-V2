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

    // Map audio IDs para as Image classes
    const audioImageMap = [
        { audioId: "amarelo_player", imgClass: ".amarelo" },
        { audioId: "azul_player", imgClass: ".azul" },
        { audioId: "vermelho_player", imgClass: ".vermelho" },
        { audioId: "verde_player", imgClass: ".verde" },
        { audioId: "marrom_player", imgClass: ".marrom" },
        { audioId: "rosa_player", imgClass: ".rosa" },
        { audioId: "roxo_player", imgClass: ".roxo" },
        { audioId: "preto_player", imgClass: ".preto" },
        { audioId: "branco_player", imgClass: ".branco" },
        { audioId: "cinza_player", imgClass: ".cinza" },
        { audioId: "laranja_player", imgClass: ".laranja" },
        { audioId: "lilas_player", imgClass: ".lilas" },
        { audioId: "azul_claro_player", imgClass: ".azul-claro" },
        { audioId: "lavanda_player", imgClass: ".lavanda" },
        { audioId: "turquesa_player", imgClass: ".turquesa" }

    ];

    // Add click event listeners para todos os audio players
    audioImageMap.forEach(pair => {
        addClickListener(pair.audioId, pair.imgClass);
    });
});
