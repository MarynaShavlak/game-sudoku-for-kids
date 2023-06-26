const solution = ['1234', '4123', '3412', '2341']; // Масив, в якому кожен елемент - це рядок із порядковими номерами картинок(Вже вирішене завдання)
const cardsTaskBoard = ['-23-', '41-3', '--12', '23-1']; // Масив, який будемо використовувати для того, щоб відобразити дошку із картинками та пустими клітинками. Замість індексу картинки тут прописуємо дефісю.
let emptyCellIndex = null; // на початку гри користувач ще не обрав жодної картинки, яку б вын хотів вставити, тому null
let chosenImageIndex = null; // на початку гри користувач ще не натиснув на жодну пустую клітинку, тому null
// Обираємо контейнер, в який будемо вставляти нашу розмітку із картинками
const cardsContainer = document.querySelector('.cards-container');

createTaskBoard(solution);
createImageSelectionBlock(solution);

function createTaskBoard(solution) {
  // Створюємо змінну, в яку будемо записувати скільки всього клітинок в нас має бути в завданні. Для початку записуємо в цю змінну нуль.
  let totalCards = 0;
  // Для того , щоб дізнатись скільки клітинок ми маємо створити, нам треба порахувати скільки всього цифр є в рядках масиву solutions. У нас 4 рядки по 4 цифри, тобто всього маэ бути 16 клітинок
  for (let i = 0; i < solution.length; i++) {
    // перебираємо по черзі кожен елемент масиву і додаємо його довжину до значення змінної totalCards.
    //Тобто, на кожній ітерації додаємо до totalCards 4 (так як в кожному рядку 4 цифри), так і отримуємо 16.
    totalCards += solution[i].length;
  }

  // Створюємо список, куди будемо додати лішки і даємо списку клас.
  const ul = document.createElement('ul');
  ul.className = 'cards';

  // Далі треба для кожного рядку із індексами картинок та дефісами (['-23-', '41-3', '-4-2', '23-1']) створити лішку із відповідною картинкою
  // Перебираємо кожен рядок із індексами картинок
  for (let i = 0; i < cardsTaskBoard.length; i++) {
    const solutionRow = cardsTaskBoard[i];
    // Кожен рядок із індексами картинок перетворюємо в масив цих індексів. Наприклад , рядок '1234' стає масиовм ['1', '2', '3', '4']
    const imageIndexesArray = solutionRow.split(''); // цей метод split зробить ыз рядка масив із 4-х елементів. (наприклад, ['1', '2', '3', '4'])
    // Для кожного індекса  із масиву:
    for (let j = 0; j < imageIndexesArray.length; j++) {
      // створюємо лішку(додаємо їй потрібний клас)
      const li = document.createElement('li');
      li.className = 'card';
      // знаходимо номер картинки, яку потрібно вставити
      const imageIndex = imageIndexesArray[j];
      // Створюємо елемент картинки із відповідними атрибутами
      const img = document.createElement('img');
      // Перевіряємо чи має в нас клітинка бути вже із картинкою на початку гри чи повинна бути пустою
      // Вставляємо у лішку картинку тільки тоді коли ми маємо номер картинки ,  а не дефіс
      if (imageIndex !== '-') {
        img.src = `./images/sea/${imageIndex}.jpg`;
        img.alt = `fish-${imageIndex}`;
        // Вставляємо картинку в лішку
        li.appendChild(img);
      }
      li.onclick = onСellOnBoardClick;
      // Вставляємо лішку ( вже із картинкою чи пусту) у загальний список
      ul.appendChild(li);
    }
  }

  // Список із всіма готовими лішками вставляємо у контейнер
  cardsContainer.appendChild(ul);
}

function onСellOnBoardClick(e) {
  // Записуємо у змінну який елемент був натиснутий
  const clickedElement = e.target;
  // Перевіряємо чи була натиснута сама картинка (тег img) чи лішка(тег li). Якщо була натиснута сама картинка , то в змінну clickedCell записуємо не картинку, а її батківський елемент, тобто лішку. Якщо була натиснута лішка, то у змінну clickedCell записуємо цю лішку
  const clickedCell =
    clickedElement.tagName === 'IMG'
      ? clickedElement.parentElement
      : clickedElement;
  console.log('clickedCell: ', clickedCell);
  // Перевіряємо чи є в натиснутій лішці картинка чи немає(чи пуста натиснута лішка)
  const isCellEmpty = !clickedCell.querySelector('img');
  console.log('e.target: ', e.target);
  //Якщо ми клікнули в пусту клітинку
  if (isCellEmpty) {
    console.log('пуста');
  } else {
    // Якщо користувач натискає на клітинку, яка не пуста, то ніяких дій виконувати не треба і ми просто виходимо із функції

    return;
  }
}

function onImageFromSelectionBlockClick(e) {
  // Знаходимо, яка картинка була натиснута із переліку
  const clickedImage = e.target;
  // Знаходимо порядковий номер нашоъ картинки(із значення атрибута Value)
  const clickedImageIndex = clickedImage.value;
  // Зберігаємо у нашу глобальну змінну порядковий номер обраної картинки
  chosenImageIndex = clickedImageIndex;
  console.log('chosenImageIndex : ', chosenImageIndex);
}

function createImageSelectionBlock(solution) {
  // Створюємо блок , в якому будуть зберігатись картки для вибору
  const cardsSElectionBlock = document.createElement('div');
  cardsSElectionBlock.className = 'card-selection';
  const cardsDiv = document.createElement('div');
  cardsDiv.className = 'cards';
  // Знаходимо загальну кількість карток , яку треба вставити в цей блок
  const imagesQuantity = solution.length;
  // Створюємо відповідну розмітку для кожної картки
  for (let i = 1; i <= imagesQuantity; i++) {
    const input = document.createElement('input');
    input.type = 'radio';
    input.id = `fish-${i}`;
    input.name = 'fish';
    input.value = i;
    input.checked = i === 1;

    const label = document.createElement('label');
    label.className = 'card';
    label.htmlFor = `fish-${i}`;

    const img = document.createElement('img');
    img.src = `./images/sea/${i}.jpg`;
    img.alt = `fish-${i}`;

    label.appendChild(img);

    cardsDiv.appendChild(input);
    input.onclick = onImageFromSelectionBlockClick;
    cardsDiv.appendChild(label);
  }

  cardsSElectionBlock.appendChild(cardsDiv);
  // Вставляємо блок із картинками, з-поміж яких користувач має обирати , у загальний наш лок розмітки
  cardsContainer.appendChild(cardsSElectionBlock);
}
