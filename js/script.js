let emptyCellIndex = null; // на початку гри користувач ще не обрав жодної картинки, яку б вын хотів вставити, тому null
let chosenImageIndex = 1; // на початку гри перший елемент активний за замовчуванням
let chosenLevel = 'level1';
let chosenTopic = 'theme1';
let lifes;
let hints;
let generatedSolution = generateArrayWithUniqueDigit(4);
let generatedTask = createTaskArrayWithHyphen(generatedSolution);
let solution = generatedSolution;
let cardsTaskBoard = generatedTask;
const cardsContainer = document.querySelector('.cards-container');
const bodyEl = document.querySelector('body');
const backBtn = document.querySelector('.back-btn');

backBtn.addEventListener('click', openConfirmationModal);

createTaskBoard();
createImageSelectionBlock(solution);
