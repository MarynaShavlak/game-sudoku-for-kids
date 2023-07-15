const levelButtons = Array.from(document.querySelectorAll('.level'));
const levelsList = document.querySelector('.levels-list');
levelsList.addEventListener('click', onLevelBtnClick);

function onLevelBtnClick(e) {
  const clickedLevel = e.target;
  if (clickedLevel.nodeName !== 'BUTTON') return;
  if (clickedLevel.classList.contains('active')) return;
  levelButtons.forEach(level => {
    if (level === clickedLevel) {
      chosenLevel = clickedLevel.id;
      level.classList.add('active');
      cardsContainer.innerHTML = '';
      createTaskBoard();
      createImageSelectionBlock(solution);
    } else {
      level.classList.remove('active');
    }
  });
}
