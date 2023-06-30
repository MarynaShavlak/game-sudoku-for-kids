const levelTasks = {
  level1: {
    task: ['-23-', '41-3', '--12', '23-1'], // Масив, який будемо використовувати для того, щоб відобразити дошку із картинками та пустими клітинками. Замість індексу картинки тут прописуємо дефіс
    solution: ['1234', '4123', '3412', '2341'], // Масив, в якому кожен елемент - це рядок із порядковими номерами картинок(Вже вирішене завдання)
  },
  level2: {
    task: ['-4125', '5--43', '-5-31', '435-2', '1-3--'],
    solution: ['34125', '51243', '25431', '43512', '12354'],
  },
  level3: {
    task: ['-16-4-', '4--6-1', '-4-256', '6-5-13', '1-2--4', '-6-132'],
    solution: ['216345', '453621', '341256', '625413', '132564', '564132'],
  },
};

let generatedSolution = generateArrayWithUniqueDigit(4);
let generatedTask = createTaskArrayWithHyphen(generatedSolution);

// Функція, для рандомного перемішування елементів масиву
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
// Функція приймає масив і повертає індекс рандомного елементу цього масиву.
function getRandomArrayElementIndex(array) {
  return Math.floor(Math.random() * array.length);
}

// Функція приймає рядок  і повертає індекс рандомного символу цього рядку.
function getRandomCharacterIndex(string) {
  return Math.floor(Math.random() * string.length);
}

// Функція для заміни цифр у рядку дефісами, приймає як аргументи рядок для заміни та індекси елементів йього рядку , які треба замінити на дефіси
function replaceCharsInString(str, index1, index2, index3) {
  return str
    .split('') // Перетворюємо рядок із цифр на масив , в якому кожен елемент - рядок із однією цифрою.
    .map((char, index) => {
      // За допомогою цього методу проходимось по кожному елементу масиву (сhar)
      // Перевіряємо чи співпадає індекс елементу масиву на поточній ітерації із будь-яким індексом , який треба замінити на дефіс
      // Якщо співпадіння є, то замінюємо елемент під цим індексом на дефіс
      if (index === index1 || index === index2 || index === index3) {
        return '-';
      }
      // Якщо співпадіння немає, то повертаємо елемент без змін
      return char;
    }) // Отримуємо новий масив , в якому будуть вже дефіси замість тих цифр,індекси яких ми передали у функцію
    .join(''); // Отриманий масив цифр та дефісів перетворюємо на рядок (склеюємо всі елементи)
}

//Функція для рандомного генерування варіантів розміщення карток. Приймає як аргумент кількість карток, що має бути в одному рядку.
function generateArrayWithUniqueDigit(N) {
  // Створюємо масив рядків, де кожен рядок - це цифра  від 1 до  N
  const digits = [];
  for (let i = 1; i <= N; i++) {
    digits.push(i.toString());
  }

  // Створюєсо новий масив, в якому будемо зберігати рядки із різними рандомними комбінаціями цифр.
  let result = [];

  // Створюємо цикл, що виконається N (задану) кількість разів для обертання масиву цифр , щоб згенерувати різні комбінації цих цифр. Тобто потрібно отримати N різних комбінацій цифр
  for (let i = 0; i < N; i++) {
    // Здвигаємо масив цифр на одну позицію на кожній ітерації
    const firstPartOfNewArray = digits.slice(i); // Cтворюємо новий масив , який включатиме всі елементи від масиву digits , починаючи від і-того і до кінця
    const lastPartOfNewArray = digits.slice(0, i); // Cтворюємо новий масив , який включатиме всі елементи від масиву digits , починаючи від нульвого і до і-того(не включно)

    const rotatedDigits = firstPartOfNewArray.concat(lastPartOfNewArray); // З'єднуэмо два відрізки масивів у один у зворотньому порядку
    const rotatedDigitsString = rotatedDigits.join(''); // Перетворюємо масив із рядок із цих чисел

    // Додаємо у результуючий масив вже трансформований рядок із числами
    result.push(rotatedDigitsString);
  }
  // Коли в результуючому масиві вже є рядки із цифрами, то послідовність цих рядків треба змінити у рандомному вигляді.
  shuffleArray(result);
  // Повертаємо масив із рядками в рандомному порядку.
  return result;
}

