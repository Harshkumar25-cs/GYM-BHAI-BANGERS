const playlist = [

    {
        title: "GOAT",
        artist: "Diljit Dosanjh",
        src: "music/GOAT.mp3",
        artwork: "https://i.ytimg.com/vi/Lq0S1lqEjxo/hqdefault.jpg"
    },

    {
        title: "JALWA",
        artist: "JALWA",
        src: "music/JALWA.mp3",
        artwork: "https://i.ytimg.com/vi/INIMqJ7Vy_0/hqdefault.jpg"
    },

    {
        title: "LE LE MAZAA LE",
        artist: "Sajid-Wajid",
        src: "music/LE%20LE%20MAZAA%20LE.mp3",
        artwork: "https://i.ytimg.com/vi/Q7kv9nuhTB8/hqdefault.jpg"
    },

    {
        title: "LOVE ME LOVE ME",
        artist: "Sajid-Wajid",
        src: "music/LOVE%20ME%20LOVE%20ME.mp3",
        artwork: "https://i.ytimg.com/vi/bGNmNNZAU7c/hqdefault.jpg"
    },

    {
        title: "HANGOVER",
        artist: "Salman Khan",
        src: "music/HANGOVER.mp3",
        artwork: "https://i.ytimg.com/vi/5lKv7kdzBZs/hqdefault.jpg"
    },

    {
        title: "O O JAANE JAANA",
        artist: "Kamaal Khan",
        src: "music/O%20O%20JAANE%20JAANA.mp3",
        artwork: "https://i.ytimg.com/vi/GyU-glCZz3o/hqdefault.jpg"
    },

    {
        title: "KIYA KIYA",
        artist: "Anand Raj Anand • Shweta Pandit",
        src: "music/Kiya%20Kiya.mp3",
        artwork: "https://i.ytimg.com/vi/vjK02kjgDws/hqdefault.jpg"
    },

    {
        title: "Raftaarein",
        artist: "Raftaarein",
        src: "music/Raftaarein.mp3",
        artwork: "https://i.ytimg.com/vi/_zZ_2rDuDtQ/hqdefault.jpg"
    },

    {
  title: "Tera Mera Rishta Continues",
  artist: "Awarapan 2",
  src: "music/Tera%20Mera%20Rishta%20Continues.mp3",
  artwork: "https://i.ytimg.com/vi/W-DwNBbkU20/hqdefault.jpg"
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
