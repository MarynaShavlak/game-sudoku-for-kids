// =======
// Правила
// =======

//вибрати хмаринку чи кота "Правила"
let cloudOpenModal = document.querySelector('.cloud-rules');
let catOpenModal = document.querySelector('.cat-rules');
let rulesTitle = document.querySelector('#rules');

//Вибрати модальне вікно з правилами
let modalWindow = document.querySelector('.modal');

//Зони для закриття модального вікна з правилами
let btnCloseModal = document.querySelector('.modal__closeIcon');
let modalOverlay = document.querySelector('.modal__overlay');

//Відкриття модального вікна з правилами
cloudOpenModal.onclick = openRules;
catOpenModal.onclick = openRules;
rulesTitle.onclick = openRules;

//Функція відкриття модального вікна з правилами
function openRules() {
  modalWindow.classList.add('modal--isActive');
}

//Закриття модального вікна з правилами
btnCloseModal.onclick = closeModal;
modalOverlay.onclick = closeModal;

//Функція закриття модального вікна з правилами
function closeModal() {
  modalWindow.classList.remove('modal--isActive');
}

// ==========
// Кінецьгри
// ==========

let restartBtnWin = document.querySelector('#restartBtnWin');
let restartBtnLose = document.querySelector('#restartBtnLose');

let winWindow = document.querySelector('.end-game-win.modal');
let loseWindow = document.querySelector('.end-game-lose.modal');

//Відкриття вікна з перемогою
function openWinWindow() {
  winWindow.classList.add('modal--isActive');
}

//Відкриття вікна з поразкою
function openLoseWindow() {
  loseWindow.classList.add('modal--isActive');
}

//Закриття вікна з перемогою
function closeWinWindow() {
  winWindow.classList.remove('modal--isActive');
}

//Закриття вікна з перемогою
function closeLoseWindow() {
  loseWindow.classList.remove('modal--isActive');
}

restartBtnWin.onclick = function () {
  clearInterval(timerID);
  closeWinWindow();
  hideGameField();
  showStartWindow();
};

restartBtnLose.onclick = function () {
  clearInterval(timerID);
  closeLoseWindow();
  hideGameField();
  showStartWindow();
};
