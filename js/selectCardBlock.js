function createInput(theme, index) {
  const input = document.createElement('input');
  input.type = 'radio';
  input.value = index;
  input.checked = index === 1;
  input.id = `${theme}-${index}`;
  input.name = theme;
  return input;
}

function createLabel(theme, index) {
  const label = document.createElement('label');
  label.className = 'card';
  label.htmlFor = `${theme}-${index}`;
  cardsTaskBoard = generatedTask;
  const cardsInRowQuantity = cardsTaskBoard.length;
  setCardImageSizes(label, cardsInRowQuantity);
  setEmptyCellBackground(label);
  return label;
}

function createImage(theme, index) {
  const img = document.createElement('img');
  img.src = `./images/${chosenTopic}/${index}.png`;
  img.alt = `${theme}-${index}`;

  return img;
}

function createImageSelectionCard(container, index) {
  const theme = themes[chosenTopic];
  const input = createInput(theme, index);
  const label = createLabel(theme, index);
  const img = createImage(theme, index);
  label.appendChild(img);
  container.appendChild(input);
  container.appendChild(label);
}

function onImageFromSelectionBlockClick(e) {
  const clickedImage = e.target;
  if (clickedImage.nodeName !== 'INPUT') return;
  const clickedImageIndex = clickedImage.value;
  chosenImageIndex = clickedImageIndex;
  choiceSound();
}

function createImageSelectionBlock(solution) {
  const cardsSelectionBlock = document.createElement('div');
  cardsSelectionBlock.className = 'card-selection';
  const cardsWrapper = document.createElement('div');
  const title = document.createElement('h2');
  title.className = 'selection-block-title';
  title.innerText = 'Обери картинку';
  cardsWrapper.className = 'cards-options';
  cardsWrapper.addEventListener('click', onImageFromSelectionBlockClick);
  solution = generatedSolution;
  const imagesQuantity = solution.length;
  for (let i = 1; i <= imagesQuantity; i++) {
    createImageSelectionCard(cardsWrapper, i);
  }

  cardsSelectionBlock.appendChild(title);
  cardsSelectionBlock.appendChild(cardsWrapper);
  cardsContainer.appendChild(cardsSelectionBlock);
}
