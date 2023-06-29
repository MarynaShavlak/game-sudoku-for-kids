let chosenLevel = 'level1';

const levelBtnCollection = [
  document.querySelector('#level1'),
  document.querySelector('#level2'),
  document.querySelector('#level3'),
];

levelBtnCollection.forEach(level => {
  level.onclick = onLevelBtnClick;
});

function onLevelBtnClick(e) {
  const clickedLevel = e.target;

  if (clickedLevel.classList.contains('active')) return;
  levelBtnCollection.forEach(level => {
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
