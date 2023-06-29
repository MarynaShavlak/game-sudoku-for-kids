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
  return label;
}

function createImage(theme, index) {
  console.log('theme: ', theme);
  const img = document.createElement('img');
  img.src = `./images/${chosenTopic}/${index}.png`;
  console.log('img.src: ', img.src);
  img.alt = `${theme}-${index}`;
  return img;
}

function createImageSelectionCard(container, index) {
  // Для того щоб створити розмітку карток вибору, треба знати яку тему користувач вибрав. У змінній chosenTopic ми зберігаємо номер теми у форматі рядку (наприклад, "theme3" Для теми солодощів.)
  // Щоб дізнатись як називатимусь картинки для цієї теми ми звертаємось до певної властивості обєкту themes
  // Наприклад, якщо chosenTopic - це "theme3", тоді  themes[chosenTopic]  - це рядок 'cakes'
  const theme = themes[chosenTopic];
  console.log('theme: ', theme);

  const input = createInput(theme, index);
  const label = createLabel(theme, index);
  const img = createImage(theme, index);
  console.log('img: ', img);

  label.appendChild(img);
  container.appendChild(input);
  // Додаємо функцію-обробник події кліку по картці
  input.onclick = onImageFromSelectionBlockClick;
  container.appendChild(label);
}

function onImageFromSelectionBlockClick(e) {
  // Знаходимо, яка картинка була натиснута із переліку
  const clickedImage = e.target;
  // Знаходимо порядковий номер нашоъ картинки(із значення атрибута Value)
  const clickedImageIndex = clickedImage.value;
  // Зберігаємо у нашу глобальну змінну порядковий номер обраної картинки
  chosenImageIndex = clickedImageIndex;
  //Звук вибору картинки
  choiceSound();
}

function createImageSelectionBlock(solution) {
  // Створюємо блок , в якому будуть зберігатись картки для вибору
  const cardsSelectionBlock = document.createElement('div');
  cardsSelectionBlock.className = 'card-selection';
  const cardsWrapper = document.createElement('div');
  cardsWrapper.className = 'cards';
  // Знаходимо загальну кількість карток , яку треба вставити в цей блок
  const imagesQuantity = solution.length;
  // Створюємо відповідну розмітку для кожної картки
  for (let i = 1; i <= imagesQuantity; i++) {
    createImageSelectionCard(cardsWrapper, i);
  }

  cardsSelectionBlock.appendChild(cardsWrapper);
  // Вставляємо блок із картинками, з-поміж яких користувач має обирати , у загальний наш лок розмітки
  cardsContainer.appendChild(cardsSelectionBlock);
}
