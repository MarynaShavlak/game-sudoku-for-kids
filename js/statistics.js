let winsQuantity = 0;
let losesQuantity = 0;
let winsPercentage;
let startedGamesQuantity = 0;
let winsWithoutMistakesQuantity = 0;
let isWinBefore = true;
let maxContinuousGamesWithoutMistakesQuantity = 0;
let currentContinuousGamesWithoutMistakesQuantity = 0;

function increaseWinsQuantity() {
  winsQuantity += 1;
}
function increaseLosesQuantity() {
  losesQuantity += 1;
}

function calculateWinsPercentage() {
  if (winsQuantity === 0) {
    winsPercentage = 0;
    return;
  }
  winsPercentage = ((winsQuantity + losesQuantity) / winsQuantity) * 100;
}

function increaseStartedGamesQuantity() {
  startedGamesQuantity += 1;
}
// function increaseMaxGamesWithoutMistakesQuantity() {
//   maxGamesWithoutMistakesQuantity += 1;
// }
// function increaseCurrentGamesWithoutMistakesQuantity() {
//   curentGamesWithoutMistakesQuantity += 1;
// }

function handleCurrentGamesWithoutMistakesQuantity() {
  const maxLifesForLevel = lifesValue[chosenLevel];
  if (lifes === maxLifesForLevel) {
    winsWithoutMistakesQuantity += 1;
  }
  console.log('winsWithoutMistakesQuantity: ', winsWithoutMistakesQuantity);
}

function handleCurrentContinuousGamesWithoutMistakesQuantity() {
  if (isWinBefore) {
    currentContinuousGamesWithoutMistakesQuantity += 1;
  }
}
