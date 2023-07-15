const topicsList = document.querySelector('.topics');
topicsList.addEventListener('click', onTopicBtnClick);
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

const topicButtons = Array.from(document.querySelectorAll('.topic-btn'));

function onTopicBtnClick(e) {
  const clickedTopic = e.target;
  if (clickedTopic.nodeName !== 'BUTTON') return;

  if (clickedTopic.classList.contains('active')) return;
  topicButtons.forEach(topic => {
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
