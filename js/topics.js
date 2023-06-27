const topics = [
  document.querySelector('#sea'),
  document.querySelector('#princesses'),
];
const bodyEl = document.querySelector('body');
const topicsBlock = document.querySelector('.topics-block');
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
      // const activeTopicIndex = topics.findIndex(topic =>
      //   topic.classList.contains('active'),
      // );
    }
    bodyEl.style.background = `url('./images/${chosenTopic}/background.jpg') repeat center center`;
    if (chosenTopic === 'sea') {
      topicsBlock.style.backgroundColor = '#74eafd87';
    } else if (chosenTopic === 'princesses') {
      topicsBlock.style.backgroundColor = '#cfb1cf87';
    }
  });
}
