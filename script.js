/* =========================================
   GYM BHAI BANGERS
   YouTube Music Player
========================================= */


/* =========================================
   PLAYLIST
========================================= */

const playlist = [

    {
        title: "Gym Banger",
        artist: "Gym Bhai",
        videoId: "dQw4w9WgXcQ",
        artwork: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg"
    }

];


/* =========================================
   VARIABLES
========================================= */

let currentSong = 0;

let player;

let isPlayerReady = false;

let progressTimer;


/* =========================================
   HTML ELEMENTS
========================================= */

const playButton = document.getElementById("play");

const previousButton = document.getElementById("previous");

const nextButton = document.getElementById("next");

const progressBar = document.getElementById("progress");

const currentTimeElement =
    document.getElementById("current-time");

const totalTimeElement =
    document.getElementById("total-time");

const songTitle =
    document.getElementById("song-title");

const artistName =
    document.getElementById("artist-name");

const albumImage =
    document.getElementById("album-image");

const clock =
    document.getElementById("clock");


/* =========================================
   CLOCK
========================================= */

function updateClock() {

    const now = new Date();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    clock.textContent =
        `${hours}:${minutes} ${ampm}`;
}


updateClock();

setInterval(updateClock, 1000);


/* =========================================
   LOAD SONG INFORMATION
========================================= */

function loadSong(index) {

    currentSong = index;

    const song =
        playlist[currentSong];

    songTitle.textContent =
        song.title;

    artistName.textContent =
        song.artist;

    albumImage.src =
        song.artwork;

    progressBar.value = 0;

    currentTimeElement.textContent =
        "0:00";

    totalTimeElement.textContent =
        "0:00";

    playButton.textContent = "▶";

    if (isPlayerReady) {

        player.loadVideoById(song.videoId);

    }

}


/* =========================================
   YOUTUBE API READY
========================================= */

function onYouTubeIframeAPIReady() {

    player = new YT.Player(
        "youtube-player",
        {

            height: "1",

            width: "1",

            videoId:
                playlist[currentSong].videoId,

            playerVars: {

                autoplay: 0,

                controls: 0,

                disablekb: 1,

                fs: 0,

                modestbranding: 1,

                rel: 0

            },

            events: {

                onReady:
                    onPlayerReady,

                onStateChange:
                    onPlayerStateChange

            }

        }
    );

}


/* =========================================
   PLAYER READY
========================================= */

function onPlayerReady(event) {

    isPlayerReady = true;

    updateDuration();

    startProgressTimer();

}


/* =========================================
   PLAYER STATE
========================================= */

function onPlayerStateChange(event) {

    if (!isPlayerReady) {
        return;
    }


    /* PLAYING */

    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        playButton.textContent = "❚❚";

        startProgressTimer();

    }


    /* PAUSED */

    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        playButton.textContent = "▶";

    }


    /* ENDED */

    else if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        playNextSong();

    }


    /* CUED */

    else if (
        event.data ===
        YT.PlayerState.CUED
    ) {

        updateDuration();

    }

}


/* =========================================
   PLAY / PAUSE
========================================= */

playButton.addEventListener(
    "click",
    function () {

        if (!isPlayerReady) {
            return;
        }


        const state =
            player.getPlayerState();


        if (
            state ===
            YT.PlayerState.PLAYING
        ) {

            player.pauseVideo();

            playButton.textContent = "▶";

        }

        else {

            player.playVideo();

            playButton.textContent = "❚❚";

        }

    }
);


/* =========================================
   PREVIOUS SONG
========================================= */

previousButton.addEventListener(
    "click",
    function () {

        if (playlist.length <= 1) {

            player.seekTo(0, true);

            return;

        }


        currentSong--;

        if (currentSong < 0) {

            currentSong =
                playlist.length - 1;

        }


        loadSong(currentSong);

    }
);


/* =========================================
   NEXT SONG
========================================= */

nextButton.addEventListener(
    "click",
    function () {

        playNextSong();

    }
);


function playNextSong() {

    currentSong++;

    if (
        currentSong >=
        playlist.length
    ) {

        currentSong = 0;

    }


    loadSong(currentSong);

}


/* =========================================
   UPDATE DURATION
========================================= */

function updateDuration() {

    if (!isPlayerReady) {
        return;
    }


    const duration =
        player.getDuration();


    if (
        duration &&
        duration > 0
    ) {

        totalTimeElement.textContent =
            formatTime(duration);

        progressBar.value = 0;

    }

}


/* =========================================
   PROGRESS UPDATE
========================================= */

function updateProgress() {

    if (!isPlayerReady) {
        return;
    }


    const current =
        player.getCurrentTime();


    const duration =
        player.getDuration();


    if (
        duration &&
        duration > 0
    ) {

        const percentage =
            (current / duration) * 100;


        progressBar.value =
            percentage;


        currentTimeElement.textContent =
            formatTime(current);


        totalTimeElement.textContent =
            formatTime(duration);

    }

}


/* =========================================
   START PROGRESS TIMER
========================================= */

function startProgressTimer() {

    clearInterval(progressTimer);


    progressTimer =
        setInterval(
            updateProgress,
            500
        );

}


/* =========================================
   PROGRESS SLIDER
========================================= */

progressBar.addEventListener(
    "input",
    function () {

        if (!isPlayerReady) {
            return;
        }


        const duration =
            player.getDuration();


        if (
            !duration ||
            duration <= 0
        ) {

            return;

        }


        const newTime =
            (progressBar.value / 100)
            * duration;


        currentTimeElement.textContent =
            formatTime(newTime);

    }
);


progressBar.addEventListener(
    "change",
    function () {

        if (!isPlayerReady) {
            return;
        }


        const duration =
            player.getDuration();


        if (
            !duration ||
            duration <= 0
        ) {

            return;

        }


        const newTime =
            (progressBar.value / 100)
            * duration;


        player.seekTo(
            newTime,
            true
        );

    }
);


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "0:00";

    }


    seconds =
        Math.floor(seconds);


    const minutes =
        Math.floor(seconds / 60);


    const remainingSeconds =
        seconds % 60;


    return `${minutes}:${String(
        remainingSeconds
    ).padStart(2, "0")}`;

}


/* =========================================
   INITIAL SONG
========================================= */

loadSong(0);
