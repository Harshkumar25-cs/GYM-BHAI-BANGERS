const playlist = [

    {
        title: "Chunnari Chunnari",
        artist: "Salman Hits",
        src: "music/Chunnari%20Chunnari.mp3"
    },

    {
        title: "Dekha Hai Pehli Baar",
        artist: "Salman Hits",
        src: "music/Dekha%20Hai%20Pehli%20Baar.mp3"
    },

    {
        title: "Dhinka Chika",
        artist: "Salman Hits",
        src: "music/Dhinka%20Chika.mp3"
    },

    {
        title: "Dil Deewana",
        artist: "Salman Hits",
        src: "music/Dil%20Deewana.mp3"
    },

    {
        title: "Dil Diyan Gallan",
        artist: "Salman Hits",
        src: "music/Dil%20Diyan%20Gallan%20(From%20_Tiger%20Zinda%20Hai_).mp3"
    },

    {
        title: "JALWA",
        artist: "Salman Hits",
        src: "music/JALWA.mp3"
    },

    {
        title: "LE LE MAZAA LE",
        artist: "Salman Hits",
        src: "music/LE%20LE%20MAZAA%20LE.mp3"
    },

    {
        title: "LOVE ME LOVE ME",
        artist: "Salman Hits",
        src: "music/LOVE%20ME%20LOVE%20ME.mp3"
    },

    {
        title: "O O JAANE JAANA",
        artist: "Salman Hits",
        src: "music/O%20O%20JAANE%20JAANA.mp3"
    },

    {
        title: "PEHLI PEHLI BAAR MOHABBAT KI HAI",
        artist: "Salman Hits",
        src: "music/PEHLI%20PEHLI%20BAAR%20MOHABBAT%20KI%20HAI.mp3"
    },

    {
        title: "Saathiya Tune Kya Kiya",
        artist: "Salman Hits",
        src: "music/Saathiya%20Tune%20Kya%20Kiya.mp3"
    },

    {
        title: "TERE NAAM",
        artist: "Salman Hits",
        src: "music/TERE%20NAAM.mp3"
    },

    {
        title: "Tan Tana Tan Tan",
        artist: "Salman Hits",
        src: "music/Tan%20Tana%20Tan%20Tan.mp3"
    }

];


// =========================================
// AUDIO PLAYER
// =========================================

const audio = new Audio();

let currentSong = 0;


// =========================================
// GET HTML ELEMENTS
// =========================================

const playButton =
    document.getElementById("play");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progress =
    document.getElementById("progress");

const currentTime =
    document.getElementById("current-time");

const totalTime =
    document.getElementById("total-time");

const songTitle =
    document.getElementById("song-title");

const artistName =
    document.getElementById("artist-name");

const albumImage =
    document.getElementById("album-image");

const clock =
    document.getElementById("clock");


// =========================================
// CLOCK
// =========================================

function updateClock() {

    const now = new Date();

    let hours = now.getHours();

    const minutes =
        String(now.getMinutes()).padStart(2, "0");

    const seconds =
        String(now.getSeconds()).padStart(2, "0");

    const ampm =
        hours >= 12 ? "PM" : "AM";

    hours =
        hours % 12 || 12;

    clock.textContent =
        `${hours}:${minutes} ${ampm}`;
}

updateClock();

setInterval(updateClock, 1000);


// =========================================
// LOAD SONG
// =========================================

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

    audio.src =
        song.src;

    audio.load();

    progress.value = 0;

    currentTime.textContent =
        "0:00";

    totalTime.textContent =
        "0:00";

    playButton.textContent =
        "▶";

}


// =========================================
// PLAY
// =========================================

function playSong() {

    audio.play()
        .then(() => {

            playButton.textContent =
                "❚❚";

        })
        .catch((error) => {

            console.error(
                "Unable to play audio:",
                error
            );

            alert(
                "The song could not be played. Check the MP3 filename in the music folder."
            );

        });

}


// =========================================
// PAUSE
// =========================================

function pauseSong() {

    audio.pause();

    playButton.textContent =
        "▶";

}


// =========================================
// PLAY / PAUSE BUTTON
// =========================================

playButton.addEventListener(
    "click",
    () => {

        if (audio.paused) {

            playSong();

        } else {

            pauseSong();

        }

    }
);


// =========================================
// NEXT SONG
// =========================================

function nextSong() {

    currentSong++;

    if (
        currentSong >=
        playlist.length
    ) {

        currentSong = 0;

    }

    loadSong(currentSong);

    playSong();

}

nextButton.addEventListener(
    "click",
    nextSong
);


// =========================================
// PREVIOUS SONG
// =========================================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong =
            playlist.length - 1;

    }

    loadSong(currentSong);

    playSong();

}

previousButton.addEventListener(
    "click",
    previousSong
);


// =========================================
// WHEN SONG ENDS
// =========================================

audio.addEventListener(
    "ended",
    () => {

        nextSong();

    }
);


// =========================================
// UPDATE PROGRESS
// =========================================

audio.addEventListener(
    "timeupdate",
    () => {

        if (!audio.duration) {
            return;
        }

        const percentage =
            (
                audio.currentTime /
                audio.duration
            ) * 100;

        progress.value =
            percentage;

        currentTime.textContent =
            formatTime(
                audio.currentTime
            );

    }
);


// =========================================
// LOAD TOTAL DURATION
// =========================================

audio.addEventListener(
    "loadedmetadata",
    () => {

        totalTime.textContent =
            formatTime(
                audio.duration
            );

    }
);


// =========================================
// PROGRESS SLIDER
// =========================================

progress.addEventListener(
    "input",
    () => {

        if (!audio.duration) {
            return;
        }

        audio.currentTime =
            (
                progress.value / 100
            ) *
            audio.duration;

    }
);


// =========================================
// FORMAT TIME
// =========================================

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


// =========================================
// START WITH FIRST SONG
// =========================================

loadSong(0);
