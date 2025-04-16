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
        { audioId: "estou_com_fome_player", imgClass: ".estou_com_fome" },
        { audioId: "estou_com_sede_player", imgClass: ".estou_com_sede" },
        { audioId: "estou_cansado_player", imgClass: ".estou_cansado" },
        { audioId: "sim_player", imgClass: ".sim" },
        { audioId: "preciso_ir_ao_banheiro_player", imgClass: ".preciso_ir_ao_banheiro" },
        { audioId: "quero_brincar_player", imgClass: ".quero_brincar" },
        { audioId: "nao_me_sinto_bem_player", imgClass: ".nao_me_sinto_bem" },
        { audioId: "nao_player", imgClass: ".nao" }
    ];

    // Add click event listeners para todos os audio players
    audioImageMap.forEach(pair => {
        addClickListener(pair.audioId, pair.imgClass);
    });
});
