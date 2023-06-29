let chosenTopic = 'theme1';
const themes = {
  theme1: 'fish',
  theme2: 'princess',
  theme3: 'cake',
  theme4: 'car',
  theme5: 'animal',
  theme6: 'fixic',
  theme7: 'paw',
};

const topics = [
  document.querySelector('#theme1'),
  document.querySelector('#theme2'),
  document.querySelector('#theme3'),
  document.querySelector('#theme4'),
  document.querySelector('#theme5'),
  document.querySelector('#theme6'),
  document.querySelector('#theme7'),
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
