/*========== ТАЙМЕР ========== */

let timer = 10; //Кількість секунд, можно міняти в залежності від складності
let timerBlock = document.querySelector('.timer span'); //Блок з таймером
timerBlock.innerHTML = timer;

//Функція відліку часу
function countdownTime() {
  let timerID = setInterval(function () {
    timer--;
    timerBlock.innerHTML = timer;
    if (timer <= 0) {
      // timerBlock.innerText = "0";
      clearInterval(timerID);

      //----------------------------------------------------------
      console.log('Game Over');
      //тут буде функція завершення гри та фінальне вікно з поразкою
      //----------------------------------------------------------
    }
  }, 1000);
}
// countdownTime();
