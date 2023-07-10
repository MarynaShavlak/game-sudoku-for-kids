const hintsValue = {
  level1: 3,
  level2: 4,
  level3: 5,
};
function minusHint() {
  hints--;
  if (hints <= 0) {
    setTimeout(function () {
      // Змінити текст кнопки
    }, 300);
  }
  createhints();
}

function createhints() {
  let hintsBlock = document.querySelector('.menu .hints');
  console.log('hintsBlock: ', hintsBlock);
  hintsBlock.innerHTML = '';
  for (let i = 0; i < hints; i++) {
    let span = document.createElement('span');
    span.className = 'hint-element';
    hintsBlock.appendChild(span);
  }
}
