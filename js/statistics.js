let statistics = {
  level1: {
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
  },
  level2: {
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
  },
  level3: {
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
  },
};
function getGameTimeValue() {
  if (timerID) {
    const gameTime = timerValue[chosenLevel] - timer;
    statistics[chosenLevel].winGameTimeValues.push(gameTime);
  }
}
function getAverageGameTime(timeValues) {
  const sum =
    timeValues.length !== 0
      ? timeValues.reduce((acc, value) => acc + value, 0)
      : 0;
  return timeValues.length !== 0 ? sum / timeValues.length : 0;
}
function getBestGameTimeResult(timeValues) {
  return timeValues.length !== 0 ? Math.min(...timeValues) : 0;
}

function setGameTimeResults() {
  statistics[chosenLevel].averageGameTime = getAverageGameTime(
    statistics[chosenLevel].winGameTimeValues,
  );
  statistics[chosenLevel].bestGameTime = getBestGameTimeResult(
    statistics[chosenLevel].winGameTimeValues,
  );
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
