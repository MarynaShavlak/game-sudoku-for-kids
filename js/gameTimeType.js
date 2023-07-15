let chosenGameType = 'game-without-timer';
const gameTypeList = document.querySelector('.game-type-list');
gameTypeList.addEventListener('click', onTypeBtnClick);
const gameTimeTypeBtnCollection = [
  document.querySelector('#game-with-timer'),
  document.querySelector('#game-without-timer'),
];

function onTypeBtnClick(e) {
  const clickedType = e.target;
  if (clickedType.nodeName !== 'BUTTON') return;
  if (clickedType.classList.contains('active')) return;
  gameTimeTypeBtnCollection.forEach(type => {
    if (type === clickedType) {
      chosenGameType = clickedType.id;
      type.classList.add('active');
    } else {
      type.classList.remove('active');
    }
  });
}

function setTimerInterface() {
  if (chosenGameType === 'game-without-timer') {
    timerWrapper.style.display = 'none';
    pauseBtnMenu.style.display = 'none';
  } else {
    timerWrapper.style.display = 'flex';
    pauseBtnMenu.style.display = 'block';
    setTimer(timerValue[chosenLevel]);
    countdownTime();
  }
}
