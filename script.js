/* =========================================
   SALMAN HITS
   Local Music Player
========================================= */


/* =========================================
   PLAYLIST
========================================= */

const playlist = [

    {
        title: "Chunnari Chunnari",
        artist: "Salman Hits",
        file: "music/Chunnari%20Chunnari.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Dekha Hai Pehli Baar",
        artist: "Salman Hits",
        file: "music/Dekha%20Hai%20Pehli%20Baar.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Dhinka Chika",
        artist: "Salman Hits",
        file: "music/Dhinka%20Chika.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Dil Deewana",
        artist: "Salman Hits",
        file: "music/Dil%20Deewana.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Dil Diyan Gallan",
        artist: "Salman Hits",
        file: "music/Dil%20Diyan%20Gallan%20(From%20_Tiger%20Zinda%20Hai_).mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "JALWA",
        artist: "Salman Hits",
        file: "music/JALWA.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "LE LE MAZAA LE",
        artist: "Salman Hits",
        file: "music/LE%20LE%20MAZAA%20LE.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "LOVE ME LOVE ME",
        artist: "Salman Hits",
        file: "music/LOVE%20ME%20LOVE%20ME.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "O O JAANE JAANA",
        artist: "Salman Hits",
        file: "music/O%20O%20JAANE%20JAANA.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "PEHLI PEHLI BAAR MOHABBAT KI HAI",
        artist: "Salman Hits",
        file: "music/PEHLI%20PEHLI%20BAAR%20MOHABBAT%20KI%20HAI.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Saathiya Tune Kya Kiya",
        artist: "Salman Hits",
        file: "music/Saathiya%20Tune%20Kya%20Kiya.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "Tan Tana Tan Tan",
        artist: "Salman Hits",
        file: "music/Tan%20Tana%20Tan%20Tan.mp3",
        artwork: "music/salman%20bhaii.png"
    },

    {
        title: "TERE NAAM",
        artist: "Salman Hits",
        file: "music/TERE%20NAAM.mp3",
        artwork: "music/salman%20bhaii.png"
    }

];


/* =========================================
   VARIABLES
========================================= */

let currentSongIndex = 0;

let isPlaying = false;


/* =========================================
   HTML ELEMENTS
========================================= */

const audioPlayer =
    document.getElementById("audio-player");

const playButton =
    document.getElementById("play");

const nextButton =
    document.getElementById("next");

const previousButton =
    document.getElementById("previous");

const progress =
    document.getElementById("progress");

const currentTimeDisplay =
    document.getElementById("current-time");

const totalTimeDisplay =
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
   LOAD SONG
========================================= */

function loadSong(index) {

    const song = playlist[index];

    if (!song) {
        return;
    }


    /* Set audio file */

    audioPlayer.src = song.file;


    /* Load audio */

    audioPlayer.load();


    /* Update song information */

    songTitle.textContent = song.title;

    artistName.textContent = song.artist;


    /* Update artwork */

    albumImage.src = song.artwork;


    /* Reset progress */

    progress.value = 0;

    currentTimeDisplay.textContent = "0:00";

    totalTimeDisplay.textContent = "0:00";


    /* Update browser tab */

    document.title =
        `${song.title} - Salman Hits`;
}


/* =========================================
   PLAY SONG
========================================= */

function playSong() {

    audioPlayer
        .play()
        .then(() => {

            isPlaying = true;

            playButton.textContent = "❚❚";

            playButton.setAttribute(
                "aria-label",
                "Pause"
            );

        })
        .catch((error) => {

            console.error(
                "Unable to play audio:",
                error
            );

        });
}


/* =========================================
   PAUSE SONG
========================================= */

function pauseSong() {

    audioPlayer.pause();

    isPlaying = false;

    playButton.textContent = "▶";

    playButton.setAttribute(
        "aria-label",
        "Play"
    );
}


/* =========================================
   PLAY / PAUSE BUTTON
========================================= */

playButton.addEventListener(
    "click",
    () => {

        if (isPlaying) {

            pauseSong();

        } else {

            playSong();

        }

    }
);


/* =========================================
   NEXT SONG
========================================= */

function nextSong() {

    currentSongIndex++;

    if (
        currentSongIndex >=
        playlist.length
    ) {

        currentSongIndex = 0;

    }


    loadSong(currentSongIndex);

    playSong();
}


nextButton.addEventListener(
    "click",
    nextSong
);


/* =========================================
   PREVIOUS SONG
========================================= */

function previousSong() {

    currentSongIndex--;

    if (currentSongIndex < 0) {

        currentSongIndex =
            playlist.length - 1;

    }


    loadSong(currentSongIndex);

    playSong();
}


previousButton.addEventListener(
    "click",
    previousSong
);


/* =========================================
   SONG ENDED
========================================= */

audioPlayer.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


/* =========================================
   AUDIO LOADED
========================================= */

audioPlayer.addEventListener(
    "loadedmetadata",
    () => {

        if (
            isNaN(audioPlayer.duration)
        ) {

            return;

        }


        totalTimeDisplay.textContent =
            formatTime(
                audioPlayer.duration
            );

    }
);


/* =========================================
   UPDATE PROGRESS
========================================= */

audioPlayer.addEventListener(
    "timeupdate",
    () => {

        if (
            !audioPlayer.duration ||
            isNaN(audioPlayer.duration)
        ) {

            return;

        }


        const percentage =
            (
                audioPlayer.currentTime /
                audioPlayer.duration
            ) * 100;


        progress.value =
            percentage;


        currentTimeDisplay.textContent =
            formatTime(
                audioPlayer.currentTime
            );

    }
);


/* =========================================
   PROGRESS BAR CLICK / DRAG
========================================= */

progress.addEventListener(
    "input",
    () => {

        if (
            !audioPlayer.duration ||
            isNaN(audioPlayer.duration)
        ) {

            return;

        }


        const newTime =
            (
                progress.value / 100
            ) * audioPlayer.duration;


        audioPlayer.currentTime =
            newTime;

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


    const minutes =
        Math.floor(
            seconds / 60
        );


    const remainingSeconds =
        Math.floor(
            seconds % 60
        );


    return (
        minutes +
        ":" +
        String(
            remainingSeconds
        ).padStart(2, "0")
    );

}


/* =========================================
   CLOCK
========================================= */

function updateClock() {

    const now =
        new Date();


    let hours =
        now.getHours();


    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");


    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");


    const period =
        hours >= 12
            ? "PM"
            : "AM";


    hours =
        hours % 12 || 12;


    clock.textContent =
        `${hours}:${minutes}:${seconds} ${period}`;

}


setInterval(
    updateClock,
    1000
);

updateClock();


/* =========================================
   INITIALIZE PLAYER
========================================= */

loadSong(currentSongIndex);
