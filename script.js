let player;

let isPlaying = false;


// YouTube Player

function onYouTubeIframeAPIReady() {

    player = new YT.Player("youtube-player", {

        videoId: "dQw4w9WgXcQ",

        playerVars: {

            autoplay: 0,

            controls: 0,

            rel: 0

        },

        events: {

            onReady: onPlayerReady,

            onStateChange: onPlayerStateChange

        }

    });

}


// Player ready

function onPlayerReady() {

    console.log("YouTube Player Ready");

    updateDuration();

}


// Player state

function onPlayerStateChange(event) {

    if (event.data === YT.PlayerState.PLAYING) {

        isPlaying = true;

        document.getElementById("play").textContent = "⏸";

        updateProgress();

    }

    else {

        isPlaying = false;

        document.getElementById("play").textContent = "▶";

    }

}


// Play / Pause

document.getElementById("play").addEventListener("click", () => {

    if (!player) return;

    if (isPlaying) {

        player.pauseVideo();

    } else {

        player.playVideo();

    }

});


// Previous

document.getElementById("previous").addEventListener("click", () => {

    if (!player) return;

    player.seekTo(0, true);

});


// Next

document.getElementById("next").addEventListener("click", () => {

    if (!player) return;

    player.seekTo(player.getDuration(), true);

});


// Progress slider

const progress = document.getElementById("progress");

progress.addEventListener("input", () => {

    if (!player) return;

    const duration = player.getDuration();

    const newTime = (progress.value / 100) * duration;

    player.seekTo(newTime, true);

});


// Volume

const volume = document.getElementById("volume");

volume.addEventListener("input", () => {

    if (!player) return;

    player.setVolume(volume.value);

});


// Update progress

function updateProgress() {

    if (!player || !isPlaying) return;

    const current = player.getCurrentTime();

    const duration = player.getDuration();

    if (duration > 0) {

        const percentage = (current / duration) * 100;

        progress.value = percentage;

        document.getElementById("current-time").textContent =
            formatTime(current);

        document.getElementById("duration").textContent =
            formatTime(duration);

    }

    requestAnimationFrame(updateProgress);

}


// Duration

function updateDuration() {

    if (!player) return;

    const duration = player.getDuration();

    if (duration > 0) {

        document.getElementById("duration").textContent =
            formatTime(duration);

    }

}


// Format time

function formatTime(seconds) {

    seconds = Math.floor(seconds);

    const minutes = Math.floor(seconds / 60);

    const remainingSeconds = seconds % 60;

    return minutes + ":" +
        (remainingSeconds < 10 ? "0" : "") +
        remainingSeconds;

}