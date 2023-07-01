/*========== ТАЙМЕР ========== */

let timer; //Кількість секунд, можно міняти в залежності від складності
let timerID;
const timerWrapper = document.querySelector('.timer');
let timerBlock = document.querySelector('.timer span'); //Блок з таймером
timerBlock.innerHTML = timer;

const timerValue = {
  level1: 60,
  level2: 120,
  level3: 180,
};

//Функція відліку часу
function countdownTime() {
  //Записуємо скіьки часу виділяємо на гру в залежності від рівня гри
  timer = timerValue[chosenLevel];
  timerBlock.innerHTML = timer;
  console.log('timerBlock.innerHTML: ', timerBlock.innerHTML);
  timerID = setInterval(function () {
    timer--;
    timerBlock.innerHTML = timer;
    console.log('timerBlock.innerHTML: ', timerBlock.innerHTML);
    if (timer <= 0) {
      // timerBlock.innerText = "0";
      clearInterval(timerID);
      openLoseWindow();

      //----------------------------------------------------------
      console.log('Game Over');
      //тут буде функція завершення гри та фінальне вікно з поразкою
      //----------------------------------------------------------
    }
  }, 1000);
}
