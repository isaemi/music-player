/**
 * Array containing paths to images representing the songs.
 * @type {string[]}
 */
const images = ["images/heavy.jpeg", "images/ghostlyKisses.jpeg", "images/fallingApart.jpeg", "images/bones.jpeg", "images/suffocate.jpeg","images/drunkgroove.jpeg"];

/**
 * Array containing paths to audio files.
 * @type {string[]}
 */
const filenames = [
    "musics/Heavy.mp3",
    "musics/Heaven,wait.mp3",
    "musics/FallingApart.mp3",
    "musics/Bones.mp3",
    "musics/Suffocate.mp3",
    "musics/DrunkGroove.mp3"
];

/**
 * Array containing titles of the songs.
 * @type {string[]}
 */
const titles = [
    "Heavy",
    "Heaven,wait",
    "FallingApart",
    "Bones",
    "Suffocate",
    "DrunkGroove"
];

/**
 * Array containing names of the artists.
 * @type {string[]}
 */
const artists = [
    "POWERS",
    "Ghostly Kisses",
    "Michael Schulte",
    "Oliver Koletzki; HVOB",
    "Nathan Wagner",
    "MARUV & BOOSIN"
];

/**
 * Index of the currently playing song.
 * @type {number}
 */
let currentIndex = 0;

/**
 * Flag indicating whether the song is currently playing.
 * @type {boolean}
 */
let isPlaying = false;

/**
 * Updates the image, audio source, title, and artist information based on the current index.
 */
function updateImage(){
    const image = document.getElementById("song-img");
    const song = document.getElementById("song-source");
    const audio = document.getElementById("song-audio");
    const title = document.getElementById("title");
    const artist = document.getElementById("artist");
    
    image.src = images[currentIndex];
    song.src = filenames[currentIndex];

    audio.load();
    audio.play();
    
    title.textContent = titles[currentIndex];
    artist.textContent = artists[currentIndex];
}

/**
 * Initializes the player by adding click event listeners to the previous and next buttons.
 */
function init() {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    prev.addEventListener("click", playPreviousSong);
    next.addEventListener("click", playNextSong);
}

/**
 * Plays the next song in the playlist.
 */
function playNextSong(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

/**
 * Plays the previous song in the playlist.
 */
function playPreviousSong(){
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

/**
 * Handles play/pause functionality and updates the play/pause icon.
 */
function playPause(){
    const ctrlIcon = document.getElementById("ctrlIcon");
    const song = document.getElementById("song-audio");

    if(ctrlIcon.classList.contains("fa-pause")){
        isPlaying = false;
        song.pause();
        ctrlIcon.classList.remove("fa-pause");
        ctrlIcon.classList.add("fa-play");
    }
    else{
        isPlaying = true;
        song.play();
        ctrlIcon.classList.add("fa-pause");
        ctrlIcon.classList.remove("fa-play");
    }
}

/**
 * Updates the progress bar value as the song plays.
 */
function updateProgressBar() {
    const progress = document.getElementById("progress");
    const song = document.getElementById("song-audio");
    const ctrlIcon = document.getElementById("ctrlIcon");

    setInterval(() => {
        if (isPlaying) {
            progress.value = song.currentTime;
        }
    }, 500);
}

// When the DOM is loaded, initialize the player
document.addEventListener("DOMContentLoaded", () => {
    init();
    updateProgressBar();
});

/**
 * Handles user interaction with the progress bar (seeking).
 */
function handleProgressBarChange() {
    const progress = document.getElementById("progress");
    const song = document.getElementById("song-audio");
    const ctrlIcon = document.getElementById("ctrlIcon");

    song.play();
    song.currentTime = progress.value;
    ctrlIcon.classList.add("fa-pause");
    ctrlIcon.classList.remove("fa-play");
}
