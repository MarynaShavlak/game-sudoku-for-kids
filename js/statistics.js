const statisticsBlocks = document.querySelectorAll('.statistics-block');
const buttons = [
  document.querySelector('#level-1'),
  document.querySelector('#level-2'),
  document.querySelector('#level-3'),
];
const statLevelBtnList = document.querySelector('.stat-level-btn-list');
const resetStatBtn = document.querySelector('.reset-statistics');
statLevelBtnList.addEventListener('click', onStatLevelBtnClick);
resetStatBtn.addEventListener('click', resetStatistics);
let statistics = {
  level1: initializeStatistics(),
  level2: initializeStatistics(),
  level3: initializeStatistics(),
};

const storedStatistics = localStorage.getItem('statistics');
statistics = storedStatistics ? JSON.parse(storedStatistics) : statistics;
updateLocalStorage();

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
function updateWinsQuantity() {
  statistics[chosenLevel].winsQuantity += 1;
}
function updateLosesQuantity() {
  statistics[chosenLevel].losesQuantity += 1;
}
function updateWinsPercentage() {
  const data = statistics[chosenLevel];
  if (data.winsQuantity === 0) {
    data.winsPercentage = 0;
    return;
  }
  data.winsPercentage = Math.floor(
    (data.winsQuantity / (data.winsQuantity + data.losesQuantity)) * 100,
  );
}
function updateStartedGamesQuantity() {
  statistics[chosenLevel].startedGamesQuantity += 1;
}
function updateWinsWithoutMistakesQuantity() {
  const maxLifesForLevel = lifesValue[chosenLevel];
  if (lifes === maxLifesForLevel) {
    statistics[chosenLevel].winsWithoutMistakesQuantity += 1;
  }
}
function updateWinsWithoutHintsQuantity() {
  const maxHintsForLevel = hintsValue[chosenLevel];
  if (hints === maxHintsForLevel) {
    statistics[chosenLevel].winsWithoutHintsQuantity += 1;
  }
}

function updateCurrentContinuousWinsQuantity() {
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
    winsWithoutHintsQuantity: 0,
    isWinBefore: true,
    maxContinuousWinsQuantity: 0,
    currentContinuousWinsQuantity: 0,
    winGameTimeValues: [],
    averageGameTime: 0,
    bestGameTime: 0,
  };
}

function onStatLevelBtnClick(e) {
  const clickedButton = e.target.closest('button');
  if (!clickedButton) return;
  if (clickedButton.classList.contains('active')) return;
  const level = clickedButton.classList[1];
  buttons.forEach(button => {
    const isActive = button === clickedButton;
    button.classList.toggle('active', isActive);
  });
  updateStatisticsTable(level);
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

function resetStatistics() {
  const activeBtnLevel = buttons.find(btn => btn.classList.contains('active'));
  const level = activeBtnLevel.classList[1];
  statistics = {
    level1: initializeStatistics(),
    level2: initializeStatistics(),
    level3: initializeStatistics(),
  };
  updateStatisticsTable(level);
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('statistics', JSON.stringify(statistics));
}

function updateGameStatisticsResults() {
  updateWinsQuantity();
  updateWinsPercentage();
  updateWinsWithoutMistakesQuantity();
  updateWinsWithoutHintsQuantity();
  updateCurrentContinuousWinsQuantity();
  getGameTimeValue();
  statistics[chosenLevel].isWinBefore = true;
}
