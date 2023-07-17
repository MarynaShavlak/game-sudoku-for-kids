let chosenGameType = 'game-without-timer';
const gameTypeList = document.querySelector('.game-type-list');
gameTypeList.addEventListener('click', onCategoryBtnClick);
const gameTimeTypeButtons = [
  document.querySelector('#game-with-timer'),
  document.querySelector('#game-without-timer'),
];
