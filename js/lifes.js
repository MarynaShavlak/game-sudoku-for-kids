/*========== ЖИТТЯ ========== */

//Для різних рівнів міняємо lifes
let lifes = 3; //Кількість життів

//Функція віднімання життів і закінчення гри
function minusLife() {
  lifes--;
  if (lifes <= 0) {
    setTimeout(function () {
      //----------------------------------------------------------
      console.log('Game Over');
      //тут буде функція завершення гри та фінальне вікно з поразкою
      //----------------------------------------------------------
    }, 300);
  }
  createLifes();
}

//Функція для створення сердечок життів в Меню
function createLifes() {
  let lifesBlock = document.querySelector('.menu .lifes'); //блок з життями
  lifesBlock.innerHTML = ''; //обнуляємо
  //перемальовуємо життя (залежить від цифри, яка зараз в lifes)
  for (let i = 0; i < lifes; i++) {
    let span = document.createElement('span');
    span.className = 'life-element';
    setLifeStyle(span);
    lifesBlock.appendChild(span);
  }
}

function setLifeStyle(el) {
  const theme = chosenTopic;
  console.log('theme: ', theme);
  el.style.backgroundImage = `url('./images/${theme}/life.png')`;
}