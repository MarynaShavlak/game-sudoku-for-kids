const startWindow = document.getElementById('start-window');
const startCategories = document.getElementById('start-window-categories');
const gameWindow = document.getElementById('game-window');
const startGameBtn = document.getElementById('start-game-btn');
const endWindow = document.getElementById('end-window');
const parametersBtn = document.querySelector('.parameters-btn');
const backToRulesBtn = document.querySelector('.back-to-rules-btn');
const gameTitle = document.querySelector('.game-title');

startGameBtn.addEventListener('click', onStartGameBtnClick);
parametersBtn.addEventListener('click', onParametersBtnClick);
backToRulesBtn.addEventListener('click', onBackToRulesBtnClick);

function onBackToRulesBtnClick() {
  cloudOpenModal.style.display = 'block';
  catOpenModal.style.display = 'block';
  rulesTitle.style.display = 'block';
  startCategories.style.display = 'none';
  parametersBtn.style.display = 'block';
  gameTitle.style.display = 'block';
  backToRulesBtn.style.display = 'none';
}

function onParametersBtnClick() {
  cloudOpenModal.style.display = 'none';
  catOpenModal.style.display = 'none';
  rulesTitle.style.display = 'none';
  startCategories.style.display = 'block';
  parametersBtn.style.display = 'none';
  gameTitle.style.display = 'none';
  backToRulesBtn.style.display = 'block';
}

//----при кліці на кнопку Старт----//
function onStartGameBtnClick() {
  chosenImageIndex = 1;
  lifes = lifesValue[chosenLevel];
  createLifes();

  // Приховуємо стартове меню
  hideStartWindow();
  // Показуємо всі елементи гри
  showGameField();
  // В залежності від того чи є обмеження у часі чи немає ми або показуємо блок із таймером або ні
  setTimerInterface();
  setBackgroundSound(chosenTopic);
}

//----ховаємо блок із стартом гри ----//
function hideStartWindow() {
  startWindow.style.display = 'none';
}
//----показуємо блок із стартом гри ----//
function showStartWindow() {
  startWindow.style.display = 'block';
}
//----показуємо блок із елеменами гри( дошка , блок вибору картинок, життя, таймер) ----//
function showGameField() {
  bodyEl.style.background = `url('./images/${chosenTopic}/background.jpg') no-repeat center center`;
  bodyEl.style.display = 'block';
  bodyEl.style.backgroundSize = 'cover';
  gameWindow.style.display = 'block';
  cardsContainer.style.display = 'flex';
}
//----ховаємо блок із із елеменами гри( дошка , блок вибору картинок, життя, таймер)----//
function hideGameField() {
  bodyEl.style.background = `url('./images/start-background.jpg') no-repeat center center`;
  bodyEl.style.display = 'flex';
  bodyEl.style.backgroundSize = 'cover';
  bodyEl.style.justifyContent = 'end';

  gameWindow.style.display = 'none';
  cardsContainer.style.display = 'none';
}
