let chosenTopic = 'theme1';

const levels = [
  document.querySelector('#level1'),
  document.querySelector('#level2'),
  document.querySelector('#level3'),
];
console.log('levels : ', levels);

levels.forEach(level => {
  level.onclick = onTopicBtnClick;
});

function onTopicBtnClick(e) {
  console.log('e: ', e);
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
    bodyEl.style.background = `url('./images/${chosenTopic}/background.jpg') repeat center center`;
  });
}
