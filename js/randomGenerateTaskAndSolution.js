// Як будуть генеруватись дошки для рівнів :
// 1 рівень : 2 рядки по 2 пустих клітинки
//            2 рядки по 1 пустій клітинці

// 2 рівень : 2 рядки по 2 пустих клітинки
//            2 рядки по 1 пустій клітинці
//            1 рядок по 3 пустих клітинки

// 3 рівень : 3 рядки по 2 пустих клітинки
//            3 рядки по 3 пустих клітинки

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

function isStringToReplaceWithTwoHyphens(index, index1, index2) {
  return index === index1 || index === index2;
}

function isStringToReplaceWithThreeHyphens(
  index,
  length,
  index1,
  index2,
  index3,
) {
  return (
    length > 4 && (index === index1 || index === index2 || index === index3)
  );
}

function getRandomIndexes(array) {
  const getRandomIndex = () => Math.floor(Math.random() * array.length);
  const indexes = new Set();

  while (indexes.size < 6) {
    indexes.add(getRandomIndex());
  }

  return Array.from(indexes);
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
// Функція  для створення масиву із завданням
// Для заміни цифр на дефіси у масиві , потрбна для того щоб із готового вирішенго завдання згенерувати рандомне розмішення пустих(дефіси) і заповнених(цифри) карток
function createTaskArrayWithHyphen(array) {
  let task;
  let isError;
  do {
    const stringWithTwoHyphensIndex1 = getRandomUniqueIndex(array, []);
    const stringWithTwoHyphensIndex2 = getRandomUniqueIndex(array, [
      stringWithTwoHyphensIndex1,
    ]);

    let stringWithThreeHyphensIndex1;
    let stringWithThreeHyphensIndex2;
    let stringWithThreeHyphensIndex3;
    let stringWithTwoHyphensIndex3;

    if (array.length > 4) {
      stringWithThreeHyphensIndex1 = getRandomUniqueIndex(array, [
        stringWithTwoHyphensIndex1,
        stringWithTwoHyphensIndex2,
      ]);
      stringWithTwoHyphensIndex3 = getRandomUniqueIndex(array, [
        stringWithTwoHyphensIndex1,
        stringWithTwoHyphensIndex2,
        stringWithThreeHyphensIndex1,
      ]);
    }

    if (array.length > 5) {
      stringWithThreeHyphensIndex2 = getRandomUniqueIndex(array, [
        stringWithTwoHyphensIndex1,
        stringWithTwoHyphensIndex2,
        stringWithTwoHyphensIndex3,
        stringWithThreeHyphensIndex1,
      ]);
      stringWithThreeHyphensIndex3 = getRandomUniqueIndex(array, [
        stringWithTwoHyphensIndex1,
        stringWithTwoHyphensIndex2,
        stringWithTwoHyphensIndex3,
        stringWithThreeHyphensIndex1,
        stringWithThreeHyphensIndex2,
      ]);
    }

    task = array.map((str, index) => {
      const randomIndex1 = getRandomCharacterIndex(str);
      let randomIndex2;
      let randomIndex3;
      const areTwoStringsWithTwoHyphens =
        index === stringWithTwoHyphensIndex1 ||
        index === stringWithTwoHyphensIndex2;

      const areThreeStringsWithTwoHyphens =
        array.length == 6 &&
        (index === stringWithTwoHyphensIndex1 ||
          index === stringWithTwoHyphensIndex2 ||
          index === stringWithTwoHyphensIndex3);

      const areThreeStringsWithThreeHyphens =
        array.length == 6 &&
        (index === stringWithThreeHyphensIndex1 ||
          index === stringWithThreeHyphensIndex2 ||
          index === stringWithThreeHyphensIndex3);
      const isOneStringWithThreeHyphens =
        array.length == 5 && index === stringWithThreeHyphensIndex1;

      if (areTwoStringsWithTwoHyphens) {
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        return replaceCharsInString(str, randomIndex1, randomIndex2);
      } else if (isOneStringWithThreeHyphens) {
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
      } else if (areThreeStringsWithTwoHyphens) {
        do {
          randomIndex2 = getRandomCharacterIndex(str);
        } while (randomIndex2 === randomIndex1);
        return replaceCharsInString(str, randomIndex1, randomIndex2);
      } else if (areThreeStringsWithThreeHyphens) {
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
        return replaceCharsInString(str, randomIndex1);
      }
    });

    const transformedArray = transformArray(task);
    isError = containsOnlyDigitsOrHyphens(transformedArray);
  } while (isError);

  return task;
}

// Функція для знаходженя унікального індексу
function getRandomUniqueIndex(array, excludeIndices) {
  let index;
  do {
    index = getRandomArrayElementIndex(array);
  } while (excludeIndices.includes(index));
  return index;
}
