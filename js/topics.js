const themes = {
  theme1: 'fish',
  theme2: 'princess',
  theme3: 'cake',
  theme4: 'car',
  theme5: 'animal',
  theme6: 'fixic',
  theme7: 'paw',
  theme8: 'minion',
};
// Кольори для пустих клітинок на дошці та у блоці вибоу картинки
const themeEmptyCellColors = {
  theme1: '#74eafd87',
  theme2: '#cfb1cf87',
  theme3: '#cef4ff87',
  theme4: '#fec7aaa6',
  theme5: '#f7afdf8f',
  theme6: '#dbf1fecc',
  theme7: '#5db8ed87',
  theme8: '#5db8ed87',
};

const topics = [
  document.querySelector('#theme1'),
  document.querySelector('#theme2'),
  document.querySelector('#theme3'),
  document.querySelector('#theme4'),
  document.querySelector('#theme5'),
  document.querySelector('#theme6'),
  document.querySelector('#theme7'),
  document.querySelector('#theme8'),
];
topics.forEach(topic => {
  topic.onclick = onTopicBtnClick;
});

function onTopicBtnClick(e) {
  const clickedTopic = e.target;

  if (clickedTopic.classList.contains('active')) return;
  topics.forEach(topic => {
    if (topic === clickedTopic) {
      chosenTopic = clickedTopic.id;
      topic.classList.add('active');
      cardsContainer.innerHTML = '';
      createTaskBoard();
      createImageSelectionBlock(solution);
    } else {
      topic.classList.remove('active');
    }
  });
}
