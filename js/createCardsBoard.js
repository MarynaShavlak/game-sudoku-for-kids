function getTotalCardsQuantity(solution) {
  let totalCards = 0;
  for (let i = 0; i < solution.length; i++) {
    totalCards += solution[i].length;
  }
  return totalCards;
}

function createListItem(imageIndex) {
  const li = document.createElement('li');
  li.className = 'card';
  cardsTaskBoard = generatedTask;
  const cardsInRowQuantity = cardsTaskBoard.length;
  setCardImageSizes(li, cardsInRowQuantity);
  setEmptyCellBackground(li);
  if (imageIndex !== '-') {
    const theme = themes[chosenTopic];
    const img = createImage(theme, imageIndex);
    li.appendChild(img);
  }
  return li;
}

function setCardImageSizes(card, elementsInOneRow) {
  function updateCardSize() {
    let screenWidth = window.innerWidth;
    if (screenWidth >= 320 && screenWidth <= 767) {
      if (elementsInOneRow === 4) {
        card.style.width = '70px';
        card.style.height = '70px';
      } else if (elementsInOneRow === 5) {
        card.style.width = '58px';
        card.style.height = '58px';
      } else if (elementsInOneRow === 6) {
        card.style.width = '48px';
        card.style.height = '48px';
      }
    } else {
      if (elementsInOneRow === 4) {
        card.style.width = '150px';
        card.style.height = '150px';
      } else if (elementsInOneRow === 5) {
        card.style.width = '120px';
        card.style.height = '120px';
      } else if (elementsInOneRow === 6) {
        card.style.width = '100px';
        card.style.height = '100px';
      }
    }
  }
  updateCardSize();
  window.addEventListener('resize', updateCardSize);
}

function updateStartWindowView() {
  let screenWidth = window.innerWidth;
  if (
    screenWidth >= 320 &&
    screenWidth <= 767 &&
    parametersBtn.style.display === 'none'
  ) {
    backToRulesBtn.style.display = 'block';
  } else if (screenWidth > 767) {
    backToRulesBtn.style.display = 'none';
  }
}

function setEmptyCellBackground(cell) {
  const themeColor = themeEmptyCellColors[chosenTopic];
  cell.style.backgroundColor = themeColor;
}
function setUniqueIdForCards() {
  const allCardsElements = document.querySelectorAll('.card');
  solution = generatedSolution;
  totalCards = getTotalCardsQuantity(solution);
  const rowsQuantity = solution.length;
  const finishedImagesIndexes = solution.join('');

  //Задаємо ДЛЯ КОЖНОЇ лішки унікальний айдішник , який складається із номеру рядку, на якому ця лішка знаходиться, та номеру картинки, яка має бути в цій лішці()

  for (let index = 0; index < totalCards; index++) {
    const li = allCardsElements[index];
    const rowIndex = Math.ceil((index + 1) / (totalCards / rowsQuantity));
    const cardID = `${rowIndex}-${finishedImagesIndexes[index]}`;
    li.id = cardID;
    li.setAttribute('data-id', `${index + 1}`);
  }
}

function generateTaskBoard() {
  const ul = document.createElement('ul');
  ul.className = 'cards';
  const chosenLevelLength = levelMap[chosenLevel];
  generatedSolution = generateArrayWithUniqueDigit(chosenLevelLength);
  generatedTask = createTaskArrayWithHyphen(generatedSolution);
  cardsTaskBoard = generatedTask;
  const taskBoardElement = createCardsTaskBoard(ul, cardsTaskBoard);
  return taskBoardElement;
}

function createCardsTaskBoard(ul, cardsTaskBoard) {
  // Встановлюємо правильно ширину дошки для відповідної кількості картинок
  // Далі треба для кожного рядку із індексами картинок та дефісами (['-23-', '41-3', '-4-2', '23-1']) створити лішку із відповідною картинкою
  // Перебираємо кожен рядок із індексами картинок
  const chosenLevelLength = levelMap[chosenLevel];

  for (let i = 0; i < chosenLevelLength; i++) {
    const solutionRow = cardsTaskBoard[i];
    const imageIndexesArray = solutionRow.split('');

    const listItems = imageIndexesArray.map(createListItem);
    ul.append(...listItems);
  }
  return ul;
}

