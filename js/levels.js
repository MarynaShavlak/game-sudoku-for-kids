const levelMap = {
  level1: 4,
  level2: 5,
  level3: 6,
};
const levelButtons = Array.from(document.querySelectorAll('.level'));
const levelsList = document.querySelector('.levels-list');
levelsList.addEventListener('click', onCategoryBtnClick);
