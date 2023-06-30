let emptyCellIndex = null; // на початку гри користувач ще не обрав жодної картинки, яку б вын хотів вставити, тому null
let chosenImageIndex = 1; // на початку гри перший елемент активний за замовчуванням

// let solution = levelTasks[chosenLevel].solution;
// let cardsTaskBoard = levelTasks[chosenLevel].task;

let solution = generatedSolution;
let cardsTaskBoard = generatedTask;
// Обираємо контейнер, в який будемо вставляти нашу розмітку із картинками
const cardsContainer = document.querySelector('.cards-container');
const bodyEl = document.querySelector('body');
const backBtn = document.querySelector('.back-btn');

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
  // cardsTaskBoard = levelTasks[chosenLevel].task;

  cardsTaskBoard = generatedTask;
  const cardsInRowQuantity = cardsTaskBoard.length;
  setCardImageSizes(li, cardsInRowQuantity);
  setEmptyCellBackground(li);

  // Перевіряємо чи має в нас клітинка бути вже із картинкою на початку гри чи повинна бути пустою
  // Вставляємо у лішку картинку тільки тоді коли ми маємо номер картинки ,  а не дефіс
  if (imageIndex !== '-') {
    // Створюємо елемент картинки із відповідними атрибутами
    const theme = themes[chosenTopic];
    const img = createImage(theme, imageIndex);
    // Вставляємо картинку в лішку
    li.appendChild(img);
  }
  li.onclick = onСellOnBoardClick;
  return li;
}

function generateTaskBoard() {
  // Створюємо список, куди будемо додати лішки і даємо списку клас.
  const ul = document.createElement('ul');
  ul.className = 'cards';
  console.log('chosenLevel: ', chosenLevel);
  if (chosenLevel === 'level1') {
    generatedSolution = generateArrayWithUniqueDigit(4);
  } else if (chosenLevel === 'level2') {
    generatedSolution = generateArrayWithUniqueDigit(5);
  } else if (chosenLevel === 'level3') {
    generatedSolution = generateArrayWithUniqueDigit(6);
  }

  generatedTask = createTaskArrayWithHyphen(generatedSolution);
  console.log('generatedTask: ', generatedTask);
  // cardsTaskBoard = levelTasks[chosenLevel].task;
  cardsTaskBoard = generatedTask;
  const cardsInRowQuantity = cardsTaskBoard.length;
  // Встановлюємо правильно ширину дошки для відповідної кількості картинок
  // Далі треба для кожного рядку із індексами картинок та дефісами (['-23-', '41-3', '-4-2', '23-1']) створити лішку із відповідною картинкою
  // Перебираємо кожен рядок із індексами картинок

  for (let i = 0; i < cardsInRowQuantity; i++) {
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
  console.log('clickedCell: ', clickedCell);
  // console.log('clickedCell: ', clickedCell);
  // Перевіряємо чи є в натиснутій лішці картинка чи немає(чи пуста натиснута лішка)
  const isCellEmpty = !clickedCell.querySelector('img');
  // console.log('e.target: ', e.target);
  //Якщо ми клікнули в пусту клітинку, то:
  if (isCellEmpty) {
    // Знаходимо який номер картинки правильний для натиснутої пустої клітинки
    const correctIndex = getIndexOfCorrectImageForClickedEmtyCell(clickedCell);
    console.log('correctIndex: ', correctIndex);
    // Порівнюємо айдішник пустої клітинки із номером картинки , яку ми до цього обрали в блоці selection
    const isMatched = correctIndex == chosenImageIndex;
    console.log('chosenImageIndex: ', chosenImageIndex);

    // Якщо співпадыння Є, то:
    if (isMatched) {
      //  створюємо розмітку картинки із коректнимм ідексом в  та вставляємо її в пусту лішку а яку ми клікнули
      const theme = themes[chosenTopic];
      const imageToSetOnBoard = createImage(theme, correctIndex);
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
  console.log('idOfLi: ', idOfLi);
  // Так як айдішник - це рядок, що складається із двох цифр розділених дефісом, то треба перетворити цей рядок на масив , і в цьому масиві знайти другий елемент, так як перший відповідає за номер рядку на якому лішка знаходиться  в дошці,  а другий саме за номер картинки
  const index = idOfLi.split('-')[1];
  return index;
}

function setUniqueIdForCards() {
  // Знаходимо всі елементи лішки із класом card на сторінці
  const allCardsElements = document.querySelectorAll('.card');
  // solution = levelTasks[chosenLevel].solution;
  solution = generatedSolution;
  // Розраховуємо скільки всього картинок має бути на дошці
  totalCards = calculateTotalCardsQuantity(solution);
  // Розраховуємо скільки всього має бути рядків на дошці
  const rowsQuantity = solution.length;
  const finishedImagesIndexes = solution.join('');

  //Задаємо ДЛЯ КОЖНОЇ лішки унікальний айдішник , який складається із номеру рядку, на якому ця лішка знаходиться, та номеру картинки, яка має бути в цій лішці()

  for (let index = 0; index < totalCards; index++) {
    const li = allCardsElements[index];
    const rowIndex = Math.ceil((index + 1) / (totalCards / rowsQuantity));
    const liID = `${rowIndex}-${finishedImagesIndexes[index]}`; // це звичайна конкатенація рядків, запис аналогічний до : rowIndex + '-' + imageIndex
    li.id = liID;
  }
}

// ___________________________________________________________________

//Фукція появи error-картинки на деякий час
function errorImage(clickedElement) {
  const imgError = document.createElement('img');
  imgError.src = `./images/error.png`;
  clickedElement.appendChild(imgError);
  setTimeout(function () {
    clickedElement.removeChild(imgError);
  }, 500);
}

// Гравець може повернутись на стартове меню при кліці на кнопку "назад"
backBtn.onclick = onBackBtnClick;

function onBackBtnClick() {
  // якщо таймер був запущений, то при клыцы на кпопку переходу у стартому меню треба зупиняти таймер
  clearInterval(timerID);
  hideGameField();
  showStartWindow();
}

function setCardImageSizes(card, elementsInOneRow) {
  if (elementsInOneRow == 4) {
    card.style.width = '150px';
    card.style.height = '150px';
  } else if (elementsInOneRow == 5) {
    card.style.width = '120px';
    card.style.height = '120px';
  } else if (elementsInOneRow == 6) {
    card.style.width = '100px';
    card.style.height = '100px';
  }
}

function setEmptyCellBackground(cell) {
  const themeColor = themeEmptyCellColors[chosenTopic];
  cell.style.backgroundColor = themeColor;
}
