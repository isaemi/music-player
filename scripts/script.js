const images = ["images/heavy.jpeg", "images/ghostlyKisses.jpeg", "images/fallingApart.jpeg", "images/bones.jpeg", "images/suffocate.jpeg","images/drunkgroove.jpeg"];
const filenames = [
    "musics/Heavy.mp3",
    "musics/Heaven,wait.mp3",
    "musics/FallingApart.mp3",
    "musics/Bones.mp3",
    "musics/Suffocate.mp3",
    "musics/DrunkGroove.mp3"
];
const titles = [
    "Heavy",
    "Heaven,wait",
    "FallingApart",
    "Bones",
    "Suffocate",
    "DrunkGroove"
]
const artists = [
    "POWERS",
    "Ghostly Kisses",
    "Michael Schulte",
    "Oliver Koletzki; HVOB",
    "Nathan Wagner",
    "MARUV & BOOSIN"
]


let currentIndex = 0;

function updateImage(){
    const image = document.getElementById("song-img");
    const song = document.getElementById("filenames");
    const title = document.getElementById("titles");
    const artist = document.getElementById("artists")
    image.src = "images/" + images[currentIndex];
    song.src = "musics/" + song[currentIndex];
    title.textContent = titles[currentIndex];
    artist.textContent = artists[currentIndex];
}

function init() {
    const prev = document.getElementById("prev");
    const next = document.getElementById("next");
    prev.addEventListener("click", playPreviousSong);
    next.addEventListener("click", playNextSong);
}

function playNextSong(){
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

function playPreviousSong(){
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

let progress = document.getElementById("progress");
            let song = document.getElementById("song");
            let ctrlIcon = document.getElementById("ctrlIcon");

            song.onloadedmetadata = function(){
                progress.max = song.duration;
                progress.value = song.currentTime;
            }

            function playPause(){
                if(ctrlIcon.classList.contains("fa-pause")){
                    song.pause();
                    ctrlIcon.classList.remove("fa-pause");
                    ctrlIcon.classList.add("fa-play");
                }
                else{
                    song.play();
                    ctrlIcon.classList.add("fa-pause");
                    ctrlIcon.classList.remove("fa-play");
                }
            }

            if(song.play()){
                setInterval(()=>{
                    progress.value = song.currentTime
                },500);
            }
            
            progress.onchange = function(){
                song.play();
                song.currentTime = progress.value;
                ctrlIcon.classList.add("fa-pause");
                ctrlIcon.classList.remove("fa-play");
            }