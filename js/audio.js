function positiveSound() {
  let audio = new Audio('./sound/positive1.mp3');
  audio.play();
}

function negativeSound() {
  let audio = new Audio('./sound/negative1.mp3');
  audio.play();
}

function choiceSound() {
  let audio = new Audio('./sound/choice2.mp3');
  audio.volume = 0.5;
  audio.play();
}

const soundBtnMenu = document.querySelector('.sounds');
const soundOnBtn = document.querySelector('.soundOn');
const soundOffBtn = document.querySelector('.soundOff');
let muted = false;
let audioPlayer;
soundBtnMenu.onclick = toggleMuted;

function setSoundProperties(sound, volume) {
  sound.volume = volume;
  sound.muted = muted;
  sound.play();
}

function setBackgroundSound(chosenTopic) {
  audioPlayer = document.querySelector('#audio');
  audioPlayer.src = `sound/themeSounds/${chosenTopic}.mp3`;
  setSoundProperties(audioPlayer, 0.1);
}

function toggleMuted() {
  muted = !muted;
  soundOnBtn.classList.toggle('hidden');
  soundOffBtn.classList.toggle('hidden');
  audioPlayer.muted = muted;
}

function resetAndStopAudioPlayer() {
  audioPlayer.currentTime = 0;
  audioPlayer.pause();
}
