const playButton = document.getElementById("play");

let isPlaying = false;


playButton.addEventListener("click", () => {

    isPlaying = !isPlaying;

    if (isPlaying) {

        playButton.textContent = "⏸";

    } else {

        playButton.textContent = "▶";

    }

});
