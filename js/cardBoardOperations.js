function showVisualHint(card) {
  const hoveredId = parseInt(card.getAttribute('data-id'));
  const { rowNumber, columnNumber } = getRowAndColumn(hoveredId);
  handleHintClassByRow(rowNumber, 'add');
  handleHintClassByColumn(card, columnNumber, 'add');
}

function hideVisualHint(card) {
  const hoveredId = parseInt(card.getAttribute('data-id'));
  const { rowNumber, columnNumber } = getRowAndColumn(hoveredId);
  handleHintClassByRow(rowNumber, 'remove');
  handleHintClassByColumn(card, columnNumber, 'remove');
}

function handleMouseEnter(e) {
  const hoveredElement = e.target;
  if (hoveredElement.nodeName === 'LI' || hoveredElement.nodeName === 'IMG') {
    const isCellEmpty = checkIfCellEmpty(hoveredElement);
    if (isCellEmpty) {
      showVisualHint(hoveredElement);
    }
  }
}

function handleMouseLeave(e) {
  const hoveredElement = e.target;
  if (hoveredElement.nodeName === 'LI' || hoveredElement.nodeName === 'IMG') {
    const isCellEmpty = checkIfCellEmpty(hoveredElement);
    if (isCellEmpty) {
      hideVisualHint(hoveredElement);
    }
  }
}

function getRowAndColumn(cardId) {
  const rowsQuantity = cardsTaskBoard.length;
  const rowNumber = Math.ceil(cardId / rowsQuantity);
  const columnNumber = cardId % rowsQuantity || rowsQuantity;
  return { rowNumber, columnNumber };
}

function handleHintClassByRow(rowNumber, action) {
  const rowsQuantity = cardsTaskBoard.length;
  for (let j = 1; j <= rowsQuantity; j++) {
    const cardID = (rowNumber - 1) * rowsQuantity + j;
    const rowCard = document.querySelector(`[data-id="${cardID.toString()}"]`);
    if (rowCard) {
      rowCard.classList[action]('hint');
    }
  }
}

function handleHintClassByColumn(card, columnNumber, action) {
  const rowsQuantity = cardsTaskBoard.length;
  const cards = card.parentNode.getElementsByTagName('li');
  Array.from(cards).forEach((card, index) => {
    if (index % rowsQuantity === columnNumber - 1) {
      card.classList[action]('hint');
    }
  });
}

function getClickedCell(clickedElement) {
  return clickedElement.tagName === 'IMG'
    ? clickedElement.parentElement
    : clickedElement;
}

function clearSelectedCards(cards) {
  Array.from(cards).forEach(card => {
    card.classList.remove('selected');
  });
}
