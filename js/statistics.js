let winsQuantity = 0;
let losesQuantity = 0;
let winsPercentage;
let startedGamesQuantity = 0;

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
