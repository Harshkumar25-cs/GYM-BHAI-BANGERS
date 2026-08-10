const playlist = [

    {
        title: "GOAT",
        artist: "Diljit Dosanjh",
        src: "GOAT.mp3",
        artwork: "https://i.ytimg.com/vi/Lq0S1lqEjxo/hqdefault.jpg"
    },

    {
        title: "JALWA",
        artist: "JALWA",
        src: "JALWA.mp3",
        artwork: "https://i.ytimg.com/vi/INIMqJ7Vy_0/hqdefault.jpg"
    },

    {
        title: "LE LE MAZAA LE",
        artist: "Sajid-Wajid",
        src: "LE LE MAZAA LE.mp3",
        artwork: "https://i.ytimg.com/vi/Q7kv9nuhTB8/hqdefault.jpg"
    },

    {
        title: "LOVE ME LOVE ME",
        artist: "Sajid-Wajid",
        src: "LOVE ME LOVE ME.mp3",
        artwork: "https://i.ytimg.com/vi/bGNmNNZAU7c/hqdefault.jpg"
    },

    {
        title: "HANGOVER",
        artist: "Salman Khan",
        src: "HANGOVER.mp3",
        artwork: "https://i.ytimg.com/vi/5lKv7kdzBZs/hqdefault.jpg"
    },

    {
        title: "O O JAANE JAANA",
        artist: "Kamaal Khan",
        src: "O O JAANE JAANA.mp3",
        artwork: "https://i.ytimg.com/vi/GyU-glCZz3o/hqdefault.jpg"
    },

    {
        title: "Kiya Kiya",
        artist: "Anand Raj Anand • Shweta Pandit",
        src: "Kiya Kiya.mp3",
        artwork: "https://i.ytimg.com/vi/vjK02kjgDws/hqdefault.jpg"
    },

    {
        title: "Raftaarein",
        artist: "Raftaarein",
        src: "Raftaarein.mp3",
        artwork: "https://i.ytimg.com/vi/_zZ_2rDuDtQ/hqdefault.jpg"
    },

    {
        title: "Tera Mera Rishta Continues",
        artist: "Awarapan 2",
        src: "Tera Mera Rishta Continues (From _Awarapan 2...).mp3",
        artwork: "https://i.ytimg.com/vi/W-DwNBbkU20/hqdefault.jpg"
    }

];

let currentSong = 0;

const audio = new Audio();

const playButton =
    document.getElementById("play");

const previousButton =
    document.getElementById("previous");

const nextButton =
    document.getElementById("next");

const progressBar =
    document.getElementById("progress");

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


/* ================================
   CLOCK
================================ */

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


/* ================================
   LOAD SONG
================================ */

function loadSong(index, autoPlay = false) {

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


    progressBar.value = 0;

    currentTimeElement.textContent =
        "0:00";

    totalTimeElement.textContent =
        "0:00";


    playButton.textContent =
        "▶";


    if (autoPlay) {

        audio.play()
            .then(() => {

                playButton.textContent =
                    "❚❚";

            })
            .catch(error => {

                console.error(
                    "Audio playback failed:",
                    error
                );

            });

    }

}


/* ================================
   PLAY / PAUSE
================================ */

playButton.addEventListener(
    "click",
    function () {

        if (audio.paused) {

            audio.play()
                .then(() => {

                    playButton.textContent =
                        "❚❚";

                })
                .catch(error => {

                    console.error(
                        "Playback error:",
                        error
                    );

                });

        }

        else {

            audio.pause();

            playButton.textContent =
                "▶";

        }

    }
);


/* ================================
   PREVIOUS
================================ */

previousButton.addEventListener(
    "click",
    function () {

        currentSong--;

        if (currentSong < 0) {

            currentSong =
                playlist.length - 1;

        }

        loadSong(
            currentSong,
            true
        );

    }
);


/* ================================
   NEXT
================================ */

nextButton.addEventListener(
    "click",
    function () {

        currentSong++;

        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }

        loadSong(
            currentSong,
            true
        );

    }
);


/* ================================
   SONG FINISHED
================================ */

audio.addEventListener(
    "ended",
    function () {

        currentSong++;

        if (
            currentSong >=
            playlist.length
        ) {

            currentSong = 0;

        }

        loadSong(
            currentSong,
            true
        );

    }
);


/* ================================
   TIME UPDATE
================================ */

audio.addEventListener(
    "timeupdate",
    function () {

        if (!audio.duration) {
            return;
        }


        const percentage =
            (audio.currentTime /
                audio.duration) * 100;


        progressBar.value =
            percentage;


        currentTimeElement.textContent =
            formatTime(
                audio.currentTime
            );


        totalTimeElement.textContent =
            formatTime(
                audio.duration
            );

    }
);


/* ================================
   SEEK
================================ */

progressBar.addEventListener(
    "input",
    function () {

        if (!audio.duration) {
            return;
        }


        const newTime =
            (
                progressBar.value / 100
            ) * audio.duration;


        audio.currentTime =
            newTime;

    }
);


/* ================================
   AUDIO EVENTS
================================ */

audio.addEventListener(
    "play",
    function () {

        playButton.textContent =
            "❚❚";

    }
);


audio.addEventListener(
    "pause",
    function () {

        playButton.textContent =
            "▶";

    }
);


/* ================================
   FORMAT TIME
================================ */

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


    return (
        `${minutes}:` +
        `${String(
            remainingSeconds
        ).padStart(2, "0")}`
    );

}


/* ================================
   START FIRST SONG
================================ */

loadSong(0, false);
