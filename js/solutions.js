// const solution = ['1234', '4123', '3412', '2341']; // Масив, в якому кожен елемент - це рядок із порядковими номерами картинок(Вже вирішене завдання)
// const cardsTaskBoard = ['-23-', '41-3', '--12', '23-1']; // Масив, який будемо використовувати для того, щоб відобразити дошку із картинками та пустими клітинками. Замість індексу картинки тут прописуємо дефісю.

// const solution2 = ['34125', '51253', '25431', '43512', '12354'];
// const cardsTaskBoard2 = ['-4125', '5--53', '-5-31', '435-2', '1-3--'];

const levelTasks = {
  level1: {
    task: ['-23-', '41-3', '--12', '23-1'],
    solution: ['1234', '4123', '3412', '2341'],
  },
  level2: {
    task: ['-4125', '5--43', '-5-31', '435-2', '1-3--'],
    solution: ['34125', '51243', '25431', '43512', '12354'],
  },
  level3: {
    task: ['-16-4-', '4--6-1', '-4-256', '6-5-13', '1-2--4', '-6-132'],
    solution: ['216345', '453621', '341256', '625413', '132564', '56413-'],
  },
};

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

function generateArrayWithUniqueDigit(N) {
  // Create an array with numbers from 1 to N
  const digits = Array.from({ length: N }, (_, index) =>
    (index + 1).toString(),
  );

  // Create a new array to store the result
  let result = [];

  // Iterate over the digits array
  for (let i = 0; i < N; i++) {
    // Rotate the digits array by one position for each iteration
    const rotatedDigits = digits.slice(i).concat(digits.slice(0, i));

    // Push the rotated digits array as a string to the result array
    result.push(rotatedDigits.join(''));
  }
  shuffleArray(result);
  return result;
}

function replaceDigits(array) {
  // Рандомно визначаємо індекс першого елементу масиву(рядку), в якому будемо 2 цифри заміняти на дефіси
  const stringWithTwoHyphensIndex1 = getRandomArrayElementIndex(array);
  let stringWithTwoHyphensIndex2;
  do {
    stringWithTwoHyphensIndex2 = Math.floor(Math.random() * array.length);
  } while (stringWithTwoHyphensIndex2 === stringWithTwoHyphensIndex1);

  console.log('stringWithTwoHyphensIndex1: ', stringWithTwoHyphensIndex1);
  console.log('stringWithTwoHyphensIndex2: ', stringWithTwoHyphensIndex2);
  return array.map((str, index) => {
    if (
      index === stringWithTwoHyphensIndex1 ||
      index === stringWithTwoHyphensIndex2
    ) {
      const randomIndex1 = Math.floor(Math.random() * str.length);
      let randomIndex2;

      do {
        randomIndex2 = Math.floor(Math.random() * str.length);
      } while (randomIndex2 === randomIndex1);

      const replacedStr = str.split('').map((char, index) => {
        if (index === randomIndex1 || index === randomIndex2) {
          return '-';
        }
        return char;
      });

      return replacedStr.join('');
    } else {
      const randomIndex1 = Math.floor(Math.random() * str.length);
      const replacedStr = str.split('').map((char, index) => {
        if (index === randomIndex1) {
          return '-';
        }
        return char;
      });

      return replacedStr.join('');
    }
  });
}

const с1 = generateArrayWithUniqueDigit(4);
const replacedArray = replaceDigits(с1);
console.log('replacedArray: ', replacedArray);
console.log('с1: ', с1);
// const с2 = generateArrayWithUniqueDigit(4);
// console.log('с2: ', с2);
// const с3 = generateArrayWithUniqueDigit(4);
// console.log('с3: ', с3);
// const с4 = generateArrayWithUniqueDigit(4);
// console.log('с4: ', с4);
// const с5 = generateArrayWithUniqueDigit(4);
// console.log('с5: ', с5);

// function replaceDigits(array) {
//   return array.map(str => {
//     const strArray = str.split('');
//     const randomIndex1 = Math.floor(Math.random() * str.length);
//     let randomIndex2;
//     let randomIndex3;

//     do {
//       randomIndex2 = Math.floor(Math.random() * str.length);
//     } while (randomIndex2 === randomIndex1);

//     do {
//       randomIndex3 = Math.floor(Math.random() * str.length);
//     } while (randomIndex3 === randomIndex1 || randomIndex3 === randomIndex2);

//     strArray[randomIndex1] = '-';
//     strArray[randomIndex2] = '-';
//     strArray[randomIndex3] = '-';

//     return strArray.join('');
//   });
// }
