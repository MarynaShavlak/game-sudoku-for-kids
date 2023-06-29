let chosenTopic = 'theme1';
const themes = {
  theme1: { id: 'fish', name: 'fish' },
  theme2: { id: 'princess', name: 'princess' },
  theme3: { id: 'cake', name: 'cake' },
  theme4: { id: 'car', name: 'car' },
  theme5: { id: 'animal', name: 'animal' },
  theme6: { id: 'fixic', name: 'fixic' },
  theme7: { id: 'paw', name: 'paw' },
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
console.log('topics: ', topics);

topics.forEach(topic => {
  topic.onclick = onTopicBtnClick;
});

function onTopicBtnClick(e) {
  const clickedTopic = e.target;

  if (clickedTopic.classList.contains('active')) return;
  topics.forEach(topic => {
    if (topic === clickedTopic) {
      chosenTopic = clickedTopic.id;
      console.log('chosenTopic: ', chosenTopic);
      topic.classList.add('active');
      cardsContainer.innerHTML = '';
      createTaskBoard();
      createImageSelectionBlock(solution);
    } else {
      topic.classList.remove('active');
    }
    // if (chosenTopic === 'theme1') {
    //   backBtn.style.backgroundColor = '#74eafd87';
    // } else if (chosenTopic === 'theme2') {
    //   backBtn.style.backgroundColor = '#cfb1cf87';
    // }
  });
}
