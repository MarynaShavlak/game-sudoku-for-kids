function positiveSound() {
  let audio = new Audio('./sound/positive1.mp3');
  audio.muted = mutedSounds;
  audio.play();
}

function negativeSound() {
  let audio = new Audio('./sound/negative1.mp3');
  audio.muted = mutedSounds;
  audio.play();
}

function choiceSound() {
  let audio = new Audio('./sound/choice2.mp3');
  audio.volume = 0.5;
  audio.muted = mutedSounds;
  audio.play();
}

const soundBtnMenu = document.querySelector('.sounds');
const soundOnBtn = document.querySelector('.soundOn');
const soundOffBtn = document.querySelector('.soundOff');
const musicBtnMenu = document.querySelector('.music');
const musicOnBtn = document.querySelector('.musicOn');
const musicOffBtn = document.querySelector('.musicOff');

let mutedMusic = false;
let mutedSounds = false;
let audioPlayer;
soundBtnMenu.addEventListener('click', toggleMuted);
musicBtnMenu.addEventListener('click', toggleMusic);

function setSoundProperties(sound, volume) {
  sound.volume = volume;
  sound.muted = mutedMusic;
  sound.play();
}

function setBackgroundSound(chosenTopic) {
  audioPlayer = document.querySelector('#audio');
  audioPlayer.src = `sound/themeSounds/${chosenTopic}.mp3`;
  setSoundProperties(audioPlayer, 0.1);
}

function toggleMusic() {
  mutedMusic = !mutedMusic;
  musicOnBtn.classList.toggle('hidden');
  musicOffBtn.classList.toggle('hidden');
  audioPlayer.muted = mutedMusic;
}

function resetAndStopAudioPlayer() {
  audioPlayer.currentTime = 0;
  audioPlayer.pause();
}

function toggleMuted() {
  mutedSounds = !mutedSounds;
  soundOnBtn.classList.toggle('hidden');
  soundOffBtn.classList.toggle('hidden');
}