function insertTaskBoard() {
  const taskBoard = generateTaskBoard();
  taskBoard.addEventListener('click', onСellOnBoardClick);
  taskBoard.addEventListener('mouseover', handleMouseEnter);
  taskBoard.addEventListener('mouseout', handleMouseLeave);
  cardsContainer.appendChild(taskBoard);
  setUniqueIdForCards();
}

function onСellOnBoardClick(e) {
  const clickedElement = e.target;
  if (clickedElement.nodeName === 'UL') return;
  const clickedCell = getClickedCell(clickedElement);
  const isCellEmpty = checkIfCellEmpty(clickedElement);
  if (isCellEmpty) {
    handleEmptyCellClicked(clickedElement, clickedCell);
    hideVisualHint(clickedCell);
  } else {
    handleNonEmptyCellClicked(clickedCell);
  }
}

function checkIfCellEmpty(cell) {
  const clickedCell = getClickedCell(cell);
  const isCellEmpty = !clickedCell.querySelector('img');
  return isCellEmpty;
}

function getIndexOfCorrectImageForClickedEmtyCell(emptyCell) {
  const idOfLi = emptyCell.id;
  const index = idOfLi.split('-')[1];
  return index;
}

function errorImage(clickedElement) {
  const imgError = document.createElement('img');
  imgError.src = `./images/error.png`;
  clickedElement.appendChild(imgError);
  setTimeout(function () {
    clickedElement.removeChild(imgError);
  }, 500);
}

function checkIfTaskSolved() {
  const cardsBox = document.querySelector('.cards');
  const cells = [...cardsBox.children];
  const isTaskSolved = cells.every(cell => cell.querySelector('img'));
  return isTaskSolved;
}

function checkIfMatchedCell(clickedCell) {
  const correctIndex = getIndexOfCorrectImageForClickedEmtyCell(clickedCell);
  const isMatched = correctIndex == chosenImageIndex;
  return { correctIndex, isMatched };
}

function handleEmptyCellClicked(clickedElement, clickedCell) {
  const { correctIndex, isMatched } = checkIfMatchedCell(clickedCell);
  if (isMatched) {
    handleMatchedCell(clickedElement, correctIndex);
  } else {
    handleUnmatchedCell(clickedElement);
  }
}

function handleNonEmptyCellClicked(clickedCell) {
  if (isHintTimeOutRunning) return;
  const imgName = clickedCell.children[0].alt;
  const cards = clickedCell.parentNode.getElementsByTagName('li');
  const isAlreadySelected = clickedCell.classList.contains('selected');
  if (isAlreadySelected) {
    deselectCell(clickedCell, cards);
  }
  clearSelectedCards(cards);
  selectMatchingCards(imgName, cards);
}

function selectMatchingCards(imgName, cards) {
  cards.forEach(card => {
    const img = card.querySelector('img');
    if (img?.getAttribute('alt') === imgName) {
      card.classList.add('selected');
    }
  });
}

function deselectCell(cell, cards) {
  cell.classList.remove('selected');
  clearSelectedCards(cards);
}

function handleUnmatchedCell(clickedElement) {
  minusLife();
  errorImage(clickedElement);
  negativeSound();
}

function handleMatchedCell(clickedElement, correctIndex) {
  const theme = themes[chosenTopic];
  const imageToSetOnBoard = createImage(theme, correctIndex);
  clickedElement.appendChild(imageToSetOnBoard);
  positiveSound();

  const isTaskSolved = checkIfTaskSolved();
  if (isTaskSolved) {
    openGameResultModal(winWindow);
    updateGameStatisticsResults();
  }
}
