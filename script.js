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
let player = null;
let playerReady = false;
let progressTimer = null;


/* =========================================
   ELEMENTS
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

    hours = hours % 12 || 12;

    clock.textContent =
        `${hours}:${minutes} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);


/* =========================================
   LOAD SONG INFO
========================================= */

function updateSongInfo() {

    const song = playlist[currentSong];

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;

    albumImage.src = song.artwork;
}


/* =========================================
   YOUTUBE API
========================================= */

function onYouTubeIframeAPIReady() {

    console.log("YouTube API loaded.");

    player = new YT.Player(
        "youtube-player",
        {
            width: "200",
            height: "200",

            videoId:
                playlist[currentSong].videoId,

            playerVars: {
                autoplay: 0,
                controls: 0,
                playsinline: 1,
                rel: 0
            },

            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
                onError: onPlayerError
            }
        }
    );
}


/* =========================================
   PLAYER READY
========================================= */

function onPlayerReady(event) {

    console.log("YouTube player ready.");

    playerReady = true;

    updateDuration();

    startProgressTimer();

    playButton.disabled = false;

    previousButton.disabled = false;

    nextButton.disabled = false;
}


/* =========================================
   PLAYER ERROR
========================================= */

function onPlayerError(event) {

    console.error(
        "YouTube Player Error:",
        event.data
    );
}


/* =========================================
   PLAYER STATE
========================================= */

function onPlayerStateChange(event) {

    console.log(
        "Player state:",
        event.data
    );


    if (
        event.data ===
        YT.PlayerState.PLAYING
    ) {

        playButton.textContent = "❚❚";

        startProgressTimer();
    }


    else if (
        event.data ===
        YT.PlayerState.PAUSED
    ) {

        playButton.textContent = "▶";
    }


    else if (
        event.data ===
        YT.PlayerState.ENDED
    ) {

        playNextSong();
    }


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

        console.log("Play button clicked.");


        if (!playerReady) {

            console.log(
                "YouTube player is not ready yet."
            );

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
   PREVIOUS
========================================= */

previousButton.addEventListener(
    "click",
    function () {

        if (!playerReady) {
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
   NEXT
========================================= */

nextButton.addEventListener(
    "click",
    function () {

        playNextSong();

    }
);


/* =========================================
   NEXT SONG FUNCTION
========================================= */

function playNextSong() {

    if (!playerReady) {
        return;
    }


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
   LOAD SONG
========================================= */

function loadSong(index) {

    currentSong = index;

    const song =
        playlist[currentSong];


    updateSongInfo();


    currentTimeElement.textContent =
        "0:00";


    totalTimeElement.textContent =
        "0:00";


    progressBar.value = 0;


    playButton.textContent =
        "▶";


    if (playerReady) {

        player.loadVideoById(
            song.videoId
        );

    }
}


/* =========================================
   UPDATE DURATION
========================================= */

function updateDuration() {

    if (!playerReady) {
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
    }
}


/* =========================================
   UPDATE PROGRESS
========================================= */

function updateProgress() {

    if (!playerReady) {
        return;
    }


    const duration =
        player.getDuration();


    const current =
        player.getCurrentTime();


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
   PROGRESS TIMER
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

        if (!playerReady) {
            return;
        }


        const duration =
            player.getDuration();


        if (!duration) {
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

        if (!playerReady) {
            return;
        }


        const duration =
            player.getDuration();


        if (!duration) {
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
   INITIALIZE
========================================= */

updateSongInfo();
