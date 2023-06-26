const solution = ['1234', '4123', '3412', '2341']; // Масив, в якому кожен елемент - це рядок із порядковими номерами картинок(Вже вирішене завдання)
const cardsTaskBoard = ['-23-', '41-3', '--12', '23-1']; // Масив, який будемо використовувати для того, щоб відобразити дошку із картинками та пустими клітинками. Замість індексу картинки тут прописуємо дефісю.
let emptyCellIndex = null; // на початку гри користувач ще не обрав жодної картинки, яку б вын хотів вставити, тому null
let chosenImageIndex = null; // на початку гри користувач ще не натиснув на жодну пустую клітинку, тому null
createTaskBoard(solution);

function createTaskBoard(solution) {
  // Обираємо контейнер, в який будемо вставляти нашу розмітку із картинками
  const cardsContainer = document.querySelector('.cards-container');
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
        img.alt = `image-${imageIndex}`;
        // Вставляємо картинку в лішку
        li.appendChild(img);
      }
      li.onclick = choseImage;
      // Вставляємо лішку ( вже із картинкою чи пусту) у загальний список
      ul.appendChild(li);
    }
  }

  // Список із всіма готовими лішками вставляємо у контейнер
  cardsContainer.appendChild(ul);
}

function choseImage(e) {
  const clickedCell =
    e.target.tagName === 'IMG' ? e.target.parentElement : e.target;
  console.log('clickedCell: ', clickedCell);
  // Перевіряємо
  const isEmpty = !clickedCell.querySelector('img');
  console.log('isEmpty : ', isEmpty);
  console.log('e.target: ', e.target);
  // if (isClickedCellEmpty) {

  // }
}
