function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function getRandomArrayElementIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomCharacterIndex(string) {
  return Math.floor(Math.random() * string.length);
}

function replaceCharsInString(str, index1, index2, index3) {
  return str
    .split('')
    .map((char, index) => {
      if (index === index1 || index === index2 || index === index3) {
        return '-';
      }
      return char;
    })
    .join('');
}

function generateArrayWithUniqueDigit(N) {
  const digits = [];
  for (let i = 1; i <= N; i++) {
    digits.push(i.toString());
  }

  let result = [];

  for (let i = 0; i < N; i++) {
    const firstPartOfNewArray = digits.slice(i);
    const lastPartOfNewArray = digits.slice(0, i);

    const rotatedDigits = firstPartOfNewArray.concat(lastPartOfNewArray);
    const rotatedDigitsString = rotatedDigits.join('');

    result.push(rotatedDigitsString);
  }
  shuffleArray(result);
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

function containsOnlyDigitsOrHyphens(arr) {
  return arr.some(string => /^\d+$|^[-]+$/.test(string));
}
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

function getRandomUniqueIndex(array, excludeIndices) {
  let index;
  do {
    index = getRandomArrayElementIndex(array);
  } while (excludeIndices.includes(index));
  return index;
}
