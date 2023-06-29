const solution = ['1234', '4123', '3412', '2341']; // Масив, в якому кожен елемент - це рядок із порядковими номерами картинок(Вже вирішене завдання)
const cardsTaskBoard = ['-23-', '41-3', '--12', '23-1']; // Масив, який будемо використовувати для того, щоб відобразити дошку із картинками та пустими клітинками. Замість індексу картинки тут прописуємо дефісю.
let emptyCellIndex = null; // на початку гри користувач ще не обрав жодної картинки, яку б вын хотів вставити, тому null
let chosenImageIndex = 1; // на початку гри перший елемент активний за замовчуванням
let chosenTopic = 'sea';
// Обираємо контейнер, в який будемо вставляти нашу розмітку із картинками
const cardsContainer = document.querySelector('.cards-container');
const finishedImagesIndexes = solution.join('');
// РОзраховуємо скільки всього має бути рядків на дошці
const rowsQuantity = solution.length;
const totalCards = calculateTotalCardsQuantity(solution);
createTaskBoard();
createImageSelectionBlock(solution);

function calculateTotalCardsQuantity(solution) {
  // Створюємо змінну, в яку будемо записувати скільки всього клітинок в нас має бути в завданні. Для початку записуємо в цю змінну нуль.
  let totalCards = 0;
  // Для того , щоб дізнатись скільки клітинок ми маємо створити, нам треба порахувати скільки всього цифр є в рядках масиву solutions. У нас 4 рядки по 4 цифри, тобто всього маэ бути 16 клітинок
  for (let i = 0; i < solution.length; i++) {
    // перебираємо по черзі кожен елемент масиву і додаємо його довжину до значення змінної totalCards.
    //Тобто, на кожній ітерації додаємо до totalCards 4 (так як в кожному рядку 4 цифри), так і отримуємо 16.
    totalCards += solution[i].length;
  }
  return totalCards;
}

function createListItem(imageIndex) {
  // створюємо лішку(додаємо їй потрібний клас)
  const li = document.createElement('li');
  li.className = 'card';
  if (chosenTopic === 'sea') {
    li.style.backgroundColor = '#74eafd87';
  } else if (chosenTopic === 'princesses') {
    li.style.backgroundColor = '#cfb1cf87';
  }
  // Перевіряємо чи має в нас клітинка бути вже із картинкою на початку гри чи повинна бути пустою
  // Вставляємо у лішку картинку тільки тоді коли ми маємо номер картинки ,  а не дефіс
  if (imageIndex !== '-') {
    // Створюємо елемент картинки із відповідними атрибутами
    const img = createImageItem(imageIndex);
    // Вставляємо картинку в лішку
    li.appendChild(img);
  }
  li.onclick = onСellOnBoardClick;
  return li;
}

function createImageItem(imageIndex) {
  // Створюємо елемент картинки із відповідними атрибутами
  const img = document.createElement('img');

  if (chosenTopic === 'sea') {
    img.src = `./images/${chosenTopic}/${imageIndex}.png`;
    img.alt = `fish-${imageIndex}`;
  } else if (chosenTopic === 'princesses') {
    img.src = `./images/${chosenTopic}/${imageIndex}.jpg`;
    img.alt = `princess-${imageIndex}`;
  }
  return img;
}
function generateTaskBoard() {
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
      // знаходимо номер картинки, яку потрібно вставити
      const imageIndex = imageIndexesArray[j];
      const li = createListItem(imageIndex);
      // Вставляємо лішку ( вже із картинкою чи пусту) у загальний список
      ul.appendChild(li);
    }
  }
  return ul;
}

function createTaskBoard() {
  // Створюємо розмітку із картками
  const ul = generateTaskBoard();
  // Список із всіма готовими лішками вставляємо у контейнер
  cardsContainer.appendChild(ul);
  // Задаємо лішкам унікальні айдішники
  setUniqueIdForCards();
}

function onСellOnBoardClick(e) {
  // Записуємо у змінну який елемент був натиснутий
  const clickedElement = e.target;
  // Перевіряємо чи була натиснута сама картинка (тег img) чи лішка(тег li). Якщо була натиснута сама картинка , то в змінну clickedCell записуємо не картинку, а її батківський елемент, тобто лішку. Якщо була натиснута лішка, то у змінну clickedCell записуємо цю лішку
  const clickedCell =
    clickedElement.tagName === 'IMG'
      ? clickedElement.parentElement
      : clickedElement;
  // console.log('clickedCell: ', clickedCell);
  // Перевіряємо чи є в натиснутій лішці картинка чи немає(чи пуста натиснута лішка)
  const isCellEmpty = !clickedCell.querySelector('img');
  // console.log('e.target: ', e.target);
  //Якщо ми клікнули в пусту клітинку, то:
  if (isCellEmpty) {
    // Знаходимо який номер картинки правильний для натиснутої пустої клітинки
    const correctIndex = getIndexOfCorrectImageForClickedEmtyCell(clickedCell);
    // Порівнюємо айдішник пустої клітинки із номером картинки , яку ми до цього обрали в блоці selection
    const isMatched = correctIndex == chosenImageIndex;
    // Якщо співпадыння Є, то:
    if (isMatched) {
      //  створюємо розмітку картинки із коректнимм ідексом в  та вставляємо її в пусту лішку а яку ми клікнули
      const imageToSetOnBoard = createImageItem(correctIndex);
      clickedElement.appendChild(imageToSetOnBoard);
      //Позитивний звук(якщо вгадали)
      positiveSound();
    } else {
      //Зменшення життів
      minusLife();

      //При помилці з'являється картинка-еррор на деякий час
      errorImage(clickedElement);
      //Негативний звук(якщо помилка)
      negativeSound();
    }
  } else {
    // Якщо користувач натискає на клітинку, яка не пуста, то ніяких дій виконувати не треба і ми просто виходимо із функції

    return;
  }
}

