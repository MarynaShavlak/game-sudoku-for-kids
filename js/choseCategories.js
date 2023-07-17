function onCategoryBtnClick(e) {
  const clickedElement = e.target;
  if (!validateClickedElement(clickedElement)) return;
  const elements = clickedElement.classList.contains('topic')
    ? topicButtons
    : clickedElement.classList.contains('level')
    ? levelButtons
    : gameTimeTypeButtons;
  updateCategoryElements(clickedElement, elements);
}

function validateClickedElement(clickedElement) {
  return (
    clickedElement.nodeName === 'BUTTON' &&
    !clickedElement.classList.contains('active')
  );
}

function selectElement(element) {
  element.classList.add('active');
}

function deselectElement(element) {
  element.classList.remove('active');
}

function updateCategoryElements(clickedElement, elements) {
  elements.forEach(element => {
    if (element === clickedElement) {
      selectElement(element);
      updateChosenCategory(element);
      resetCardsBoard();
    } else {
      deselectElement(element);
    }
  });
}

function updateChosenCategory(element) {
  const category = element.classList[0];
  if (category === 'topic') {
    chosenTopic = element.id;
  } else if (category === 'level') {
    chosenLevel = element.id;
  } else if (category === 'game-type') {
    chosenGameType = element.id;
  }
}
