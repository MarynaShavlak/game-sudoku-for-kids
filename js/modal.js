const cloudOpenModal = document.querySelector('.cloud-rules');
const catOpenModal = document.querySelector('.cat-rules');
const rulesTitle = document.querySelector('#rules');
const rulesModal = document.querySelector('.rules-modal');
const modalWindow = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const restartBtnWin = document.querySelector('#restartBtnWin');
const restartBtnLose = document.querySelector('#restartBtnLose');
const winWindow = document.querySelector('.end-game-win.modal');
const loseWindow = document.querySelector('.end-game-lose.modal');

const rulesWindow = document.querySelector('.rules-modal');
const confirmationWindow = document.querySelector('.confirmation-modal');
const pauseGameWindow = document.querySelector('.pause-game-modal');
const continueGameBtn = document.querySelector('.continueGameBtn');
const rulesCloseIcon = document.querySelector('.rules-close-icon');
const confirmCloseIcon = document.querySelector('.confirm-close-icon');
const cancelBtn = document.querySelector('.cancelBtn');
const confirmBtn = document.querySelector('.confirmBtn');

cloudOpenModal.addEventListener('click', openRules);
catOpenModal.addEventListener('click', openRules);
rulesTitle.addEventListener('click', openRules);
confirmCloseIcon.addEventListener('click', closeConfirmationModal);
cancelBtn.addEventListener('click', closeConfirmationModal);
confirmBtn.addEventListener('click', backToStartMenu);
continueGameBtn.addEventListener('click', continueGame);
rulesCloseIcon.addEventListener('click', closeRulesModal);
restartBtnWin.addEventListener('click', onRestartBtnWinClick);
restartBtnLose.addEventListener('click', onRestartBtnLoseClick);

function openRules() {
  rulesModal.classList.add('modal--isActive');
}

function closeRulesModal() {
  rulesWindow.classList.remove('modal--isActive');
}

function openConfirmationModal() {
  openModal(confirmationWindow);
  pauseTimer();
}

function closeConfirmationModal() {
  confirmationWindow.classList.remove('modal--isActive');
  runTimer();
}

function openModal(modalElement) {
  const isWinWindow = modalElement.classList.contains('end-game-win');
  const isLoseWindow = modalElement.classList.contains('end-game-lose');

  const imageUrl = isWinWindow
    ? `./images/${chosenTopic}/win.jpg`
    : isLoseWindow
    ? `./images/${chosenTopic}/lose.jpg`
    : `./images/${chosenTopic}/background.jpg`;
  const content = modalElement.querySelector('.modal__content');
  content.style.background = `url('${imageUrl}') no-repeat center center`;
  content.style.backgroundSize = 'cover';
  modalElement.classList.add('modal--isActive');
}

function openGameResultModal(modalElement) {
  openModal(modalElement);
  clearInterval(timerID);
}

function closeGameResultModal(modalElement) {
  modalElement.classList.remove('modal--isActive');
}

function reloadGame() {
  resetAndStopAudioPlayer();
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
  resetCardsBoard();
  console.log('winsQuantity: ', winsQuantity);
  console.log('losesQuantity: ', losesQuantity);
  console.log('startedGamesQuantity: ', startedGamesQuantity);
  console.log('winsWithoutMistakesQuantity: ', winsWithoutMistakesQuantity);
  console.log(
    'maxContinuousGamesWithoutMistakesQuantity: ',
    maxContinuousGamesWithoutMistakesQuantity,
  );
  console.log(
    'currentContinuousGamesWithoutMistakesQuantity: ',
    currentContinuousGamesWithoutMistakesQuantity,
  );
}

function resetCardsBoard() {
  cardsContainer.innerHTML = '';
  createTaskBoard();
  createImageSelectionBlock(solution);
}

function backToStartMenu() {
  closeConfirmationModal();
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
  resetAndStopAudioPlayer();
  resetCardsBoard();
  isPaused = false;
}

function continueGame() {
  pauseGameWindow.classList.remove('modal--isActive');
  pauseGameBtn.classList.toggle('hidden');
  playGameBtn.classList.toggle('hidden');
  runTimer();
}

function onRestartBtnWinClick() {
  reloadGame();
  closeGameResultModal(winWindow);
}
function onRestartBtnLoseClick() {
  reloadGame();
  closeGameResultModal(loseWindow);
}
