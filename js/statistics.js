const statisticsBlocks = document.querySelectorAll('.statistics-block');
const buttons = [
  document.querySelector('#level-1'),
  document.querySelector('#level-2'),
  document.querySelector('#level-3'),
];
const statLevelBtnList = document.querySelector('.level-btn-list');
statLevelBtnList.addEventListener('click', onStatLevelBtnClick);

let statistics = {
  level1: initializeStatistics(),
  level2: initializeStatistics(),
  level3: initializeStatistics(),
};

const storedStatistics = localStorage.getItem('statistics');
statistics = storedStatistics ? JSON.parse(storedStatistics) : statistics;
localStorage.setItem('statistics', JSON.stringify(statistics));

function getGameTimeValue() {
  if (timerID) {
    const gameTime = timerValue[chosenLevel] - timer;
    statistics[chosenLevel].winGameTimeValues.push(gameTime);
  }
}
function getAverageGameTime(timeValues) {
  const sum = timeValues.reduce((acc, value) => acc + value, 0);
  return timeValues.length !== 0 ? Math.floor(sum / timeValues.length) : 0;
}
function getBestGameTimeResult(timeValues) {
  return timeValues.length !== 0 ? Math.min(...timeValues) : 0;
}
function setGameTimeResults() {
  const levelStats = statistics[chosenLevel];
  levelStats.averageGameTime = getAverageGameTime(levelStats.winGameTimeValues);
  levelStats.bestGameTime = getBestGameTimeResult(levelStats.winGameTimeValues);
}
function increaseWinsQuantity() {
  statistics[chosenLevel].winsQuantity += 1;
}
function increaseLosesQuantity() {
  statistics[chosenLevel].losesQuantity += 1;
}
function setWinsPercentage() {
  const data = statistics[chosenLevel];
  if (data.winsQuantity === 0) {
    data.winsPercentage = 0;
    return;
  }
  data.winsPercentage = Math.floor(
    (data.winsQuantity / (data.winsQuantity + data.losesQuantity)) * 100,
  );
}
function increaseStartedGamesQuantity() {
  statistics[chosenLevel].startedGamesQuantity += 1;
}
function handleGamesWithoutMistakesQuantity() {
  const maxLifesForLevel = lifesValue[chosenLevel];
  if (lifes === maxLifesForLevel) {
    statistics[chosenLevel].winsWithoutMistakesQuantity += 1;
  }
}
function handleCurrentContinuousWinsQuantity() {
  const data = statistics[chosenLevel];
  if (data.isWinBefore) {
    data.currentContinuousWinsQuantity += 1;
    if (data.currentContinuousWinsQuantity > data.maxContinuousWinsQuantity) {
      data.maxContinuousWinsQuantity = data.currentContinuousWinsQuantity;
    }
  } else {
    data.currentContinuousWinsQuantity = 0;
  }
}
function initializeStatistics() {
  return {
    winsQuantity: 0,
    losesQuantity: 0,
    winsPercentage: 0,
    startedGamesQuantity: 0,
    winsWithoutMistakesQuantity: 0,
    isWinBefore: true,
    maxContinuousWinsQuantity: 0,
    currentContinuousWinsQuantity: 0,
    winGameTimeValues: [],
    averageGameTime: 0,
    bestGameTime: 0,
  };
}

function onStatLevelBtnClick(e) {
  const clickedButton = e.target;
  if (clickedButton.nodeName === 'BUTTON') {
    if (clickedButton.classList.contains('active')) return;
    buttons.forEach(button => {
      if (button === clickedButton) {
        const level = button.className.split(' ')[1];
        button.classList.add('active');
        updateStatisticsTable(level);
      } else {
        button.classList.remove('active');
      }
    });
  }
}

function updateStatisticsTable(level) {
  const levelStats = statistics[level];
  statisticsBlocks.forEach(block => {
    const statType = block.id;
    block.innerHTML = levelStats[statType];
  });
}

function resetActiveStatLevel() {
  buttons.forEach(button => {
    if (button.classList.contains('level1')) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}
