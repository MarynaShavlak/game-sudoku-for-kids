const levelMap = {
  level1: 4,
  level2: 5,
  level3: 6,
};
const levelButtons = Array.from(document.querySelectorAll('.level'));
const levelsList = document.querySelector('.levels-list');
levelsList.addEventListener('click', onCategoryBtnClick);

function onCategoryBtnClick(e) {
  const clickedElement = e.target;
  if (!validateClickedElement(clickedElement)) return;
  const elements = clickedElement.classList.contains('topic')
    ? topicButtons
    : levelButtons;
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
  console.log('category: ', category);
  if (category === 'topic') {
    chosenTopic = element.id;
  } else if (category === 'level') {
    chosenLevel = element.id;
  }
}