function getIndexOfCorrectImageForClickedEmtyCell(emptyCell) {
  // Знаходимо айдішник натиснутої пустої клітинки(лішки)
  const idOfLi = emptyCell.id;
  // Так як айдішник - це рядок, що складається із двох цифр розділених дефісом, то треба перетворити цей рядок на масив , і в цьому масиві знайти другий елемент, так як перший відповідає за номер рядку на якому лішка знаходиться  в дошці,  а другий саме за номер картинки
  const index = idOfLi.split('-')[1];
  return index;
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
    input.value = i;
    input.checked = i === 1;
    const label = document.createElement('label');
    label.className = 'card';
    const img = document.createElement('img');
    if (chosenTopic === 'sea') {
      input.id = `fish-${i}`;
      input.name = 'fish';
      label.htmlFor = `fish-${i}`;
      img.src = `./images/${chosenTopic}/${i}.png`;
      img.alt = `fish-${i}`;
    } else if (chosenTopic === 'princesses') {
      input.id = `princess-${i}`;
      input.name = 'princess';
      label.htmlFor = `princess-${i}`;
      img.src = `./images/${chosenTopic}/${i}.jpg`;
      img.alt = `princess-${i}`;
    }

    label.appendChild(img);

    cardsDiv.appendChild(input);
    input.onclick = onImageFromSelectionBlockClick;
    cardsDiv.appendChild(label);
  }

  cardsSElectionBlock.appendChild(cardsDiv);
  // Вставляємо блок із картинками, з-поміж яких користувач має обирати , у загальний наш лок розмітки
  cardsContainer.appendChild(cardsSElectionBlock);
}

function setUniqueIdForCards() {
  // Знаходимо всі елементи лішки із класом card на сторінці
  const allCardsElements = document.querySelectorAll('.card');
  //Задаємо ДЛЯ КОЖНОЇ лішки унікальний айдішник , який складається із номеру рядку, на якому ця лішка знаходиться, та номеру картинки, яка має бути в цій лішці()
  for (let index = 0; index < totalCards; index++) {
    const li = allCardsElements[index];
    const rowIndex = Math.ceil((index + 1) / (totalCards / rowsQuantity));
    const liID = `${rowIndex}-${finishedImagesIndexes[index]}`; // це звичайна конкатенація рядків, запис аналогічний до : rowIndex + '-' + imageIndex
    li.id = liID;
  }
}

// ___________________________________________________________________

const startWindow = document.getElementById('start-window');
const gameWindow = document.getElementById('game-window');
const startGame = document.getElementById('start-game');
const endWindow = document.getElementById('end-window');

document.getElementById('rules').addEventListener('click', showRules);

//----правила гри----//
function showRules() {
  const rulesWindow = document.createElement('div');
  rulesWindow.id = 'rules-window';
  rulesWindow.innerHTML = '<h2>Правила гри:</h2><p></p>';

  startWindow.appendChild(rulesWindow);

  document.addEventListener('click', closeRules);

  startWindow.style.pointerEvents = 'none';
}

function closeRules(event) {
  if (!event.target.closest('#rules-window')) {
    const rulesWindow = document.getElementById('rules-window');
    rulesWindow.parentNode.removeChild(rulesWindow);

    startWindow.style.pointerEvents = 'auto';

    document.removeEventListener('click', closeRules);
  }
}

document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('restart-game').addEventListener('click', restartGame);

startGame.onclick = function () {
  startWindow.style.display = 'none';
  gameWindow.style.display = 'block';
  cardsContainer.style.display = 'flex';
};

//Фукція появи error-картинки на деякий час
function errorImage(clickedElement) {
  const imgError = document.createElement('img');
  imgError.src = `./images/error.png`;
  clickedElement.appendChild(imgError);
  setTimeout(function () {
    clickedElement.removeChild(imgError);
  }, 500);
}

//----перезапуск гри----//
document.getElementById('restart-game').addEventListener('click', restartGame);

function restartGame() {
  endWindow.style.display = 'none';
  startWindow.style.display = 'flex';
}

// ___________________________________________________________________
