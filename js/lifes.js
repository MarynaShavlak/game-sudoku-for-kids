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
      increaseLosesQuantity();
      isWinBefore = false;
      setWinsPercentage();
      console.log('statistics: ', statistics);
    }, 300);
  }
  createLifes();
}

function createLifes() {
  let lifesBlock = document.querySelector('.menu .lifes');
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