// Функція для заміни цифр на дефіси у масиві , потрбна для того щоб із готового вирішенго завдання згенерувати рандомне розмішення пустих(дефіси) і заповнених(цифри) карток
// Для дошки 4*4 вигадали таку умову: 2 рядки будуть мати по 2 пустих клітинки, а інші 2 рядки по одній пустій клітинці
function createTaskArrayWithHyphen(array) {
  let task;
  let isError;
  do {
    // Рандомно визначаємо індекс першого елементу масиву(рядку), в якому будемо 2 цифри заміняти на дефіси
    const stringWithTwoHyphensIndex1 = getRandomArrayElementIndex(array);
    // Оголошуємо змінну , в яку запишемо індекс другого елементу масиву(рядку), в якому також будемо 2 цифри заміняти на дефіси
    let stringWithTwoHyphensIndex2;
    let stringWithTwoHyphensIndex3;
    let stringWithThreeHyphensIndex1;
    let stringWithThreeHyphensIndex2;
    let stringWithThreeHyphensIndex3;

    // Індекс другого рядку на заміну цифр двома дефісами має бути відмінним від індексу першого рядку.
    // Цикл do ...while виконуватиметься доти, доки індекс 2 стане не таким як індекс 1 ,
    //тобто індекс другого рядка, в якому ми будемо 2 цифри заміняти на дефіси, буде рандомно генеруватись до першого неспівпадіння із індексом 1 ю
    do {
      stringWithTwoHyphensIndex2 = getRandomArrayElementIndex(array);
    } while (stringWithTwoHyphensIndex2 === stringWithTwoHyphensIndex1);

    console.log('array.length == 5: ', array.length == 5);
    if (array.length > 4) {
      do {
        stringWithThreeHyphensIndex1 = getRandomArrayElementIndex(array);
      } while (
        stringWithThreeHyphensIndex1 === stringWithTwoHyphensIndex2 ||
        stringWithThreeHyphensIndex1 === stringWithTwoHyphensIndex1
      );
    }
    if (array.length > 5) {
      do {
        stringWithTwoHyphensIndex3 = getRandomArrayElementIndex(array);
      } while (
        stringWithTwoHyphensIndex3 === stringWithTwoHyphensIndex1 ||
        stringWithTwoHyphensIndex3 === stringWithTwoHyphensIndex2
      );

      do {
        stringWithThreeHyphensIndex2 = getRandomArrayElementIndex(array);
      } while (
        stringWithThreeHyphensIndex2 === stringWithTwoHyphensIndex2 ||
        stringWithThreeHyphensIndex2 === stringWithTwoHyphensIndex1 ||
        stringWithThreeHyphensIndex2 === stringWithThreeHyphensIndex1
      );
      do {
        stringWithThreeHyphensIndex3 = getRandomArrayElementIndex(array);
      } while (
        stringWithThreeHyphensIndex3 === stringWithTwoHyphensIndex2 ||
        stringWithThreeHyphensIndex3 === stringWithTwoHyphensIndex1 ||
        stringWithThreeHyphensIndex3 === stringWithThreeHyphensIndex1 ||
        stringWithThreeHyphensIndex3 === stringWithThreeHyphensIndex2
      );
    }

    // Перебираємо кожен елемент масиву, тобто кожен рядок і виконуємо дії для кожного рядка.
    task = array.map((str, index) => {
      // Рандомно визначаємо індекс першої цифри рядку, яку будемо заміняти на дефіс
      const randomIndex1 = getRandomCharacterIndex(str);
      // Оголошуємо змінну , в яку запишемо індекс другої цифри в рядку, яку також будемо заміняти на дефіс
      let randomIndex2;
      // Оголошуємо змінну , в яку запишемо індекс третьоЇ цифри в рядку, яку також будемо заміняти на дефіс
      let randomIndex3;
      // Якщо індекс рядка у масиві на поточній ітерації співпадає із одним із індексів тих рядків, які ми визначили для замінити 2-ма дефісами, то
      if (
        index === stringWithTwoHyphensIndex1 ||
        index === stringWithTwoHyphensIndex2
      ) {
        // рандомно знаходимо індекс другої цифри цього рядку (відмінна від першого індексу)
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        // Тепер ми маємо 2 індекси цифрр у рядку , які треба замінити на дефіси, робимо у поточному рядку заміну 2-х цифр на дефіси
        return replaceCharsInString(str, randomIndex1, randomIndex2);
        // Якщо індекс рядка у масиві на поточній ітерації НЕ співпадає із одним із індексів тих рядків, які ми визначили для замінити 2-ма дефісами, то значить дефісом замінити треба тільки одну цифру, індекс якої ми вже визначили вище
      } else if (array.length == 5 && index === stringWithThreeHyphensIndex1) {
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        do {
          randomIndex3 = getRandomCharacterIndex(str);
        } while (
          randomIndex3 === randomIndex1 ||
          randomIndex3 === randomIndex2
        );
        return replaceCharsInString(
          str,
          randomIndex1,
          randomIndex2,
          randomIndex3,
        );
      } else if (
        array.length == 6 &&
        (index === stringWithTwoHyphensIndex1 ||
          index === stringWithTwoHyphensIndex2 ||
          index === stringWithTwoHyphensIndex3)
      ) {
        // рандомно знаходимо індекс другої цифри цього рядку (відмінна від першого індексу)
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        // Тепер ми маємо 2 індекси цифрр у рядку , які треба замінити на дефіси, робимо у поточному рядку заміну 2-х цифр на дефіси
        return replaceCharsInString(str, randomIndex1, randomIndex2);
        // Якщо індекс рядка у масиві на поточній ітерації НЕ співпадає із одним із індексів тих рядків, які ми визначили для замінити 2-ма дефісами, то значить дефісом замінити треба тільки одну цифру, індекс якої ми вже визначили вище
      } else if (
        array.length == 6 &&
        (index === stringWithThreeHyphensIndex1 ||
          index === stringWithThreeHyphensIndex2 ||
          index === stringWithThreeHyphensIndex3)
      ) {
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        do {
          randomIndex3 = getRandomCharacterIndex(str);
        } while (
          randomIndex3 === randomIndex1 ||
          randomIndex3 === randomIndex2
        );
        return replaceCharsInString(
          str,
          randomIndex1,
          randomIndex2,
          randomIndex3,
        );
      } else {
        // Робимо заміну однієї цифри поточного рядку на дефіс
        return replaceCharsInString(str, randomIndex1);
      }
    });
    // Перевіряємо чи не згенерувався масив рядків завдання таким чинном, що зявився хоча б один стовпчик ,де всі або цифри або дефіси(в грі не має бути стовпчика повністю заповненого картакми на початку, або повністю пустого)

    const transformedArray = transformArray(task);
    // Якщо таку помилку виявлено , то треба заново генерувати масив завдання.
    isError = containsOnlyDigitsOrHyphens(transformedArray);
  } while (isError);

  // Повертаємо новий масив із рядками, де є вже і цифри і дефіси
  return task;
}

//Функція , що створює масив із рядків, кожен із яких з n-го символу рядків із array.
function transformArray(array) {
  const newArray = array.reduce((result, string) => {
    const length = string.length;
    for (let i = 0; i < length; i++) {
      if (!result[i]) {
        result[i] = '';
      }
      result[i] += string[i];
    }
    return result;
  }, []);

  return newArray;
}

// Функція, щоб перевірити чи є в масиві рядок в якому всі або цифри або дефіси
function containsOnlyDigitsOrHyphens(arr) {
  return arr.some(string => /^\d+$|^[-]+$/.test(string));
}
