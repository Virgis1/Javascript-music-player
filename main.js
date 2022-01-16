let allMusic = [
  {
    name: 'Superhero',
    artist: 'Wizardz of Oz & Joe Pringle',
    img: 'superhero.jpg',
    src: 'superhero.mp3',
    isLiked: false
  },
  {
    name: 'Taste for Gold',
    artist: 'Jaxson Gamble',
    img: 'nophoto.png',
    src: 'gold.mp3',
    isLiked: false
  },
  {
    name: 'Lydia',
    artist: 'Highly Suspect',
    img: 'suspect.jpg',
    src: 'lydia.mp3',
    isLiked: false
  },
  {
    name: 'Break My Baby',
    artist: 'KALEO',
    img: 'kaleo.jpg',
    src: 'Break.mp3',
    isLiked: false
  },
  {
    name: 'Conversations',
    artist: 'Marney',
    img: 'nophoto.png',
    src: 'Conversations.mp3',
    isLiked: false
  },
  {
    name: 'Cant Go To Hell',
    artist: 'Sin Shake Sin',
    img: 'nophoto.png',
    src: 'hell.mp3',
    isLiked: false
  },
  {
    name: 'Shot Me Down',
    artist: 'David Guetta',
    img: 'ShotMeDown.jpg',
    src: 'ShotMeDown.mp3',
    isLiked: false
  },
  {
    name: 'Randewu',
    artist: 'G&G Sindikatas',
    img: 'randewu.jpg',
    src: 'Randewu.mp3',
    isLiked: false
  },
]
let container = document.getElementsByClassName('container')[0]
let list = document.getElementById("list");
let musicContainer = document.getElementById("music-container");
const ulTag = document.querySelector("ul");
let photoContainer = document.getElementById("photo-container");
let musicName = document.getElementsByClassName('name')[0];
let musicArtist = document.getElementsByClassName('artist')[0];
let musicImg = document.querySelector('#photo-container img');
let audio = document.getElementById('audio');
let playPauseBtn = document.getElementsByClassName('play-pause')[0];
let prevBtn = document.getElementById('prev');
let nextBtn = document.getElementById('next');
let repeatBtn = document.getElementById('repeat');
let likeSong = document.getElementById('likeSong');
let favouriteCont = document.getElementById('favourite');
let progressBar = document.getElementsByClassName('progress-bar')[0];
let progressArea = document.getElementsByClassName('progress-area')[0];


let index = 1;
isMusicPaused = false;
isAudioRepeat = false;


window.addEventListener('load', () => {
  loadMusic(index)
})



for (let i = 0; i < allMusic.length; i++) {

  let liTag = `<li li-index="${i}" onclick="play(this)">       
                  <span>${allMusic[i].artist}</span> - 
                  <span>${allMusic[i].name}</span>
                <audio src="music/${allMusic[i].src}.mp3"></audio>
              </li>`;
  ulTag.insertAdjacentHTML("beforeend", liTag);
}

function loadMusic(index) {
  musicName.innerHTML = allMusic[index].name;
  musicArtist.innerHTML = allMusic[index].artist;
  musicImg.src = `images/${allMusic[index].img}`;
  audio.src = `music/${allMusic[index].src}`;
  if (allMusic[index].isLiked) {
    likeSong.style.color = 'red';
  } else {
    likeSong.style.color = 'black';
  }
}

playPauseBtn.addEventListener('click', () => {
  isMusicPaused ? pauseMusic() : playMusic();
});

prevBtn.addEventListener('click', () => {
  prevSong()
});

nextBtn.addEventListener('click', () => {
  nextSong()
});

repeatBtn.addEventListener('click', () => {
  if (isAudioRepeat) {
    repeatBtn.style.color = 'black';
    isAudioRepeat = false;
  } else {
    repeatBtn.style.color = 'red';
    isAudioRepeat = true;
  }
});

likeSong.addEventListener('click', () => {
  if (allMusic[index].isLiked) {
    console.log('jau megstamas');
  } else {
    likeSong.style.color = 'red';
    allMusic[index].isLiked = true;
    favouriteCont.innerHTML += `<p index="${index}" onclick="playFav(this)" class="favourite-list" >${allMusic[index].artist} - ${allMusic[index].name}</p>`;
  }
});

audio.addEventListener('timeupdate', (e) => {
  let currentTime = e.target.currentTime;
  let duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;

  let musicCurrentTime = document.getElementsByClassName('current-time')[0];
  let musicDuration = document.getElementsByClassName('duration')[0];

  audio.addEventListener('loadeddata', () => {
    let audioDuration = audio.duration;
    musicDuration.innerText = audioDuration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });
  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  if (currentSec < 10) {
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`
});

audio.onended = function () {
  if (isAudioRepeat) {
    audio.currentTime = 0;
    loadMusic(index);
    playMusic();
  } else {
    nextSong();
  }

};
function playMusic() {
  isMusicPaused = true
  audio.play();
  playPauseBtn.querySelector('#play').style.display = 'none';
  playPauseBtn.querySelector('#pause').style.display = 'block';
}

function pauseMusic() {
  isMusicPaused = false;
  audio.pause();
  playPauseBtn.querySelector('#pause').style.display = 'none';
  playPauseBtn.querySelector('#play').style.display = 'block';
}

function nextSong() {
  index++;
  if (index > allMusic.length) {
    index = 1
  } else {
    index = index;
  }
  loadMusic(index);
  playMusic();
}
function prevSong() {
  index--;
  if (index < 1) {
    index = allMusic.length
  } else {
    index = index;
  }
  loadMusic(index);
  playMusic()
}

function play(el) {
  let getLiIndex = el.getAttribute("li-index");
  musicIndex = getLiIndex;
  loadMusic(musicIndex);
  playMusic();

}

function showList() {
  showHide()
}
let isShow = false;
function showHide() {
  if (!isShow) {
    musicContainer.style.display = "block";
    photoContainer.style.display = "none";
    favouriteCont.style.display = "none";
  } else {
    musicContainer.style.display = "none";
    photoContainer.style.display = "block";
    favouriteCont.style.display = "none";
  }
  isShow = !isShow;
}
function playFav(el) {
  let getIndex = el.getAttribute("index");
  musicIndex = getIndex;
  loadMusic(musicIndex);
  playMusic();
}

let showFavourite = true;
function favourite() {
  if (showFavourite) {
    favouriteCont.style.display = "block";
    photoContainer.style.display = "none";
    musicContainer.style.display = "none";
  } else {
    photoContainer.style.display = "block";
    musicContainer.style.display = "none";
    favouriteCont.style.display = "none";
  }
  showFavourite = !showFavourite
}