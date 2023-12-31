const lifesValue = {
  level1: 3,
  level2: 4,
  level3: 5,
};
function minusLife() {
  lifes--;
  if (lifes <= 0) {
    setTimeout(function () {
      openGameResultModal(loseWindow);
      updateLosesQuantity();
      statistics[chosenLevel].isWinBefore = false;
      updateWinsPercentage();
      resetTimer();
    }, 300);
  }
  createLifes();
}

function createLifes() {
  let lifesBlock = document.querySelector('.game-header__menu .lifes');
  lifesBlock.innerHTML = '';
  for (let i = 0; i < lifes; i++) {
    let span = document.createElement('span');
    span.className = 'life-element';
    setLifeStyle(span);
    lifesBlock.appendChild(span);
  }
}

function setLifeStyle(el) {
  const theme = chosenTopic;
  el.style.backgroundImage = `url('./images/${theme}/life.png')`;
}
